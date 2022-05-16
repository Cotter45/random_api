"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const routes_1 = __importDefault(require("./routes"));
const config_1 = __importDefault(require("./config"));
const isProduction = config_1.default.environment === "production";
const winston_1 = __importDefault(require("./utils/winston"));
const winston_2 = require("./utils/winston");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms', { stream: winston_2.stream }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/static", express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(routes_1.default); // Connect all the routes
// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});
// Process sequelize errors
app.use((err, _req, _res, next) => {
    let error;
    // check if error is a Sequelize error:
    if (err instanceof sequelize_1.ValidationError) {
        error = new Error("Validation Error");
        error.status = 500;
        error.errors = err.errors.map((e) => e.message);
        error.title = 'Validation error';
    }
    next(error);
});
// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    winston_1.default.error(`${err.status || 500} - ${err.message} - ${_req.originalUrl} - ${_req.method} - ${_req.ip}`);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});
module.exports = app;
