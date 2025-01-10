import React from 'react';
import { Repository } from '../../types';
import './RepoDetails.css';

interface RepoDetailsProps {
  repository: Repository;
  onBack: () => void;
}

const RepoDetails: React.FC<RepoDetailsProps> = ({ repository, onBack }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="repo-details">
      <button onClick={onBack} className="back-button">
        ← Back to Repositories
      </button>
      
      <div className="repo-header">
        <h2>{repository.name}</h2>
        <a 
          href={repository.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          View on GitHub
        </a>
      </div>

      <div className="repo-info">
        <p className="description">
          {repository.description || 'No description available'}
        </p>
        
        <div className="meta-info">
          <div className="meta-item">
            <span className="label">Language:</span>
            <span className="value">{repository.language || 'Not specified'}</span>
          </div>
          <div className="meta-item">
            <span className="label">Stars:</span>
            <span className="value">{repository.stargazers_count}</span>
          </div>
          <div className="meta-item">
            <span className="label">Created:</span>
            <span className="value">{formatDate(repository.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoDetails;