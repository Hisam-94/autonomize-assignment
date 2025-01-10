import axios from 'axios';
import { GithubUser, Repository, UserDetails } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';
const GITHUB_API = 'https://api.github.com';

const api = {
  getUser: async (username: string): Promise<UserDetails> => {
    const { data } = await axios.get(`${API_BASE_URL}/users/${username}`);
    return data;
  },

  getUserRepositories: async (username: string): Promise<Repository[]> => {
    const { data } = await axios.get(`${GITHUB_API}/users/${username}/repos`);
    return data;
  },

  searchUsers: async (query: string): Promise<UserDetails[]> => {
    const { data } = await axios.get(`${API_BASE_URL}/search?q=${query}`);
    return data;
  },

  getSortedUsers: async (sortBy: string): Promise<UserDetails[]> => {
    const { data } = await axios.get(`${API_BASE_URL}/users?sortBy=${sortBy}`);
    return data;
  }
};

export default api;