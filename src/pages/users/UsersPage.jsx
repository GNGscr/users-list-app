import { CircularProgress, Box, Typography } from '@mui/material';
import PrimaryButton from '../../components/PrimaryButton';
import { useUsersContext } from '../../context/usersContext';
import UsersList from './usersList/UsersList';
import styles from './users.module.css';

function UsersPage() {
  const { saveUsers, loading, isSaveDisabled } = useUsersContext();
  
  const SAVE = "Save";
  const LOADING_USERS = "Loading users...";

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