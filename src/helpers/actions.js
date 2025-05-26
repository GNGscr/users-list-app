export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const setUsers = (newUsers, set) => {
  return set((state) => ({
    users: typeof newUsers === 'function'
    ? newUsers(state.users) : newUsers
  }))
};

export const setErrors = (newErrors, set) => {
  return set((state) => {
    return typeof newErrors === 'function'
    ? { errors: newErrors(state.errors) } : { errors: newErrors }
  })
};

export const saveUsers = (set, get) => {
  const { users } = get();
  console.log('Users were saved successfully!', users);
  set({ errors: {} });
  localStorage.setItem('users', JSON.stringify(users));
};

export const initializeUsers = async (data, set) => {
  const localData = localStorage.getItem('users');
  await delay(1000);
  set({
      users: localData ? JSON.parse(localData) : data,
      loading: false,
  });
};