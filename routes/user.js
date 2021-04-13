var express = require("express");
var router = express.Router();
var { Users, Courses } = require("../models");
const { authenticateUser } = require("../middleware/auth-user");

//User GET route
router.get("/", authenticateUser, (req, res, next) => {
  console.log(req.currentUser);
  Users.findByPk(req.currentUser.id)
    .then((users) => {
      res.status(200);
      res.json(users).end();
    })
    .catch((error) => {
      res.status(500);
      res.json(error).end();
    });
});
//Users POST route
router.post("/", (req, res, next) => {
  const user = req.body;

  Users.create({
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    password: user.password,
  })
    .then((user) => {
      res.status(201).location("/").end();
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
      res.end();
    });
});

module.exports = router;
