import { Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import AutocompleteField from '../../../components/AutocompleteField';
import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';


const UserRow = ({
  user,
  errors,
  onChangehandler,
  onBlur,
  onDelete,
  isEditingCountry,
  setEditingCountry
}) => {
  const { id, ...userWithoutId } = user;

  const handleBlur = (field, value) => {
    onBlur(id, field, value);
    if (field === 'country') {
      setEditingCountry(false);
    }
  };

  const handleFocus = (field) => {
    if (field === 'country') {
      setEditingCountry(true);
    }
  };
  
  return (
    <Grid container className={styles.userRow}>
      <div className={styles.rowWrapper}>

        {Object.keys(userWithoutId).map((field, idx) => {
          const value = user[field];
          const error = errors?.[field] || false;

          const commonProps = {
            name: field,
            value,
            userId: id,
            onChangehandler,
            onBlurHandler: handleBlur,
            error,
            placeholder: field.charAt(0).toUpperCase() + field.slice(1),
            disabled: false
          };

          return (
            <div key={idx}>
              {field === 'country' && isEditingCountry ? (
                <AutocompleteField {...commonProps}
                 />
              ) : (
                <InputField
                  {...commonProps}
                  onFocusHandler={() => handleFocus(field)}
                />
              )}
            </div>
          );
        })}

      <TrashIconButton handleClick={() => onDelete(id)} />
      </div>
    </Grid>
  );
};

export default UserRow;
