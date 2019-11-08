'use strict';
const db = require('../modules/Database');

exports.fameRate = async (user) => {
    const sqlQuery1 = "SELECT count(*) as nb from relations WHERE secondaryuser = ?";
    const sqlQuery2 = "SELECT count(*) as nb from matches WHERE user1 = ? OR user2 = ?";
    const sqlQuery3 = "SELECT count(*) as nb from relations WHERE secondaryuser = ? AND relation = 1"

    try {
        let relations = await db.personalQuery(sqlQuery1, [ user ]);
        let matches = await db.personalQuery(sqlQuery2, [ user, user ]);
        let likes = await db.personalQuery(sqlQuery3, [ user ]);
        let total;

        relations = relations[0].nb;
        likes = likes[0].nb;
        matches = matches[0].nb;
        
        total = relations + matches;

        if (total === 0)
            return 0;
        return ((likes + matches) * 10 / total);
    } catch (error) {
        throw error;
    }
}