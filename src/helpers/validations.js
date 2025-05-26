import countryOptions from '../data/countries.json';

export const validateName = (name) => {
  return /^[a-zA-Z\s]+$/.test(name);
};

export const validateEmail = (email) => {
  return (email.match(/@/g) || []).length === 1;
};

export const validateCountry = (country) => {
  return countryOptions.includes(country);
};

export const validatePhone = (phone) => {
  const plusCount = (phone.match(/\+/g) || []).length;
  return (phone.startsWith('+') && phone.length > 5 && plusCount === 1 &&
    /^[+][0-9]+$/.test(phone)
  );
};