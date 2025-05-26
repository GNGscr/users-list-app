import { CircularProgress, Box, Typography } from '@mui/material';
import { useUsersStore, useUsersDerived } from '../../store/useUsersStore';
import PrimaryButton from '../../components/PrimaryButton';
import UsersList from './usersList/UsersList';
import styles from './users.module.css';

const SAVE = "Save";
const LOADING_USERS = "Loading users...";
const ERRORS = "Errors";
const EMPTY_FIELDS = "Empty Fields";
const INVALID_FIELDS = "Invalid Fields";

function UsersPage() {

  const { isSaveDisabled } = useUsersDerived();
  const { users, errors, saveUsers, loading } = useUsersStore();

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

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        height="100vh"
        marginTop="37.5vh"
        gap="2.5rem"
      >
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 1, fontSize: "1.5rem" }}>
          {LOADING_USERS}
        </Typography>
      </Box>
    )
  }

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList />
        <div className={styles.rightButtonContainer}>
 
        {/* {hasEmptyRows && (
          <Typography color="warning" variant="body2">
            {INCOMPLETE_ROW}
          </Typography>
        )} */}

        {(emptyCount > 0 || invalidCount > 0) && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {ERRORS}: {EMPTY_FIELDS} - {emptyCount}, {INVALID_FIELDS} - {invalidCount}
          </Typography>
        )}
          <PrimaryButton
            onClick={saveUsers}
            disabled={isSaveDisabled}>
            {SAVE}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;