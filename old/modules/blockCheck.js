'use strict';
const db = require('./Database');

exports.blockCheck = async (request, response, next) => {
    let target = request.body.target;
    let user = request.decoded.user;
    let sqlQuery = 'SELECT * FROM block WHERE user1 IN (?, ?) AND user2 IN (?, ?)';

    try {
        let res = await db.personalQuery(sqlQuery, [
            target,
            user,
            target,
            user
        ]);
        if (res.length === 0) {
            return next();
        }
        return response.status(200).json({ error: 'Bad request.' });
    } catch (error) {
        return response.status(500).json({ error: 'Something is wrong.' });
    }
};