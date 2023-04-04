import express from 'express';
import session from 'express-session';
import { productRouter, cartRouter, userRouter } from "./routes/index.routers.js";
import passport from 'passport';
import initializePassport from './passport/passport.config.js';
import { port, mongoUrl } from './config.js';
import MongoStore from 'connect-mongo';
//import { mailer } from './mailer/index.js';
import errorMidleware from "./services/errors.services.js";
//import { generateUser } from "./utils/mocks/generateuser.js";

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
	store: MongoStore.create({
		mongoUrl,
		dbName: 'ecommerce',
		mongoOptions: {
			useNewUrlParser: true,
			useUnifiedTopology: true	
		},
		ttl: 3000
	}),
	secret: '123456',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
initializePassport();
app.use('/api/user', userRouter.getRouter());
app.use('/api/product', productRouter.getRouter());
app.use('/api/cart', cartRouter.getRouter());
app.use(errorMidleware);

app.listen(port);
console.log('server listen on port ', port);