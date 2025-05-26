import { create } from "zustand";
import { persist } from "zustand/middleware";
import data from "../data/initialUsersData.json";
import { setUsers, setErrors, saveUsers, initializeUsers } from "../helpers/actions";

export const useUsersStore = create(
   persist( (set, get) => ({
        users: [],
        errors: {},
        loading: true,

        // Actions
        setUsers: (newUsers) => setUsers(newUsers, set),
        setErrors: (newErrors) => setErrors(newErrors, set),
        saveUsers: () => saveUsers(set, get),
        initializeUsers: async () => initializeUsers(data, set),
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
  