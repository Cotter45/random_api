"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users_1 = __importDefault(require("./users"));
const parks_1 = __importDefault(require("./parks"));
const cocktails_1 = __importDefault(require("./cocktails"));
router.use("/cocktails", cocktails_1.default);
router.use("/parks", parks_1.default);
router.use("/users", users_1.default);
exports.default = router;
