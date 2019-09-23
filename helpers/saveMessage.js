'use strict'
const db = require('../modules/Database');
const tokenToId = require('./tokenToId').tokenToId;

module.exports = async (senderToken, receiver, message) => {
    let sender = tokenToId(senderToken);
    
    try {
        await db.personalQuery('INSERT INTO messages (sender, receiver, message) VALUE (?, ?, ?)', [
            sender,
            receiver,
            message
        ]);
        return { success: 'Your message has been saved.' };
    } catch (error) {
        console.log(error);
        return { error: 'Something is wrong.' };
    }
};