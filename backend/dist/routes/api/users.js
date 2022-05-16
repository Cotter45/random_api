"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const asyncHandler = require("express-async-handler");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
// Get logs
router.get('/logs', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date(Date.now());
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10)
        month = '0' + `${month}`;
    if (day < 10)
        day = '0' + `${day}`;
    const file = `info-${year}-${month}-${day}.log`;
    const route = path_1.default.resolve('logs');
    const infoLogs = fs_1.default.readFileSync(`${route}/${file}`, 'utf8');
    return res.send([infoLogs]);
})));
module.exports = router;
