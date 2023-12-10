import { validatePassword } from '../validation/IsStrongPassword'; 

describe('validatePassword', () => {
  it('should return true for a valid password with a number', () => {
    const validPassword = 'ValidPassword123';
    const result = validatePassword(validPassword);
    expect(result).toBe(true);
  });

  it('should return false for a password that is too short', () => {
    const shortPassword = 'Pwd1'; // Menos de 5 caracteres
    const result = validatePassword(shortPassword);
    expect(result).toBe(false);
  });

  it('should return false for a password without a number', () => {
    const noNumberPassword = 'PasswordWithoutNumber';
    const result = validatePassword(noNumberPassword);
    expect(result).toBe(false);
  });
});
