const { Task } = require("../models/task");
const express = require("express");
const { Project } = require("../models/project");
const router = express.Router();

const mongoose = require("mongoose");

//fetch all tasks
router.get("/", async (req, res) => {
  const taskList = await Task.find();

  if (!taskList) {
    res.status(500).json({ success: false });
  }
  res.send(taskList);
});

//fetch tasks for selected project
router.get("/", async (req, res) => {
  let filter;
  if (req.query.project) {
    const filter = { project: req.query.project };
  }

  const tasks = await Task.find({
    filter,
  });

  if (!tasks) {
    res.status(500).json({ success: false });
  }

  res.send(tasks);
});

//fetch a particular task
router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id).populate("project");

  if (!task) {
    res
      .status(500)
      .json({ message: "The category with given id was not found" });
  }
  res.status(200).send(task);
});

//add task
router.post("/", async (req, res) => {
  const project = await Project.findById(req.body.project);
  if (!project) return res.status(400).send("Invalid project");
  let task = new Task({
    name: req.body.name,
    description: req.body.description,
    project: req.body.project,
    member: req.body.members,
    startDate: req.body.starDate,
    endDate: req.body.endDate,
    hoursWorked: req.body.hoursWorked,
    status: req.body.status,
  });

  task = task.save();

  if (!task) {
    return res.status(400).send("The Task cannot be created");
  }
  res.send(task);
});

//edit/update task
router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid Task ID");
  }
  const task = await task.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      project: req.body.project,
      member: req.body.members,
      startDate: req.body.starDate,
      endDate: req.body.endDate,
      hoursWorked: req.body.hoursWorked,
      status: req.body.status,
    },
    {
      new: true,
    }
  );

  if (!task) {
    return res.status(400).send("The project cannot be created");
  }
  res.send(task);
});

//delete task
router.delete("/:id", (req, res) => {
  Task.findByIdAndRemove(req.params.id)
    .then((task) => {
      if (task) {
        return res
          .status(200)
          .json({ success: true, message: "The task is deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "task not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
