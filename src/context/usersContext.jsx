import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import data from '../data/initialUsersData.json';

const UsersContext = createContext();

export const ContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localData = localStorage.getItem('users');
    const t = setTimeout(() => {
      setUsers(localData ? JSON.parse(localData) : data);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  const saveUsers = () => {
    console.log('Users were saved successfully!', users);
    setErrors({});
    localStorage.setItem('users', JSON.stringify(users));
  };

  const hasErrors = useMemo(() => {
    return Object.values(errors).some(
      (userErrors) => Object.values(userErrors).includes(true)
    );
  }, [errors]);

  // prevent saving empty row
  const hasEmptyRows = useMemo(() => {
    return users.some((user) =>
      Object.entries(user).some(([key, value]) =>
        key !== 'id' && value.trim() === ''
      )
    );
  }, [users]);

  const isSaveDisabled = hasErrors || hasEmptyRows;
  
  const contextValue = useMemo(() => ({
    users,
    setUsers,
    errors,
    setErrors,
    hasErrors,
    hasEmptyRows,
    isSaveDisabled,
    saveUsers,
    loading,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [users, errors, hasErrors, hasEmptyRows, loading]);

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => useContext(UsersContext);
