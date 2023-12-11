import { comparePassword, encryptPassword } from "../validation/encrypt";

describe("encrypt password", () => {
    test("should encrypt and compare a password successfully", async () => {
        // Definir una contraseña de ejemplo
        const passwordTextPlain = "Mipassword";

        // Encriptar la contraseña
        const hashedPassword = await encryptPassword(passwordTextPlain);

        // Comprobar que la contraseña original y la encriptada coinciden
        const passwordMatches = await comparePassword(passwordTextPlain, hashedPassword);
        expect(passwordMatches).toBe(true);
    });

    test("should return false for incorrect password", async () => {
        // Definir una contraseña de ejemplo
        const passwordTextPlain = "Mipassword";

        // Generar una contraseña incorrecta
        const incorrectPassword = "Mipassword231";

        // Encriptar la contraseña incorrecta
        const hashedPassword = await encryptPassword(incorrectPassword);

        // Comprobar que la contraseña original y la encriptada no coinciden
        const passwordMatches = await comparePassword(passwordTextPlain, hashedPassword);
        expect(passwordMatches).toBe(false);
    });
});
