import { create } from "zustand";
import { persist } from "zustand/middleware";
import data from "../data/initialUsersData.json";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useUsersStore = create(
   persist( (set, get) => ({
        users: [],
        errors: {},
        loading: true,

        // Actions
        setUsers: (newUsers) => {
            set((state) => ({
              users: typeof newUsers === 'function'
                ? newUsers(state.users) : newUsers,
            }))
        },
        setErrors: (newErrors) => {
            set((state) =>
              typeof newErrors === 'function'
                ? { errors: newErrors(state.errors) }
                : { errors: newErrors }
            )
        },
        saveUsers: () => {
            const { users } = get();
            console.log('Users were saved successfully!', users);
            set({ errors: {} });
            localStorage.setItem('users', JSON.stringify(users));
        },
        initializeUsers: async () => {
            const localData = localStorage.getItem('users');
            await delay(1000); // simulate loading
            set({
                users: localData ? JSON.parse(localData) : data,
                loading: false,
            });
        },
    }),
    {
        name: 'users-store', // name in localStorage
        partialize: (state) => ({ users: state.users }) // persist only users if desired
    }
  )
);

// Derived state (selectors)
export const useUsersDerived = () => {
    const users = useUsersStore((state) => state.users);
    const errors = useUsersStore((state) => state.errors);
  
    const hasErrors = Object.values(errors || {}).some((userErrors) =>
      Object.values(userErrors).includes(true)
    );
  
    const hasEmptyRows = Array.isArray(users) && users.some((user) =>
      Object.entries(user).some(
        ([key, value]) => key !== 'id' && typeof value === 'string' && value.trim() === ''
      )
    );
  
    const isSaveDisabled = hasErrors || hasEmptyRows;
  
    return {
      hasErrors,
      hasEmptyRows,
      isSaveDisabled,
    };
  };
  