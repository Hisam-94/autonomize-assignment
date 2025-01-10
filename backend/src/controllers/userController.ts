import { NextFunction, Request, Response, RequestHandler } from 'express';
const express = require('express');
import User from '../models/User';
import { ApiError } from '../middleware/errorHandler';
import { getGithubUser, getGithubUserFollowers, getGithubUserFollowing } from '../utils/githubApi';

export const saveGithubUser: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { username } = req.params;
    
    // Check if user exists and is not deleted
    let user = await User.findOne({ login: username, deleted: false });
    if (user) {
      return res.json(user);
    }

    // Fetch from GitHub API
    const [userData, followers, following] = await Promise.all([
      getGithubUser(username),
      getGithubUserFollowers(username),
      getGithubUserFollowing(username)
    ]);

    // Find mutual followers (friends)
    const friends = followers.filter(f => following.includes(f));

    // Create new user
    user = await User.create({
      ...userData,
      followers_list: followers,
      following_list: following,
      friends
    });
    res.status(201).json(user);
  } catch (error) {
    next(new ApiError(404, 'User not found or error fetching data'));
  }
};
export const searchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q } = req.query;
    const users = await User.find({
      deleted: false,
      $text: { $search: q as string }
    });
    res.json(users);
  } catch (error) {
    next(new ApiError(500, 'Error searching users'));
  }
};

export const softDeleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const user = await User.findOneAndUpdate(
      { login: username },
      { deleted: true },
      { new: true }
    );
    
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      }, {} as any);

    const user = await User.findOneAndUpdate(
      { login: username, deleted: false },
      updates,
      { new: true }
    );

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getSortedUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sortBy = 'created_at', order = 'desc' } = req.query;
    const validSortFields = ['public_repos', 'public_gists', 'followers', 'following', 'created_at'];
    
    if (!validSortFields.includes(sortBy as string)) {
      throw new ApiError(400, 'Invalid sort field');
    }

    const users = await User.find({ deleted: false })
      .sort({ [sortBy as string]: order === 'desc' ? -1 : 1 });
    
    res.json(users);
  } catch (error) {
    next(error);
  }
};