const auth = require("basic-auth");
const bcrypt = require("bcryptjs");
const { Users } = require("../models");
//Authenticating the User by email
exports.authenticateUser = async (req, res, next) => {
  let message;
  const credentials = auth(req);
  console.log(credentials);
  if (credentials) {
    let user = await Users.findOne({
      where: { emailAddress: credentials.name },
    });
    if (user) {
      const authenticated = await bcrypt.compare(
        credentials.pass,
        user.password
      );
      ///if true authentication becomes successful
      if (authenticated) {
        console.log(`Authentication successful for ${user.email}`);
        req.currentUser = user;
        ///else username is not recognized or valid and user can not move on to authenticate their password
      } else {
        message = `Authentication failure for username: ${user.email}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
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
