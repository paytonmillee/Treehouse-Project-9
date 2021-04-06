const auth = require("basic-auth");
const bcrypt = require("bcryptjs");
const { Users } = require("../models");

//Authenticating the User by email
exports.authenticateUser = (req, res, next) => {
  let message;
  const credentials = auth(req);
  console.log(credentials);
  if (credentials) {
    Users.findOne({
      where: { emailAddress: credentials.name },
    })
      //if the email provided is correct, then it moves on to authenicating the User by password
      .then((user) => {
        const authenticated = bcrypt.compareSync(
          credentials.pass,
          user.password
        );
        ///if true authentication becomes successful
        if (authenticated) {
          console.log(
            `Authentication successful for username: ${user.username}`
          );

          req.currentUser = user;
          ///else username is not recognized or valid and user can not move on to authenticate their password
        } else {
          message = `Authentication failure for username: ${user.username}`;
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
