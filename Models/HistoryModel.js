const db = require('../Config/Database');

exports.createHistory = (name, id_account, history) => {
	let data = {
		name: name,
		id_account: id_account,
		history: history
	};

	return db('history')
	.insert(data);
}

exports.checkHistory = (id_account) => {
	return db('history')
	.where('id_account', id_account);
}

exports.allHistory = () => {
	return db('history');
}