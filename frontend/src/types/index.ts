export interface GithubUser {
    login: string;
    avatar_url: string;
    name: string;
    bio: string;
    company: string;
    location: string;
    public_repos: number;
    followers: number;
    following: number;
  }
  
  export interface Repository {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    created_at: string;
  }
  
  export interface UserDetails extends GithubUser {
    friends: string[];
    followers_list: string[];
    following_list: string[];
  }