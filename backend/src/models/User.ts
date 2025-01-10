import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../types';

export interface IUserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema({
  login: { type: String, required: true, unique: true },
  avatar_url: String,
  name: String,
  company: String,
  blog: String,
  location: String,
  email: String,
  bio: String,
  public_repos: Number,
  public_gists: Number,
  followers: Number,
  following: Number,
  created_at: Date,
  updated_at: Date,
  following_list: [String],
  followers_list: [String],
  friends: [String],
  deleted: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Index for search functionality
UserSchema.index({ login: 'text', location: 'text', bio: 'text' });

export default mongoose.model<IUserDocument>('User', UserSchema);