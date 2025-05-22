import { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import {
  validateName,
  validateEmail,
  validatePhone,
  validateCountry
} from '../../../helpers/validation';
import { useUsersContext } from '../../../context/usersContext';
import AddButton from '../../../components/AddButton';
import UserRow from '../userRow/UserRow';
import styles from '../users.module.css';

const textFieldStyles = {
  width: "300px",
  '& input': {
    color: 'lightgray'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#555'
    },
    '&:hover fieldset': {
      borderColor: '#777'
    },
    '&.Mui-focused fieldset': {
      color: '#999'
    },
    '&.Mui-error fieldset': {
      borderColor: 'red'
    }
  }
};

const ERRORS = "Errors";
const USERS_LIST = "Users List";
const EMPTY_FIELDS = "Empty Fields";
const INVALID_FIELDS = "Invalid Fields";
const INCOMPLETE_ROW = "There are incomplete users – please fill in all fields.";

function UsersList() {
  const { users, setUsers, errors, setErrors, hasEmptyRows } = useUsersContext();

  const [editingCountries, setEditingCountries] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleUserChange = (field, value, id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );

    // set to edit mode if user edit the field
    if (field === 'country') {
      setEditingCountries((prev) => ({ ...prev, [id]: true }));
    }

    // Validation
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

  const countErrorTypes = () => {
    let emptyCount = 0;
    let invalidCount = 0;

    users.forEach((user) => {
      const userErrors = errors[user.id] || {};

      Object.entries(userErrors).forEach(([field, isError]) => {
        if (isError) {
          const value = user[field];
          value === '' ? emptyCount++ : invalidCount++;
        }
      });
    });

    return { emptyCount, invalidCount };
  };

  const { emptyCount, invalidCount } = countErrorTypes();

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

        {hasEmptyRows && (
          <Typography color="warning" variant="body2">
            {INCOMPLETE_ROW}
          </Typography>
        )}

        {(emptyCount > 0 || invalidCount > 0) && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {ERRORS}: {EMPTY_FIELDS} - {emptyCount}, {INVALID_FIELDS} - {invalidCount}
          </Typography>
        )}

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
