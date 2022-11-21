var express = require("express");
var User = require("../models/User");
var Todo = require("../models/Todo");
var auth = require("../middlewares/auth");
var router = express.Router();

// create Todo
router.post("/", auth.verifyToken, async (req, res, next) => {
  req.body.author = req.user.userId;
  try {
    req.body.id = req.body.title;
    var todo = await Todo.create(req.body);
    res.json({ todo });
  } catch (error) {
    next(error);
  }
});

// Get Single Todo
router.get("/:id", auth.verifyToken, async (req, res, next) => {
  let id = req.params.id;
  let author = req.user.userId;
  try {
    let singleTodo = await Todo.findOne({ id, author });
    return res.json({ singleTodo });
  } catch (error) {
    next(error);
  }
});

//Get All Todos
router.get("/", auth.verifyToken, async (req, res, next) => {
  try {
    let todos = await Todo.find();
    return res.json({ todos });
  } catch (error) {
    next(error);
  }
});

// Update Todo
router.put("/update/:id", auth.verifyToken, async (req, res, next) => {
  let id = req.params.id;
  let data = req.body;
  try {
    let updatedTodo = await Todo.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({ updatedTodo });
  } catch (error) {
    next(error);
  }
});

// Delete Todo
router.delete("/delete/:id", auth.verifyToken, async (req, res, next) => {
  let id = req.params.id;
  try {
    let deletedTodo = await Todo.findByIdAndDelete(id);
    res.status(200).json({ deletedTodo });
  } catch (error) {
    next(error);
  }
});

// Delete All Todos
router.delete("/delete", auth.verifyToken, async (req, res, next) => {
  try {
    let deletedTodos = await Todo.findOneAndDelete({author: id });
    res.status(200).json({ deletedTodos });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
