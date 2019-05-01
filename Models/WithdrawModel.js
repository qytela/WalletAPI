const db = require('../Config/Database');

exports.withdraw = (id_account, nominal) => {
	return db('accounts')
	.where('id_account', id_account)
	.update({
		saldo: nominal
	});
}