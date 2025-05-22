import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const StyledTextField = styled(TextField)({
  boxShadow: 'none',
  textTransform: 'none',
  backgroundColor: '#909196',
  borderRadius: '4px',
});

const InputField = ({
  name,
  value,
  userId,
  onChangehandler,
  onBlurHandler,
  onFocusHandler,
  error,
  disabled,
  placeholder
}) => (
  <StyledTextField
    name={name}
    value={value}
    onChange={(e) => onChangehandler(e.target.name, e.target.value, userId)}
    onBlur={(e) => onBlurHandler?.(e.target.name, e.target.value)}
    onFocus={(e) => onFocusHandler?.(e.target.name)}
    error={error}
    disabled={disabled}
    placeholder={placeholder}
    variant="outlined"
    size="small"
    fullWidth
    autoComplete="off"
    inputProps={{ autoComplete: 'off' }}
  />
);

InputField.defaultProps = {
  name: 'text_field_name',
  value: '',
  onChangehandler: () => {},
  onBlurHandler: () => {},
  onFocusHandler: () => {},
  error: false,
  disabled: false,
  placeholder: ''
};

export default InputField;
