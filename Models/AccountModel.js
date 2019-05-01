const db = require('../Config/Database');

exports.accountInfo = (id_account) => {
	return db('accounts')
	.where({
		id_account: id_account
	});
}

exports.accountInfoWithKey = (api_key) => {
	return db('accounts')
	.where({
		api_key: api_key
	});
}

exports.accountInfoWithPin = (id_account, pin) => {
	return db('accounts')
	.where({
		id_account: id_account,
		pin: pin
	});
}

exports.beforeCreateAccount = (email) => {
	return db('accounts')
	.where({
		email: email
	});
}

exports.createAccount = (name, email, password, pin, id_account, api_key) => {
	let data = {
		name: name,
		email: email,
		password: password,
		pin: pin,
		saldo: 0,
		id_account: id_account,
		status: 0, // not active,
		api_key: api_key
	};

	return db('accounts')
	.insert(data);
}

exports.activatedAccount = (bank_name, name_card_holder, id_account, card_number, phone, address) => {
	let data = {
		bank_name: bank_name,
		name_card_holder: name_card_holder,
		id_account: id_account,
		card_number: card_number,
		phone: phone,
		address: address
	};

	return db('accounts_active')
	.insert(data);
}

exports.changeStatusAccount = (id_account, status) => {
	return db('accounts')
	.where('id_account', id_account)
	.update({
		status: status
	});
}

exports.deleteAccount = (id_account) => {
	return db('accounts')
	.where('id_account', id_account)
	.del();
}