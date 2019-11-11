const db = require('../helpers/Database');

const createUser = async (info) => {
    await db.personalQuery(
        `INSERT INTO users
        (username, password, email, firstname, lastname, age, gender, emailHash)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?)`,
        info
    );
};

const usernameExists = async (username) => {
    let user = await db.personalQuery(
        "SELECT * FROM users WHERE username LIKE ?",
        [username]
    );

    if (user.length === 0)
        return false;
    return true
}

const activateAccount = async (token) => {
    var checkToken = await db.personalQuery(
        "select * from users where emailHash = ?",
        [token]
    );
    if (checkToken.length === 0)
        return { error: "Invalid token." }
    if (checkToken[0].activated == 0 && checkToken[0].emailHash == token) {
        await db.personalQuery(
            "UPDATE users SET activated = 1 where emailHash = ?",
            [token]
        );
        return { success: "Your account is now activated" };
    } else if (checkToken[0].activated == 1)
        return { error: "Your account is already verified" };
    return { error: "Something is wrong." };

}

const getUserById = async (id) => {

}

const getUserByUsername = async (username) => {
    let user = await db.personalQuery('SELECT * FROM users WHERE username LIKE ?', [username]);
    if (user.length === 0)
        return null;
    return user[0];
}

const updateLocation = async (info) => {
    await db.personalQuery(`UPDATE users SET longitude = ?, latitude = ? WHERE username LIKE ?`, info);
}

module.exports = {
    createUser,
    usernameExists,
    activateAccount,
    getUserById,
    getUserByUsername,
    updateLocation
}