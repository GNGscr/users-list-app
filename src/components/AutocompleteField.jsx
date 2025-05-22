import { Autocomplete, TextField } from '@mui/material';
import countryOptions from '../data/countries.json';

const AutocompleteField = ({
  name,
  value,
  userId,
  onChangehandler,
  onBlurHandler,
  error,
  disabled,
  placeholder,
}) => {
  return (
    <Autocomplete
      options={countryOptions}
      value={value || ''}
      onChange={(e, newValue) =>
        onChangehandler(name, newValue || '', userId)}
        onBlur={(e) => {
          const inputValue = e.target.value;
          onBlurHandler?.(name, inputValue);
        }}
        onClose={(e) => {
          const inputValue = e.target.value;
          onBlurHandler?.(name, inputValue);
        }}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          error={error}
          variant="outlined"
          size="small"
        />
      )}
    />
  );
};

AutocompleteField.defaultProps = {
  name: 'country',
  value: '',
  onChangehandler: () => {},
  onBlurHandler: () => {},
  error: false,
  disabled: false,
  placeholder: 'Country',
};

export default AutocompleteField;