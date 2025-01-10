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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGithubUserFollowing = exports.getGithubUserFollowers = exports.getGithubUser = void 0;
const axios_1 = __importDefault(require("axios"));
const baseURL = process.env.GITHUB_API_BASE_URL;
const getGithubUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${baseURL}/users/${username}`);
        return response.data;
    }
    catch (error) {
        throw new Error('Failed to fetch GitHub user');
    }
});
exports.getGithubUser = getGithubUser;
const getGithubUserFollowers = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${baseURL}/users/${username}/followers`);
        return response.data.map((follower) => follower.login);
    }
    catch (error) {
        throw new Error('Failed to fetch followers');
    }
});
exports.getGithubUserFollowers = getGithubUserFollowers;
const getGithubUserFollowing = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${baseURL}/users/${username}/following`);
        return response.data.map((following) => following.login);
    }
    catch (error) {
        throw new Error('Failed to fetch following users');
    }
});
exports.getGithubUserFollowing = getGithubUserFollowing;
