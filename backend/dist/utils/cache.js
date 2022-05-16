"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const node_cache_1 = __importDefault(require("node-cache"));
class Cache {
    constructor(ttlSeconds) {
        this.cache = new node_cache_1.default({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
    }
    has(key) {
        return this.cache.has(key);
    }
    get(key) {
        return this.cache.get(key);
    }
    set(key, value) {
        return this.cache.set(key, value);
    }
    getOrStore(key, storeFunction) {
        const value = this.cache.get(key);
        if (value) {
            return Promise.resolve(value);
        }
        return storeFunction().then((result) => {
            this.cache.set(key, result);
            return result;
        });
    }
    del(key) {
        this.cache.del(key);
    }
    delStartWith(startStr = '') {
        if (!startStr) {
            return;
        }
        const keys = this.cache.keys();
        for (const key of keys) {
            if (key.indexOf(startStr) === 0) {
                this.del(key);
            }
        }
    }
    flush() {
        this.cache.flushAll();
    }
}
module.exports = Cache;
