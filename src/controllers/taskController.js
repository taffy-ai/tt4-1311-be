const Task = require("../models/Task");
const mongoose = require("mongoose");

const resolveAssignedUserId = (assignedUserId) => {
    if (!assignedUserId) return null;

    if (!mongoose.Types.ObjectId.isValid(assignedUserId)) {
        throw new Error("Invalid assignedUserId");
    }

    return assignedUserId;
};

// CREATE TASK
const createTask = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { title, description, done, priority, assignedUserId } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        let resolvedAssignedUserId;

        try {
            resolvedAssignedUserId = resolveAssignedUserId(assignedUserId);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

        const task = await Task.create({
            title,
            description: description || "",
            done: done ?? false,
            priority: priority || "medium",
            userId: req.user.id,
            assignedUserId: resolvedAssignedUserId || null
        });

        return res.status(201).json({
            message: "Task created successfully",
            data: task
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// GET TASKS
const getTasks = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const tasks = await Task.find({
            $or: [
                { userId: req.user.id },
                { assignedUserId: req.user.id }
            ]
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Tasks fetched successfully",
            data: tasks
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createTask, getTasks };