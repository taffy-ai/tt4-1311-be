const express = require("express");
const { createTask, getTasks } = require("../controllers/taskController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/tasks", authMiddleware, createTask);
router.get("/tasks", authMiddleware, getTasks);

module.exports = router;