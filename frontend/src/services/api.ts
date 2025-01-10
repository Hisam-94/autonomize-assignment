// import axios from 'axios';
// import { GithubUser, Repository, UserDetails } from '../types';

// const API_BASE_URL = 'http://localhost:3000/api';
// const GITHUB_API = 'https://api.github.com';

// const api = {
//   getUser: async (username: string): Promise<UserDetails> => {
//     const { data } = await axios.get(`${API_BASE_URL}/users/${username}`);
//     return data;
//   },

//   getUserRepositories: async (username: string): Promise<Repository[]> => {
//     const { data } = await axios.get(`${GITHUB_API}/users/${username}/repos`);
//     return data;
//   },

//   searchUsers: async (query: string): Promise<UserDetails[]> => {
//     const { data } = await axios.get(`${API_BASE_URL}/search?q=${query}`);
//     return data;
//   },

//   getSortedUsers: async (sortBy: string): Promise<UserDetails[]> => {
//     const { data } = await axios.get(`${API_BASE_URL}/users?sortBy=${sortBy}`);
//     return data;
//   }
// };

// export default api;


import axios from 'axios';
import { GithubUser, Repository, UserDetails } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';
const GITHUB_API = 'https://api.github.com';

// Add error handling and type safety
const api = {
  getUser: async (username: string): Promise<UserDetails> => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/users/${username}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error('User not found');
      }
      throw new Error('Failed to fetch user data');
    }
  },

  getUserRepositories: async (username: string): Promise<Repository[]> => {
    try {
      const { data } = await axios.get(`${GITHUB_API}/users/${username}/repos`, {
        params: {
          sort: 'updated',
          per_page: 100
        }
      });
      return data;
    } catch (error) {
      throw new Error('Failed to fetch repositories');
    }
  },

  getUserFollowers: async (username: string): Promise<{ data: GithubUser[] }> => {
    try {
      const { data } = await axios.get(`${GITHUB_API}/users/${username}/followers`, {
        params: {
          per_page: 100
        }
      });
      return { data };
    } catch (error) {
      throw new Error('Failed to fetch followers');
    }
  },

  searchUsers: async (query: string): Promise<UserDetails[]> => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/search?q=${query}`);
      return data;
    } catch (error) {
      throw new Error('Failed to search users');
    }
  },

  getSortedUsers: async (sortBy: string): Promise<UserDetails[]> => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/users?sortBy=${sortBy}`);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch sorted users');
    }
  }
};

export default api;