const asyncHandler = require("express-async-handler");

const Todo = require("../models/todomodel");

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getToDo = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setToDo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text feild");
  }

  const todo = await Todo.create({
    text: req.body.text,
  });
  res.status(200).json(todo);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const putToDo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("todo not found");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTodo);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteToDo = asyncHandler(async (req, res) => {

  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }
  await todo.remove()

  res.status(200).json({id: req.params.id});
});

module.exports = {
  getToDo,
  setToDo,
  putToDo,
  deleteToDo,
};
