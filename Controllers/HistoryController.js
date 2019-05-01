const historyModel = require('../Models/HistoryModel');

exports.historyAccount = async (req, res) => {
	const { id_account } = req.params;
	const data = await historyModel.checkHistory(id_account);
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

exports.allHistory = async (req, res) => {
	const data = await historyModel.allHistory();
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