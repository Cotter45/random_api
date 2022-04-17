const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const parksRouter = require("./parks.js");
const cocktailsRouter = require("./cocktails.js");

router.use("/cocktails", cocktailsRouter);
router.use("/parks", parksRouter);
router.use("/session", sessionRouter);
router.use("/users", usersRouter);

module.exports = router;
