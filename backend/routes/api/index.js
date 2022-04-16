const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const parksRouter = require("./parks.js");

router.use("/session", sessionRouter);
router.use("/parks", parksRouter);
router.use("/users", usersRouter);

module.exports = router;
