import express from 'express';
import {
  searchUsers,
  softDeleteUser,
  updateUser,
  getSortedUsers,
  saveGithubUser
} from '../controllers/userController';

const router = express.Router();

// Save or fetch GitHub user
router.get('/users/:username', saveGithubUser);

// Search users
router.get('/search', searchUsers);

// Soft delete user
router.delete('/users/:username', softDeleteUser);

// Update user
router.patch('/users/:username', updateUser);

// Get sorted users
router.get('/users', getSortedUsers);

export default router;