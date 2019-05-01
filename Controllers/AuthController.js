const jwt = require('jsonwebtoken');
const authModel = require('../Models/AuthModel');
const randomString = require('../Config/GenerateApiKey');

exports.authLogin = async (req, res) => {
	const { email, password } = req.body;
	if (email, password) {
		const checkAuth = await authModel.checkAuth(email, password);
		if (checkAuth.length > 0) {
			let payload = {
				email: checkAuth[0].email
			};
			let random = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
			let token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
			const updateApi = await authModel.updateApiKey(checkAuth[0].id_account, random);
			if (updateApi) {
				res.cookie('x-wallet-token', random, { maxAge: 3600000, httpOnly: true });
			}
			res.json({
				status: true,
				msg: 'Login successfully.',
				tk: token
			});
		}else{
			res.status(400).json({
				status: false,
				msg: 'Login failed.'
			});
		}
	}else{
		res.status(400).json({
			status: false,
			msg: 'All fields cannot be null.'
		});
	}
}