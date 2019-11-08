const db = require('./Database');

module.exports = notify = async (user, message) => {
    await db.personalQuery('INSERT INTO notifications (userid, content) VALUES (?, ?)', [ user, message ]);
}