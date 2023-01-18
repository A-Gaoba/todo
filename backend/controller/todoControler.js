const asyncHandler = require("express-async-handler");

const Todo = require("../models/todomodel");
const Todo = require("../models/usermodel");

// @desc    Get todos
// @route   GET /api/todos
// @access  Private
const getToDo = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

// @desc    Set todos
// @route   POST /api/todos
// @access  Private
const setToDo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text feild");
  }

  const todo = await Todo.create({
    text: req.body.text,
    user: req.body.id,
  });
  res.status(200).json(todo);
});

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Private
const putToDo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("todo not found");
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTodo);
});

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Private
const deleteToDo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
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
