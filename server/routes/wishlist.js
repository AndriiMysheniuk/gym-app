const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const { Wishlist } = require("../models");

// GET /wishlist
router.get("/", async (req, res, next) => {
  try {
    const sauces = await Wishlist.findAll();
    res.send(sauces);
  } catch (error) {
    next(error);
  }
});

// POST /wishlist
router.post("/", async (req, res, next) => {
  try {
    const errros = validationResult(req);
    if(!errros.isEmpty()) {
      res.status(400).json({ errros: errros.array() });
    } else {
      const newExercise = await Wishlist.create(req.body);
      res.status(201).send(newExercise)
    }
  } catch(err) {
    next(err)
  }
})

// DELETE /wishlist
router.delete("/:id", async (req, res, next) => {
  try {
    const toDelete = await Wishlist.findByPk(req.params.id)
    await toDelete.destroy();
    res.status(200).json(toDelete);
  }
  catch (error) {
    next (error);
  }
})

module.exports = router;
