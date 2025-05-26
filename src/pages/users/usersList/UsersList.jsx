import { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import {
  validateName,
  validateEmail,
  validatePhone,
  validateCountry
} from '../../../helpers/validations';
import { useUsersStore } from '../../../store/useUsersStore';
import AddButton from '../../../components/AddButton';
import UserRow from '../userRow/UserRow';
import styles from '../users.module.css';

const textFieldStyles = {
  width: "300px",
  '& input': {
    color: 'lightgray'
  },
  '& .MuiOutlinedInput-root': {
    maxHeight: '2rem',
    margin: '0.25rem 0',
    // color: '#fff',
    '& fieldset': {
      borderColor: '#666'
    },
    '&:hover fieldset': {
      borderColor: '#888'
    },
    '&.Mui-focused fieldset': {
      color: '#999'
    },
    '&.Mui-error fieldset': {
      borderColor: 'red'
    }
  }
};

const USERS_LIST = "Users List";

function UsersList() {
  const { users, setUsers, errors, setErrors } = useUsersStore();

  const [editingCountries, setEditingCountries] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const validateInput = (field, value, id) => {
    let isValid = true;

    if (value === '') {
      isValid = false;
    } else {
      switch (field) {
        case 'name':
          isValid = validateName(value);
          break;
        case 'email':
          isValid = validateEmail(value);
          break;
        case 'phone':
          isValid = validatePhone(value);
          break;
        case 'country':
          isValid = validateCountry(value);
          break;
        default:
          break;
      }
    }

    setErrors((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: !isValid, // => error = true
      }
    }));
  };

  const handleUserChange = (field, value, id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );

    if (field === 'country') {
      setEditingCountries((prev) => ({ ...prev, [id]: true }));
    }

    // // Validation
    validateInput(field, value, id);
  };

  const handleBlur = (id, field, value) => {
    if (value.trim() === '') {
      setErrors((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [field]: true, // error
        }
      }));
    }
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));

    // delete from errors
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const createEmptyUser = () => ({
    id: crypto.randomUUID?.() || Math.random().toString(36).substr(2, 9), // create unique id
    name: '',
    country: '',
    email: '',
    phone: ''
  });

  const handleAddUser = () => {
    const newUser = createEmptyUser();

    setUsers((prev) => [newUser, ...prev]);

    // add an empty error row
    setErrors((prev) => ({
      [newUser.id]: {},
      ...prev
    }));
  };

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: "center" }}>

          <Typography variant="h6">{USERS_LIST}</Typography>

          <>{users.length ? `(${users.length})` : ''}</>

          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users.."
            sx={{ ...textFieldStyles }}
          />

        </div>

        <AddButton handleClick={handleAddUser} />

      </div>

      <div className={styles.usersListContent}>

        {filteredUsers ? filteredUsers.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            errors={errors[user.id] || {}}
            onChangehandler={handleUserChange}
            handleBlur={handleBlur}
            onBlur={handleBlur}
            onDelete={handleDeleteUser}
            isEditingCountry={!!editingCountries[user.id]}
            setEditingCountry={(state) => setEditingCountries((prev) =>
              ({ ...prev, [user.id]: state }))}
          />
        )) : ""}
      </div>
    </div>
  );
}

export default UsersList;
