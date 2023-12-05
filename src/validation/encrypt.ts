import * as bcrypt from 'bcrypt';

export const comparePassword = async (plainTextPassword: string, hashedPassword: string) => {
    return bcrypt.compare(plainTextPassword, hashedPassword);
}

export const encryptPassword = async (password: string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}
