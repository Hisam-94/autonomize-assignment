"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// Save or fetch GitHub user
router.get('/users/:username', userController_1.saveGithubUser);
// Search users
router.get('/search', userController_1.searchUsers);
// Soft delete user
router.delete('/users/:username', userController_1.softDeleteUser);
// Update user
router.patch('/users/:username', userController_1.updateUser);
// Get sorted users
router.get('/users', userController_1.getSortedUsers);
exports.default = router;
