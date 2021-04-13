const auth = require("basic-auth");
const bcrypt = require("bcryptjs");
const { Users } = require("../models");

//Authenticating the User by email
exports.authenticateUser = (req, res, next) => {
  let message;
  const credentials = auth(req);

  if (credentials) {
    Users.findOne({
      where: { emailAddress: credentials.name },
    })
      .then((userInfo) => {
        console.log(userInfo.dataValues);
        const authenticated = bcrypt.compare(
          credentials.pass,
          userInfo.password
        );
        ///if true authentication becomes successful
        if (authenticated) {
          console.log(`Authentication successful`);

          req.currentUser = userInfo;
          ///else username is not recognized or valid and user can not move on to authenticate their password
        } else {
          message = `Authentication failure for username: ${userInfo.email}`;
        }
      })
      .catch((error) => {
        message = `User not found for username: ${credentials.name}`;
      });
  } else {
    message = "Auth header not found";
  }
  if (message) {
    console.warn(message);
    res.status(401).json({ message: "Access Denied" });
  } else {
    next();
  }
};
