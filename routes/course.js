var express = require("express");
var router = express.Router();
var { Courses, Users } = require("../models");
const { authenticateUser } = require("../middleware/auth-user");
/* GET api router. */
router.get("/", (req, res) => {
  Courses.findAll({
    include: [
      {
        model: Users,
      },
    ],
  })
    .then((data) => res.status(200).json(data))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});
//GET id Route
router.get("/:id", (req, res) => {
  Courses.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Users,
      },
    ],
  })
    //Checking to see if page runs successfully
    .then((course) => {
      res.status(200).json(course).end();
    })
    //Checking for Error on the page
    .catch((error) => {
      console.log(error);
      res.status(500);
      res.json(error).end();
    });
});
//POST Route
router.post("/", authenticateUser, (req, res) => {
  console.log(req.body);
  Courses.create(req.body)
    //Checking if the page runs successfully
    .then((course) => {
      res.status(201).Location(`/api/course/$[course.id]`);
    })
    //Checking to see if error is on page
    .catch((error) => {
      console.log(error);
      res.status(400);
      res.json(error).end();
    });
});

//PUT Course (update)

router.put("/:id", authenticateUser, function (req, res, next) {
  Courses.findByPk(req.params.id)
    .then(function (course) {
      course
        .update(req.body)

        .then((course) => {
          res.status(201).end();
        })
        .catch((error) => {
          res.status(400);
          res.json(error).end();
        });
    })
    .catch((error) => {
      res.status(400);
      res.json(error).end();
    });
});

//Deletes the course
router.delete("/:id", authenticateUser, function (req, res, next) {
  Courses.findByPk(req.params.id)
    .then((course) => {
      course.destroy();
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500);
      res.json(error).end();
    });
});

module.exports = router;
