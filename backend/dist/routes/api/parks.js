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
const redis_1 = __importDefault(require("../../utils/redis"));
const { Park, State, ParkPicture } = require("../../db/models");
const router = express_1.default.Router();
// route to get a random park
router.get('/random_park', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const random_number = Math.floor(Math.random() * (59) + 1);
    try {
        let park;
        if (yield redis_1.default.exists(`park_${random_number}`)) {
            park = yield redis_1.default.get(`park_${random_number}`);
            return res.status(200).send(park);
        }
        else {
            park = yield Park.findByPk(+random_number, {
                include: [
                    { model: State },
                    { model: ParkPicture }
                ]
            });
            yield redis_1.default.set(`park_${random_number}`, JSON.stringify(park));
            return res.status(200).json(park);
        }
    }
    catch (e) {
        next(e);
    }
})));
// route to get a random picture
router.get('/random_picture', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let pictures;
    if (yield redis_1.default.exists('park_pictures')) {
        pictures = yield redis_1.default.get('park_pictures');
    }
    else {
        pictures = yield ParkPicture.findAll();
    }
    const random_number = Math.floor(Math.random() * (pictures.length - 1) + 1);
    const randomPicture = pictures[random_number];
    return res.json(randomPicture.location);
})));
// route to get individual park
router.get('/:id', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let park;
        if (yield redis_1.default.exists(`park_${id}`)) {
            park = yield redis_1.default.get(`park_${id}`);
            return res.status(200).send(park);
        }
        else {
            park = yield Park.findByPk(+id, {
                include: [
                    { model: State },
                    { model: ParkPicture }
                ]
            });
            yield redis_1.default.set(`park_${id}`, JSON.stringify(park));
            return res.status(200).json(park);
        }
    }
    catch (e) {
        next(e);
    }
})));
// route to get all parks and associated details
router.get('/', asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let parks;
        if (yield redis_1.default.exists('parks')) {
            parks = yield redis_1.default.get('parks');
            return res.status(200).send(parks);
        }
        else {
            parks = yield Park.findAll({
                include: [
                    { model: State },
                    { model: ParkPicture }
                ]
            });
            yield redis_1.default.set('parks', JSON.stringify(parks));
            return res.status(200).json(parks);
        }
    }
    catch (e) {
        next(e);
    }
})));
module.exports = router;
