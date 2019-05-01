const accountModel = require('../Models/AccountModel');
const historyModel = require('../Models/HistoryModel');
const randomString = require('../Config/GenerateApiKey');

exports.accountInfo = async (req, res) => {
	const { id_account } = req.params;
	const data = await accountModel.accountInfo(id_account);
	if (data.length > 0) {
		res.json({
			status: true,
			data: data
		});
	}else{
		res.json({
			status: true,
			data: []
		});
	}
}

exports.createAccount = async (req, res) => {
	const { name, email, password, pin, id_account } = req.body;
	if (name, email, password, pin, id_account) {
		const check = await accountModel.beforeCreateAccount(email);
		if (check.length > 0) {
			res.status(400).json({
				status: false,
				msg: 'Email already exists.',
			});
		}else{
			const random = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
			const createAccount = await accountModel.createAccount(name, email, password, pin, id_account, random);
			if (createAccount) {
				await historyModel.createHistory(name, id_account, "Create new account");
				res.json({
					status: true,
					msg: 'Successfully to create new account.'
				});
			}else{
				res.status(400).json({
					status: false,
					msg: 'Failed to create new account.'
				});
			}
		}
	}else{
		res.status(400).json({
			status: false,
			msg: 'All fiels cannot be null.'
		});
	}
}

exports.activatedAccount = async (req, res) => {
	const { bank_name, name_card_holder, id_account, card_number, phone, address } = req.body;
	if (bank_name, name_card_holder, id_account, card_number, phone, address) {
		const checkStatusAccount = await accountModel.accountInfo(id_account);
		if (checkStatusAccount.length > 0) {
			if (checkStatusAccount[0].status == 1) {
				res.json({
					status: true,
					msg: 'Your account has been activated.'
				});
			}else{
				const activatedAccount = await accountModel.activatedAccount(bank_name, name_card_holder, id_account, card_number, phone, address);
				const changeStatusAccount = await accountModel.changeStatusAccount(id_account, "1");
				if (activatedAccount && checkStatusAccount) {
					await historyModel.createHistory(checkStatusAccount[0].name, id_account, "Activated account");
					res.json({
						status: true,
						msg: 'Successfully to activated your account.'
					});
				}else{
					res.status(400).json({
						status: false,
						msg: 'Failed to activated your account.'
					});
				}
			}
		}else{
			res.status(400).json({
				status: true,
				msg: 'ID account ' + id_account + ' does not exists.'
			});
		}
	}else{
		res.status(400).json({
			status: false,
			msg: 'All fields cannot be null.'
		});
	}
}

exports.deleteAccount = async (req, res) => {
	const { id_account } = req.body;
	if (id_account) {
		const checkIdAccount = await accountModel.accountInfo(id_account);
		if (checkIdAccount.length > 0) {
			const deleteAccount = await accountModel.deleteAccount(id_account);
			if (deleteAccount) {
				res.json({
					status: true,
					msg: 'Successfully to delete ID account ' + id_account
				});
			}else{
				res.status(400).json({
					status: true,
					msg: 'Failed to delete ID account ' + id_account
				});
			}
		}else{
			res.status(400).json({
				status: false,
				msg: 'ID account ' + id_account + ' does not exists.'
			});
		}
	}else{
		res.status(400).json({
			status: false,
			msg: 'ID account cannot be null.'
		});
	}
}