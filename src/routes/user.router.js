import CustomRouter from "./custom.router.js";
import passport from 'passport';

export default class UserRouter extends CustomRouter{
	init(){
		this.get('/', ["PUBLIC"], passport.authenticate('login-local'), async (req, res) => {
			if(!req.user) return res.status(400).send('Login error');
			req.session.user = req.user;
			res.json({status: 'success', user: req.session.user}); 
		});
		
		this.post('/', ["PUBLIC"], passport.authenticate('register-local') , async(req, res) => {
			if(!req.user) return res.status(400).send('Login error');
			req.session.user = req.user;
			res.status(200).send('Usuario registrado'); 
		});
		
		this.get('/logout', ["PUBLIC"], async(req, res) => {
			if(req.session.user){
				req.session.destroy(error => {
					if(error) console.log("Error en LogOut. ", error);
				});
			}
			res.json({status: "success"});
		})
	}
}