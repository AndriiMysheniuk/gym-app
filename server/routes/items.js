const express = require("express");
const router = express.Router();
const { Item } = require("../models");
const { check, validationResult } = require("express-validator");

// GET /items
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    next(error);
  }
});

// GET /api/items/:id
router.get("/:id", async (req, res, next) => {
  try {
    const itemId = req.params.id; 
    const item = await Item.findByPk(itemId);
    if (item) {
      res.send(item);
    } else {
      res.status(404).send({ error: "Item not found"});
    }
  }
   catch (error) {
    next(error);
  }
}); 

router.use(express.json());
router.use(express.urlencoded({extended: true}))

//ADD NEW Item
router.post("/", [
  check("name").notEmpty(options = { ignore_whitespace: true }),
  check("bodyPart").notEmpty(options = { ignore_whitespace: true }),
  check("equipment").notEmpty(options = { ignore_whitespace: true }),
  check("target").notEmpty(options = { ignore_whitespace: true }),
  check("gifUrl").custom((value, { req }) => {
    if (!value.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
      throw new Error("Invalid image format");
    }
    return true;
  }),
],
async (req,res,next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const newItem = await Item.create(req.body);
      res.status(201).send(newItem);
    }
  } catch (error) {
    next(error);
  }
})

//UPDATE item
router.put("/:id", [
  check("name").notEmpty(options = { ignore_whitespace: true }),
  check("bodyPart").notEmpty(options = { ignore_whitespace: true }),
  check("equipment").notEmpty(options = { ignore_whitespace: true }),
  check("target").notEmpty(options = { ignore_whitespace: true }),
  check("gifUrl").custom((value, { req }) => {
    if (!value.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
      throw new Error("Invalid image format");
    }
    return true;
  }),
],
async (req,res,next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const toUpdate = await Item.findByPk(req.params.id);
       await toUpdate.update(req.body);
      res.status(214).json(toUpdate);
    }
  } catch(error) {
      next(error);
  }
})

//DELETE item
router.delete("/:id", async (req, res, next) => {
  try {
    const toDelete = await Item.findByPk(req.params.id)
    await toDelete.destroy();
    res.status(200).json(toDelete);
  }
  catch (error) {
    next (error);
  }
})
module.exports = router;
