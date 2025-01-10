export interface IGithubUser {
    login: string;
    avatar_url: string;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    bio: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface IUser extends IGithubUser {
    following_list: string[];
    followers_list: string[];
    friends: string[];
    deleted: boolean;
  }