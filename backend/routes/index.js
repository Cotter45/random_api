const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const apiRouter = require("./api");

// test route
router.get('/', asyncHandler(async (req, res, next) => {
  return res.json({ message: "Hello World!" });
}));

router.use("/api", apiRouter);

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  // Serve the frontend's index.html file at the root route
  router.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, "../../dynamic", "build", "index.html")
    );
  });

  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../dynamic/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, "../../dynamic", "build", "index.html")
    );
  });
}

module.exports = router;
