
export const validatePassword = (password: string): boolean => {
    if (password.length < 5) {
      return false;
    }
  
    const containsNumber = /\d/.test(password);
  
    return containsNumber;
};