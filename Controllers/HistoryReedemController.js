const historyReedemModel = require('../Models/HistoryReedemModel');

exports.historyReedemAccount = async (req, res) => {
	const { id_account } = req.params;
	const data = await historyReedemModel.checkHistory(id_account)
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

exports.allHistoryReedem = async (req, res) => {
	const data = await historyReedemModel.allHistory();
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