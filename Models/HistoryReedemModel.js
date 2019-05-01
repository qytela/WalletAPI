const db = require('../Config/Database');

exports.checkHistoryReedem = (id_account, code) => {
	let data = {
		id_account: id_account,
		code: code
	};

	return db('history_reedem')
	.where(data);
}

exports.createHistory = (name, id_account, code) => {
	let data = {
		name: name,
		id_account: id_account,
		code: code
	};

	return db('history_reedem')
	.insert(data);
}

exports.checkHistory = (id_account) => {
	return db('history_reedem')
	.where('id_account', id_account);
}

exports.allHistory = () => {
	return db('history_reedem');
}