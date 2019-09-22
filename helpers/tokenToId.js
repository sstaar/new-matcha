'use strict'
const jwt = require('jsonwebtoken');

exports.tokenToId = (token) => {
      const options = {
        expiresIn: '2d'
      };
      try {
        // Verify makes sure that the token hasn't expired and has been issued by us.
        let result = jwt.verify(token, process.env.JWT_SECRET || "GALATA", options);

        return (result.user);
      } catch (err) {
          return (err);
      }
};