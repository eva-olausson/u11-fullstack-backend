const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const passport = require("passport");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.route("/register").post((req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email finns redan";
      return res.status(404).json(errors);
    }

    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        });

        newUser
          .save()
          .then((newUser) => res.json(newUser))
          .catch((err) => console.log(err));
      });
    });
  });
});

router.route("/login").post((req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          const token = jwt.sign(
            { id: user._id },
            process.env.SECRET,
            { expiresIn: "1d" },
            function (err, token) {
              return res.json({
                success: true,
                token: token,
                user: {
                  _id: user._id,
                  username: user.username,
                  email: user.email,
                  isAdmin: user.isAdmin,
                },
              });
            }
          );
        } else {
          errors.password = "Lösenordet stämmer inte";
          return res.status(404).json(errors);
        }
      });
    } else {
      errors.email = "Användaren finns inte";
      return res.status(404).json(errors);
    }
  });
});

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

router.delete("/:id", async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.id });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.route("/search").post((req, res) => {
  User.findOne({
    $or: [{ email: req.body.text }, { username: req.body.text }],
  })
    .then((user) => res.json({ userId: user._id }))
    .catch((err) => res.status(404).json({ msg: "Användaren finns inte" }));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.json({
          id: user._id,
          username: user.username,
          email: user.email,
        });
      } else {
        return res.status(404).json({ msg: "Användaren finns inte" });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
