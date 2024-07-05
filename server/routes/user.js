const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id; 
    const user = await User.findByPk(userId);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ error: "User not found"});
    }
  }
   catch (error) {
    next(error);
  }
}); 

// REGISTER new user
router.post("/register", async (req, res, next) => {
  try {
    const errros = validationResult(req);
    if(!errros.isEmpty()) {
      res.status(400).json({ errros: errros.array() });
    } else {
      const newExercise = await User.create(req.body);
      res.status(201).send(newExercise)
    }
  } catch(err) {
    next(err)
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const toUpdateUser = await User.findByPk(req.params.id);
       await toUpdateUser.update(req.body);
      res.status(214).json(toUpdateUser);
    }
  } catch(error) {
      next(error);
  }
})

module.exports = router;