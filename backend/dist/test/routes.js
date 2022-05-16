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
Object.defineProperty(exports, "__esModule", { value: true });
const chaiTest = require("chai");
const chaiHttp = require("chai-http");
const expect = chaiTest.expect;
chaiTest.use(chaiHttp);
describe("Parks API Routes", function () {
    const baseUrl = "http://localhost:5000";
    it("should fail", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield chaiTest
            .request(baseUrl)
            .get('/fail');
        expect(res).to.have.status(404);
    }));
    it("should return a random park", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield chaiTest
            .request(baseUrl)
            .get('/api/parks/random_park')
            .set('Content-Type', 'application/json');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title');
    }));
    it("should return a random image", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield chaiTest
            .request(baseUrl)
            .get('/api/parks/random_picture')
            .set('Content-Type', 'application/json');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('string');
    }));
    it("should return a park", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield chaiTest
            .request(baseUrl)
            .get('/api/parks/1')
            .set('Content-Type', 'application/json');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title').eq('Acadia');
    }));
    it("should return all parks", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield chaiTest
            .request(baseUrl)
            .get('/api/parks')
            .set('Content-Type', 'application/json');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('title').eq('Acadia');
    }));
});
describe("Cocktails API Routes", function () {
    const baseUrl = "http://localhost:5000";
    it("should fail", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield chaiTest
            .request(baseUrl)
            .get('/fail');
        expect(res).to.have.status(404);
    }));
    it("should return a random image", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield chaiTest
            .request(baseUrl)
            .get('/api/cocktails/random_picture')
            .set('Content-Type', 'application/json');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('string');
    }));
    it("should return a specific cocktail, its ingredients and picture", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield chaiTest
            .request(baseUrl)
            .get('/api/cocktails/cocktail/2')
            .set('Content-Type', 'application/json');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('CocktailPictures');
        expect(res.body['CocktailPictures'][0]).to.have.property('location');
    }));
    it("should return a random cocktail, its ingredients and picture", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield chaiTest
            .request(baseUrl)
            .get('/api/cocktails/random_cocktail')
            .set('Content-Type', 'application/json');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('CocktailPictures');
        expect(res.body['CocktailPictures'][0]).to.have.property('location');
    }));
    it("should return all cocktails and their ingredients", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield chaiTest
            .request(baseUrl)
            .get('/api/cocktails')
            .set('Content-Type', 'application/json');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('name');
        expect(res.body[0]).to.have.property('CocktailPictures');
        expect(res.body[0]['CocktailPictures'][0]).to.have.property('location');
    }));
    it("should return all stock ingredients", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield chaiTest
            .request(baseUrl)
            .get('/api/cocktails/ingredients')
            .set('Content-Type', 'application/json');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('name');
    }));
    it("should return all ingredients with drinks you can make from them", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield chaiTest
            .request(baseUrl)
            .get('/api/cocktails/by_ingredients')
            .set('Content-Type', 'application/json');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('name');
        expect(res.body[0]).to.have.property('Cocktails');
        expect(res.body[0]['Cocktails']).to.be.an('array');
        expect(res.body[0]['Cocktails'][0]).to.have.property('name');
        expect(res.body[0]['Cocktails'][0]).to.have.property('CocktailPictures');
        expect(res.body[0]['Cocktails'][0]['CocktailPictures']).to.be.an('array');
        expect(res.body[0]['Cocktails'][0]['CocktailPictures'][0]).to.have.property('location');
    }));
});
