const db = require('../Config/Database');

exports.checkAuth = (email, password) => {
	let data = {
		email: email,
		password: password
	};

	return db('accounts')
	.where(data);
}

exports.checkApiKey = (api_key) => {
	return db('accounts')
	.where('api_key', api_key);
}

exports.updateApiKey = (id_account, api_key) => {
	return db('accounts')
	.where('id_account', id_account)
	.update({
		api_key: api_key
	});
}