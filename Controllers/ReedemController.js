const accountModel = require('../Models/AccountModel');
const historyReedemModel = require('../Models/HistoryReedemModel');
const reedemModel = require('../Models/ReedemModel');
const transferModel = require('../Models/TransferModel');

exports.reedemCode = async (req, res) => {
	const { id_account, code } = req.body;
	if (id_account, code) {
		const checkCode = await reedemModel.checkCode(code);
		if (checkCode.length > 0) {
			const checkIdAccount = await accountModel.accountInfo(id_account);
			if (checkIdAccount.length > 0) {
				const checkHistoryReedem = await historyReedemModel.checkHistoryReedem(id_account, code);
				if (checkHistoryReedem.length > 0) {
					res.status(400).json({
						status: false,
						msg: 'Reedem Code ' + code + ' already use.',
						data: {
							id_account: id_account
						}
					});
				}else{
					const plusSaldoUser = parseInt(checkIdAccount[0].saldo) + parseInt(checkCode[0].reward);
					const processReedem = await transferModel.updateSaldo(id_account, plusSaldoUser);
					if (processReedem) {
						await historyReedemModel.createHistory(checkIdAccount[0].name, id_account, code);
						res.json({
							status: true,
							msg: 'Successfully to Reedem Code ' + code,
							data: {
								id_account: id_account,
								reward: checkCode[0].reward
							}
						});
					}else{
						res.status(400).json({
							status: false,
							msg: 'Failed to Reedem Code ' + code
						});
					}
				}
			}else{
				res.status(400).json({
					status: false,
					msg: 'ID account ' + id_account + ' does not exists'
				})
			}

		}else{
			res.status(400).json({
				status: false,
				msg: 'Reedem Code ' + code + ' does not exists.'
			});
		}
	}else{
		res.status(400).json({
			status: false,
			msg: 'All fields cannot be null.'
		});
	}

}

exports.createReedemCode = async (req, res) => {
	const { code, reward } = req.body;
	if (code, reward) {
		const checkCode = await reedemModel.checkCode(code);
		if (checkCode.length > 0) {
			res.status(400).json({
				status: false,
				msg: 'Reedem Code ' + code + ' already available.'
			});
		}else{
			const createReedemCode = await reedemModel.createReedemCode(code, reward);
			if (createReedemCode) {
				res.json({
					status: true,
					msg: 'Successfully to create new reedem code.',
					data: {
						code: code,
						reward: reward
					}
				});
			}else{
				res.status(400).json({
					status: false,
					msg: 'Failed to create new reedem code.'
				});
			}	
		}
	}else{
		res.status(400).json({
			status: false,
			msg: 'All fields cannot be null.'
		});
	}
}

exports.deleteReedemCode = async (req, res) => {
	const { code } = req.body;
	if (code) {
		const checkCode = await reedemModel.checkCode(code);
		if (checkCode.length > 0) {
			const deleteCode = await reedemModel.deleteCode(code);
			if (deleteCode) {
				res.json({
					status: true,
					msg: 'Successfully to delete Reedem Code ' + code
				});
			}else{
				res.status(400).json({
					status: false,
					msg: 'Failed to delete Reedem Code ' + code
				});
			}
		}else{
			res.status(400).json({
				status: false,
				msg: 'Reedem Code ' + code + ' does not exists.'
			});
		}
	}else{
		res.status(400).json({
			status: false,
			msg: 'Field code cannot be null.'
		});
	}
}