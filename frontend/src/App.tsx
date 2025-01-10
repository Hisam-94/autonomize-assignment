import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import RepoList from './components/RepoList';
import RepoDetails from './components/RepoDetails';
import FollowersList from './components/FollowersList';
import api from './services/api';
import { UserDetails, Repository, GithubUser } from './types';
import './App.css';

const App: React.FC = () => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [followers, setFollowers] = useState<GithubUser[]>([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await api.getUser(username);
      const repos = await api.getUserRepositories(username);
      
      setUser(userData);
      setRepositories(repos);
      setSelectedRepo(null);
      setShowFollowers(false);
    } catch (err) {
      setError('Error fetching user data. Please try again.');
      setUser(null);
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewFollowers = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data } = await api.getUserFollowers(user.login);
      setFollowers(data);
      setShowFollowers(true);
    } catch (err) {
      setError('Error fetching followers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>GitHub Explorer</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <main className="app-content">
        {user && !showFollowers && !selectedRepo && (
          <>
            <UserProfile user={user} onViewFollowers={handleViewFollowers} />
            <RepoList repositories={repositories} onSelectRepo={setSelectedRepo} />
          </>
        )}

        {selectedRepo && (
          <RepoDetails 
            repository={selectedRepo} 
            onBack={() => setSelectedRepo(null)} 
          />
        )}

        {showFollowers && (
          <FollowersList 
            followers={followers}
            onSelectFollower={handleSearch}
            onBack={() => setShowFollowers(false)}
          />
        )}
      </main>
    </div>
  );
};

export default App;