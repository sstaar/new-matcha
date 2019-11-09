const db = require("./Database");
const notify = require("./notify");

exports.addToHistory = async (user, invoker, content, socket) => {
  sqlQuery = "INSERT INTO history (user, invoker, content) VALUES (?, ?, ?)";

  try {
    await db.personalQuery(sqlQuery, [user, invoker, content]);
    let username = await db.personalQuery(
      `SELECT username FROM users WHERE id = ?`,
      [user]
    );
    notify(user, username[0].username + " visited you.", socket);
  } catch (error) {
    console.log(error);
  }
};
