import axios from 'axios';
import { IGithubUser } from '../types';

const baseURL = process.env.GITHUB_API_BASE_URL;

export const getGithubUser = async (username: string): Promise<IGithubUser> => {
  try {
    const response = await axios.get(`${baseURL}/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch GitHub user');
  }
};

export const getGithubUserFollowers = async (username: string): Promise<string[]> => {
  try {
    const response = await axios.get(`${baseURL}/users/${username}/followers`);
    return response.data.map((follower: any) => follower.login);
  } catch (error) {
    throw new Error('Failed to fetch followers');
  }
};

export const getGithubUserFollowing = async (username: string): Promise<string[]> => {
  try {
    const response = await axios.get(`${baseURL}/users/${username}/following`);
    return response.data.map((following: any) => following.login);
  } catch (error) {
    throw new Error('Failed to fetch following users');
  }
};