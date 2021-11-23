const { Project } = require("../models/project");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const projectList = await Project.find();

  if (!projectList) {
    res.status(500).json({ success: false });
  }
  res.send(projectList);
});

router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res
      .status(500)
      .json({ message: "The category with given id was not found" });
  }
  res.status(200).send(project);
});

router.post("/", async (req, res) => {
  let project = new Project({
    name: req.body.name,
    type: req.body.type,
    createdBy: req.body.createdBy,
    starDate: req.body.starDate,
    endDate: req.body.endDate,
    members: req.body.members,
    status: req.body.status,
  });

  project = project.save();

  if (!project) {
    return res.status(400).send("The project cannot be created");
  }
  res.send(project);
});

router.put("/:id", async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      type: req.body.type,
      createdBy: req.body.createdBy,
      starDate: req.body.starDate,
      endDate: req.body.endDate,
      members: req.body.members,
      status: req.body.status,
    },
    {
      new: true,
    }
  );

  if (!project) {
    return res.status(400).send("The project cannot be created");
  }
  res.send(project);
});

router.delete("/:id", (req, res) => {
  Project.findByIdAndRemove(req.params.id)
    .then((project) => {
      if (project) {
        return res
          .status(200)
          .json({ success: true, message: "The product is deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "project not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
