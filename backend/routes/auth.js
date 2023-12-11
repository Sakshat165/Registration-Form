const express = require("express");
const User = require("../models/User");
const router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const JWT_SECRET = "Sakshatisagoodb$oy";

//ROUTE 1:New User using :POST "/api/auth/createuser". No login required

//Validation
router.post(
  "/createuser",
  [
    body("name", "Enter Valid Name").isLength({ min: 3 }),
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Enter Valid Password").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //Error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //Hashing Password to avoid hacking
      const salt = bcrypt.genSaltSync(10);
      const SecPass = bcrypt.hashSync(req.body.password, salt);
      //Create new User
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SecPass,
      });
      //creating tokens
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error
        return res.status(400).json({ error: "Email already exists" });
      }
      res.status(500).json({ error: "Server error" });
    }
  }
);

//ROUTE 2:Authenticate User :POST "/api/auth/login". No login required
router.post(
    "/login",
    [
      body("email", "Enter Valid Email").isEmail(),
      body("password", "Password Cannnot be Blank").exists(),
    ],
    async (req, res) => {
      //Error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({ error: "Please enter correct credentials" });
        }
        const PassCompare = await bcrypt.compare(password, user.password);
        if (!PassCompare) {
          return res
            .status(400)
            .json({ error: "Please enter correct credentials" });
        }
        const data = {
          user: {
            id: user.id,
          },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken });
      } catch (e) {
        console.log(e);
        res.status(500).json("Some error occured");
      }
    }
  );




module.exports = router;
