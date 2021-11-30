const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const userList = await User.find().select("-password");

  if (!userList) {
    res.status(500).json({ success: false });
  }

  res.send(userList);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(500).json({ message: "The user with given id was not found" });
  }
  res.status(200).send(user);
});

router.get("/?email", async (req, res) => {
  const user = await User.findOne({
    email: req.query.email,
  });

  if (!user) {
    res.status(500).json({ message: "The user with given id was not found" });
  }
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    isAdmin: req.body.isAdmin,
  });
  user = await user.save();

  if (!user) {
    return res.status(400).send("User cannot be created");
  }
  res.send(user);
});

router.post("/register", async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    isAdmin: req.body.isAdmin,
  });
  user = await user.save();

  if (!user) {
    return res.status(400).send("User cannot be created");
  }
  res.send(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("User not found");
  }

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    // const token = jwt.sign(
    //   {
    //     userId: user.id,
    //     isAdmin: user.isAdmin,
    //   },
    //   "secret",
    //   {
    //     expiresIn: "1d",
    //   }
    // );
    res.status(200).send({
      user: user.email,
      isAdmin: user.isAdmin,
      name: user.name,
    });
  } else {
    res.status(400).send("Wrong password");
  }

  //return res.status(200).send(user);
});

module.exports = router;
