const express = require("express");
const router = express.Router();

const {
  getToDo,
  setToDo,
  putToDo,
  deleteToDo,
} = require("../controller/todoControler");

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getToDo).post(protect, setToDo)
router.route('/:id').delete(protect, deleteToDo).put(protect, putToDo)



module.exports = router;
