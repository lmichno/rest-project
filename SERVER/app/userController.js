import fs, { mkdir } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import formidable from 'formidable';
import { photoDataHandler } from './jsonController.js';
import { photos, tags } from './model.js';
import bcryptjs from 'bcryptjs';
import { addUser, users, confirmUser } from './model.js';
import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userRegisterHandler = async (user) => {
    let encryptedPass = await bcryptjs.hash(user.password, 10);
    user.password = encryptedPass;
    user.confirmed = false;
    if (users.length == 0) {
        user.id = 1;
    }
    else {
        user.id = users[users.length - 1].id + 1;
    }
    addUser(user);
    let token = createToken(user.id, user.email, "1h");
    return `Skopiuj poniższy link do przeglądarki http://localhost:3000/api/users/confirm/${token} w celu potwierdzenia konta Uwaga: link jest ważny przez godzinę`
};

const createToken = (id, email, time) => {
    let token = jsonwebtoken.sign(
        {
            id: id,
            email: email
        },
        process.env.MY_PASS,
        {
            expiresIn: time || '1h'
        }
    );
    return token
}

const confirmUserHandler = (token) => {
    let decoded;
    try { decoded = jsonwebtoken.verify(token, process.env.MY_PASS); }
    catch (err) {
        return 'Invalid token or expired';
    }

    let user = users.find(user => user.id == decoded.id);
    if (!user) {
        return 'User not found';
    }
    else {
        confirmUser(user.id);
        return 'User confirmed'
    }
}

const checkToken = (token) => {
    let decoded;
    try { decoded = jsonwebtoken.verify(token, process.env.MY_PASS); }
    catch (err) {
        return false;
    }
    return true;
}

export { userRegisterHandler, createToken, confirmUserHandler, checkToken };