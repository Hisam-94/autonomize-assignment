import React from "react";
import { UserDetails } from "../../types";
import "./UserProfile.css";

interface UserProfileProps {
  user: UserDetails;
  onViewFollowers: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onViewFollowers }) => {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user.avatar_url} alt={user.login} className="avatar" />
        <div className="profile-info">
          <h2>{user.name || user.login}</h2>
          {user.bio && <p className="bio">{user.bio}</p>}
          {user.location && <p className="location">{user.location}</p>}
        </div>
      </div>

      <div className="stats">
        <div className="stat-item">
          <span className="stat-value">{user.public_repos}</span>
          <span className="stat-label">Repositories</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{user.followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{user.following}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>

      <button onClick={onViewFollowers} className="view-followers">
        View Followers
      </button>
    </div>
  );
};

export default UserProfile;
