const express = require("express");
const router = express.Router();

const {
  getToDo,
  setToDo,
  putToDo,
  deleteToDo,
} = require("../controller/todoControler");

router.route("/").get(getToDo).post(setToDo);
router.route("/:id").delete(deleteToDo).put(putToDo);;


module.exports = router;
