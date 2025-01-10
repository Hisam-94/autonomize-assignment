import React from "react";
import { Repository } from "../../types";
import "./RepoList.css";

interface RepoListProps {
  repositories: Repository[];
  onSelectRepo: (repo: Repository) => void;
}

const RepoList: React.FC<RepoListProps> = ({ repositories, onSelectRepo }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="repo-list">
      <h2>Repositories</h2>
      <div className="repo-grid">
        {repositories.map((repo) => (
          <div
            key={repo.id}
            className="repo-card"
            onClick={() => onSelectRepo(repo)}>
            <h3 className="repo-name">{repo.name}</h3>
            <p className="repo-description">
              {repo.description || "No description available"}
            </p>
            <div className="repo-meta">
              <span className="language">{repo.language || "Unknown"}</span>
              <span className="stars">⭐ {repo.stargazers_count}</span>
              <span className="created-at">
                Created: {formatDate(repo.created_at)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoList;
