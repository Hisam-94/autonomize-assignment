"use strict";
// import { NextFunction, Request, Response, RequestHandler } from 'express';
// import User from '../models/User';
// import { ApiError } from '../middleware/errorHandler';
// import { getGithubUser, getGithubUserFollowers, getGithubUserFollowing } from '../utils/githubApi';
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
exports.getSortedUsers = exports.updateUser = exports.softDeleteUser = exports.searchUsers = exports.saveGithubUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const errorHandler_1 = require("../middleware/errorHandler");
const githubApi_1 = require("../utils/githubApi");
const saveGithubUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        // Check if user exists and is not deleted
        let user = yield User_1.default.findOne({ login: username, deleted: false });
        if (user) {
            res.json(user);
            return;
        }
        // Fetch from GitHub API
        const [userData, followers, following] = yield Promise.all([
            (0, githubApi_1.getGithubUser)(username),
            (0, githubApi_1.getGithubUserFollowers)(username),
            (0, githubApi_1.getGithubUserFollowing)(username)
        ]);
        // Find mutual followers (friends)
        const friends = followers.filter(f => following.includes(f));
        // Create new user
        user = yield User_1.default.create(Object.assign(Object.assign({}, userData), { followers_list: followers, following_list: following, friends }));
        res.status(201).json(user);
    }
    catch (error) {
        next(new errorHandler_1.ApiError(404, 'User not found or error fetching data'));
    }
});
exports.saveGithubUser = saveGithubUser;
const searchUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        const users = yield User_1.default.find({
            deleted: false,
            $text: { $search: q }
        });
        res.json(users);
    }
    catch (error) {
        next(new errorHandler_1.ApiError(500, 'Error searching users'));
    }
});
exports.searchUsers = searchUsers;
const softDeleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const user = yield User_1.default.findOneAndUpdate({ login: username }, { deleted: true }, { new: true });
        if (!user) {
            throw new errorHandler_1.ApiError(404, 'User not found');
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.softDeleteUser = softDeleteUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const updateData = req.body;
        // Only allow specific fields to be updated
        const allowedUpdates = ['location', 'blog', 'bio', 'company', 'email'];
        const updates = Object.keys(updateData)
            .filter(key => allowedUpdates.includes(key))
            .reduce((obj, key) => {
            obj[key] = updateData[key];
            return obj;
        }, {});
        const user = yield User_1.default.findOneAndUpdate({ login: username, deleted: false }, updates, { new: true });
        if (!user) {
            throw new errorHandler_1.ApiError(404, 'User not found');
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const getSortedUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sortBy = 'created_at', order = 'desc' } = req.query;
        const validSortFields = ['public_repos', 'public_gists', 'followers', 'following', 'created_at'];
        if (!validSortFields.includes(sortBy)) {
            throw new errorHandler_1.ApiError(400, 'Invalid sort field');
        }
        const users = yield User_1.default.find({ deleted: false })
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 });
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getSortedUsers = getSortedUsers;
