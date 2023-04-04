import { Router } from "express";

export default class CustomRouter{
	constructor(){
		this.router = Router();
		this.init();
	}

	init(){};

	getRouter(){
		return this.router;
	}

	get(path, policies, ...calbacks){
		this.router.get(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCalbacks(calbacks));
	}

	post(path, policies, ...calbacks){
		this.router.post(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCalbacks(calbacks));
	}

	put(path, policies, ...calbacks){
		this.router.put(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCalbacks(calbacks));
	}

	delete(path, policies, ...calbacks){
		this.router.delete(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCalbacks(calbacks));
	}

	applyCalbacks(calbacks){
		return calbacks.map(calback  => async (...params)  => {
			try {
				await calback.apply(this, params);
			} catch (error) {
				console.log(error);
				params[1].sendServerError(error);
			}
		});
	}

	generateCustomResponses = (req, res, next)  => {
		res.sendSuccess = payload  => res.status(200).json({status: "success", payload});
		res.sendBadRequestError = error  => res.status(400).json({status: "error", error});
		res.sendUnauthenticatedError = error  => res.status(401).json({status: "error", error});
		res.sendUnauthorizedError = error  => res.status(403).json({status: "error", error});
		res.sendServerError = error  => res.status(500).json({status: "error", error});
		next();
	}

	handlePolicies = policies  => (req, res, next)  => {
		if(policies.includes("PUBLIC")) return next();
		if(policies.includes("USER") || policies.includes("ADMIN")){
			const user = req.session.user;
			if(!user) return res.sendUnauthenticatedError("No autenticado");
			if(policies.includes("ADMIN")){
				if(user.role.toUpperCase() !== "ADMIN") return res.sendUnauthorizedError("No autorizado");
			}
			req.user = user;
			return next();
		}
	}
}