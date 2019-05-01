const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

// Controller
const authController = require('./Controllers/AuthController');
const accountController = require('./Controllers/AccountController');
const depositController = require('./Controllers/DepositController');
const withdrawController = require('./Controllers/WithdrawController');
const historyController = require('./Controllers/HistoryController');
const historyReedemController = require('./Controllers/HistoryReedemController');
const reedemController = require('./Controllers/ReedemController');
const transferController = require('./Controllers/TransferController');

// Middleware
const checkStatus = require('./Middleware/CheckStatus');

// Create Strategy for Web Token
let ExtractJwt = passportJwt.ExtractJwt;
let JwtStrategy = passportJwt.Strategy;
let JwtOptions = {};

JwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
JwtOptions.secretOrKey = 'Wallet_API';

let Strategy = new JwtStrategy(JwtOptions, (payload, next) => {
	let user = {
		email: payload.email
	};
	if (user) {
		next(null, user);
	}else{
		next(null, false);
	}
});

// Use Strategy
passport.use(Strategy);

// Express
app.use(passport.initialize());
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use((req, res, next) => {
	secretKey = JwtOptions.secretOrKey;
	next();
});
app.use(session({
	secret: '!@#$!312%!@#!@%!25^&^',
	resave: false,
	saveUnintialized: true,
	cookie: {
		secure: true,
		httpOnly: true
	}
}));

// Auth Controller
app.post('/auth/login', authController.authLogin);

// Account Controller
app.get('/account/info/:id_account', passport.authenticate('jwt', { session: false }), accountController.accountInfo);
app.post('/account/create', accountController.createAccount);
app.post('/account/activated', passport.authenticate('jwt', { session: false }), accountController.activatedAccount);
app.delete('/account/delete', passport.authenticate('jwt', { session: false }), accountController.deleteAccount);

// Deposit Controller
app.post('/deposit', passport.authenticate('jwt', { session: false }), checkStatus, depositController.deposit);

// Withdraw Controller
app.post('/withdraw', passport.authenticate('jwt', { session: false }), checkStatus, withdrawController.withdraw);

// Transfer Controller
app.post('/transfer/saldo', passport.authenticate('jwt', { session: false }), checkStatus, transferController.transferSaldo);

// Reedem Code Controller
app.post('/reedem', passport.authenticate('jwt', { session: false }), reedemController.reedemCode);
app.post('/reedem/create', passport.authenticate('jwt', { session: false }), reedemController.createReedemCode);
app.delete('/reedem/delete', passport.authenticate('jwt', { session: false }), reedemController.deleteReedemCode);

// History and History Reedem Controller
app.get('/history/:id_account', passport.authenticate('jwt', { session: false }), historyController.historyAccount);
app.get('/history', passport.authenticate('jwt', { session: false }), historyController.allHistory);
app.get('/history_reedem/:id_account', passport.authenticate('jwt', { session: false }), historyReedemController.historyReedemAccount);
app.get('/history_reedem', passport.authenticate('jwt', { session: false }), historyReedemController.allHistoryReedem);

// Listen
app.listen(8080, () => {
	console.log('Running on :8080');
});