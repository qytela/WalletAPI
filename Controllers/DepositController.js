const accountModel = require('../Models/AccountModel');
const depositModel = require('../Models/DepositModel');
const historyModel = require('../Models/HistoryModel');

exports.deposit = async (req, res) => {
	const { id_account, nominal } = req.body;
	if (id_account, nominal) {
		if (nominal < 5000) {
			res.status(400).json({
				status: false,
				msg: 'Minimal saldo to deposit is 5000'
			});
		}else{
			const checkIdAccount = await accountModel.accountInfo(id_account);
			if (checkIdAccount.length > 0) {
				const plusSaldo = parseInt(checkIdAccount[0].saldo) + parseInt(nominal);
				const updateSaldo = await depositModel.updateSaldo(id_account, plusSaldo);
				if (updateSaldo) {
					await historyModel.createHistory(checkIdAccount[0].name, id_account, "Deposit nominal " + nominal)
					res.json({
						status: true,
						msg: 'Successfully to deposit.',
						data: {
							id_account: id_account,
							nominal: nominal
						}
					});
				}else{
					res.status(400).json({
						status: false,
						msg: 'Failed to deposit.'
					});
				}
			}else{
				res.status(400).json({
					status: false,
					msg: 'ID account ' + id_account + ' does not exists.'
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