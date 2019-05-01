const accountModel = require('../Models/AccountModel');
const historyModel = require('../Models/HistoryModel');
const withdrawModel = require('../Models/WithdrawModel');

exports.withdraw = async (req, res) => {
	const { id_account, nominal, pin } = req.body;
	if (id_account, nominal, pin) {
		if (nominal < 5000) {
			res.json({
				status: true,
				msg: 'Minimal to withdraw is 5000'
			});
		}else{
			const checkIdAccount = await accountModel.accountInfoWithPin(id_account, pin);
			if (checkIdAccount.length > 0) {
				if (checkIdAccount[0].saldo < 5000) {
					res.status(400).json({
						status: false,
						msg: 'Failed to withdraw, minmal saldo is 5000'
					});
				}else{
					const minusSaldo = parseInt(checkIdAccount[0].saldo) - parseInt(nominal);
					const withdraw = await withdrawModel.withdraw(id_account, minusSaldo);
					if (withdraw) {
						await historyModel.createHistory(checkIdAccount[0].name, id_account, "Withdraw nominal " + nominal);
						res.json({
							status: true,
							msg: 'Successfully to withdraw.',
							data: {
								id_account: id_account,
								nominal: nominal
							}
						});
					}else{
						res.status(400).json({
							status: false,
							msg: 'Failed to withdraw.',
							data: {
								id_account: id_account,
								nominal: nominal
							}
						});
					}
				}
			}else{
				res.status(400).json({
					status: false,
					msg: 'Pin or ID account incorrect.'
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