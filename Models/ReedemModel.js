const db = require('../Config/Database');

exports.checkCode = (code) => {
	return db('reedems')
	.where({
		code: code
	});
}

exports.createReedemCode = (code, reward) => {
	let data = {
		code: code,
		reward: reward
	};

	return db('reedems')
	.insert(data);
}

exports.deleteCode = (code) => {
	return db('reedems')
	.where('code', code)
	.del();
}