import React from 'react';
import { GithubUser } from '../types';
import './FollowersList.css';

interface FollowersListProps {
  followers: GithubUser[];
  onSelectFollower: (username: string) => void;
  onBack: () => void;
}

const FollowersList: React.FC<FollowersListProps> = ({ 
  followers, 
  onSelectFollower,
  onBack 
}) => {
  return (
    <div className="followers-container">
      <div className="followers-header">
        <button onClick={onBack} className="back-button">
          ← Back to Profile
        </button>
        <h2>Followers ({followers.length})</h2>
      </div>

      <div className="followers-grid">
        {followers.map(follower => (
          <div 
            key={follower.login}
            className="follower-card"
            onClick={() => onSelectFollower(follower.login)}
          >
            <img 
              src={follower.avatar_url} 
              alt={follower.login}
              className="follower-avatar" 
            />
            <div className="follower-info">
              <h3>{follower.name || follower.login}</h3>
              {follower.bio && (
                <p className="follower-bio">{follower.bio}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowersList;