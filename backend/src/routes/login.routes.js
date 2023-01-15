const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Model
const User = require("../models/login");

// ADD a new User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.json({ status: "There is a user with this email" });
    } else if (!name || !email || !password) {
      return res.json({
        status: "You need input your name, email or password",
      });
    } else {
      bcrypt.hash(password, 10, (error, passwordHasheada) => {
        if (error) res.json({ error });
        else {
          const newUser = new User({
            name,
            email,
            password: passwordHasheada,
          });

          newUser
            .save()
            .then((user) => {
              res.json({ status: "User created succesfully", user });
            })
            .catch((error) => console.error(error));
        }
      });
    }
  });
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.json({ status: "There is not a user found" });
    }

    bcrypt.compare(password, user.password).then((correct) => {
      if (correct) {
        jwt.sign(
          {
            data: user,
          },
          "secret",
          { expiresIn: "1h" }
        );

        res.json({
          status: "User logged in successfully",
          user
        });
      } else {
        return res.json({ status: "Incorrect password" });
      }
    });
  });
});

module.exports = router;
