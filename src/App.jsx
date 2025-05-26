import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useUsersStore } from './store/useUsersStore';
import StatisticsPage from './pages/statistics/StatisticsPage';
import UsersPage from './pages/users/UsersPage';

function App() {
  const { initializeUsers } = useUsersStore();

  useEffect(() => {
    initializeUsers();
  }, [initializeUsers]);

  return (
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" exact element={<StatisticsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
