const accountModel = require('../Models/AccountModel');
const historyModel = require('../Models/HistoryModel');
const transferModel = require('../Models/TransferModel');

exports.transferSaldo = async (req, res) => {
	const { from_id_account, to_id_account, pin, nominal } = req.body;
	if (from_id_account, to_id_account, pin, nominal) {
		if (nominal < 5000) {
			res.status(400).json({
				status: false,
				msg: 'Minimal transfer saldo is 5000'
			});
		}else{
			const checkFrom = await accountModel.accountInfo(from_id_account);
			if (checkFrom.length > 0) {
				if (checkFrom[0].saldo < 5000) {
					res.status(400).json({
						status: false,
						msg: 'Saldo not suciffient, minimal saldo user is 5000'
					});
				}else{
					const checkTo = await accountModel.accountInfo(to_id_account);
					if (checkTo.length > 0) {
						const minusSaldoFrom = parseInt(checkFrom[0].saldo) - parseInt(nominal);
						const plusSaldoTo = parseInt(checkTo[0].saldo) + parseInt(nominal);
						await transferModel.updateSaldo(from_id_account, minusSaldoFrom);
						await transferModel.updateSaldo(to_id_account, plusSaldoTo);
						await historyModel.createHistory(checkFrom[0].name, checkFrom[0].id_account, "Transfer saldo to " + to_id_account + " nominal " + nominal);
						await historyModel.createHistory(checkTo[0].name, checkTo[0].id_account, "Receive saldo from " + from_id_account + " nominal " + nominal);
						res.json({
							status: true,
							msg: 'Success transfer saldo to ' + to_id_account,
							data: {
								nominal: nominal
							}
						});
					}else{
						res.status(400).json({
							status: false,
							msg: 'ID account ' + to_id_account + ' does not exists.'
						});
					}
				}
			}else{
				res.status(400).json({
					status: false,
					msg: 'ID account ' + from_id_account + ' does not exists.'
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