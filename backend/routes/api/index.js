const router = require("express").Router();
const usersRouter = require("./users.js");
const parksRouter = require("./parks.js");
const cocktailsRouter = require("./cocktails.js");

router.use("/cocktails", cocktailsRouter);
router.use("/parks", parksRouter);
router.use("/users", usersRouter);

module.exports = router;
