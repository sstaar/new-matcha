'use strict'
const jwt = require('jsonwebtoken');

exports.validateToken = (request, res, next) => {
    const authorizationBody = request.body.token;
    // return res.json( request.body);
    let result;
    if (authorizationBody) {
      const token = authorizationBody; // Bearer <token>
      const options = {
        expiresIn: '2d'
      };
      try {
        // Verify makes sure that the token hasn't expired and has been issued by us.
        result = jwt.verify(token, process.env.JWT_SECRET || "GALATA", options);

        // Let's pass back the decoded token to the request object.
        request.decoded = result;
        // We call next to pass execution to the subsequent middleware.
        next();
      } catch (err) {
        // Throw an error just in case anything goes wrong with verification.
        // TODO: Make the error invisible to client and push it to logs.
        res.json({
          status: 500,
          message: "PORN"
        })
        console.log(Error(err));
      }
    }
    else {
      console.log("HAHA");
      result = {
        error: `Authentication error. Token required al7mar.`,
        status: 401
      };
      res.status(200).send(result);
    }
};