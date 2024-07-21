const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema.js");
const Faculty = require("../models/faculty");
const bcrypt = require("bcryptjs");
const Event = require("../models/events.js");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const fetchuser = require("../Middlewear/fetchuser");
const fetchFaculty = require("../Middlewear/fetchfaculty");
const Feedback = require("../models/feedback.js");

const JWT_SIGN = "rguktrkv";

// Create User
router.post(
  "/createUser",
  [
    check("name")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long"),
    check("password", "Password must have at least 8 characters").isLength({
      min: 8,
    }),
    check("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, error: "Sorry, user already exists" });
      }
      // const salt = await bcrypt.genSalt(5);
      // const hashedPassword = await bcrypt.hash(req.body.password, salt);
      console.log(req.body.password);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      console.log(user);
      const data = {
        user: {
          id: user.id,
        },
      };
      const webtoken = jwt.sign(data, JWT_SIGN, { expiresIn: "1h" });
      res.json({ success: true, "auth-token": webtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Appoint Organizer
router.put("/appointOrg/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { role: "organizer" },
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true, updateUser });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal Server Error");
  }
});

// Appoint Volunteer
router.put("/appointVol/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { isVolunteer: true },
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true, updateUser });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal Server Error");
  }
});

// Create Faculty
router.post(
  "/createFaculty",
  [
    check("name")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long"),
    check("password", "Password must have at least 8 characters").isLength({
      min: 8,
    }),
    check("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() });
    }
    try {
      let faculty = await Faculty.findOne({ email: req.body.email });
      if (faculty) {
        return res
          .status(400)
          .json({ success: false, error: "Sorry, user already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      faculty = await Faculty.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      const data = {
        Faculty: {
          id: faculty.id,
        },
      };
      const webtoken = jwt.sign(data, JWT_SIGN, { expiresIn: "1h" });
      res.json({ success: true, "auth-token": webtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// User Login
router.post(
  "/userLogin",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
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
          .json({ success: false, error: "User does not exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SIGN, { expiresIn: "1h" });
      res.json({ success: true, token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
router.post(
  "/facultyLogin",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await Faculty.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, error: "User does not exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SIGN, { expiresIn: "1h" });
      res.json({ success: true, token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Get User Details
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/createEvent", async (req, res) => {
  try {
    let event = await User.findOne({ name: req.body.name });
    if (event) {
      return res
        .status(400)
        .json({ success: false, error: "Sorry, event already exists" });
    }
    event = await Event.create({
      name: req.body.name,
      description: req.body.description,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      venue: req.body.venue,
      volunteers: req.body.volunteers,
      organizers: req.body.organizers,
      winners: req.body.winners,
      prizeDetails: req.body.prizeDetails
    });
    res.json({ success: true, message: "created Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updateEvent/:id", async (req, res) => {
  try {
    const updateEvent = await Event.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      volunteers: req.body.volunteers,
      organizers: req.body.organizers,
      winners: req.body.winners,
      prizeDetails: req.body.prizeDetails,
    });

    res.json({ success: true, message: "updated Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deleteEvent/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }
    res.json({ success: true, message: "Event deleted successfully", event });
  } catch (e) {
    console.log(e);
  }
});

router.post("/addFeedback/:id", async (req, res) => {
  try {
    
    let feedback = await Feedback.create({

      eventId: req.params.id,
      user: req.body.user,
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      rating: req.body.rating,
    });
    res.json({ success: true, message: "created Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
