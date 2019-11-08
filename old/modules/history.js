const db = require('./Database');

exports.addToHistory = (user, invoker, content) => {
    sqlQuery = 'INSERT INTO history (user, invoker, content) VALUES (?, ?, ?)';

    try {
        db.personalQuery(sqlQuery, [ user, invoker, content ]);
    } catch (error) {
        console.log(error);
    }
}