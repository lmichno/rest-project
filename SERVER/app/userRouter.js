import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getRequestData from './getRequestData.js';
import { imgHandler } from './fileController.js';
import { getAllPhotosData, getSiglePhotoData, deleteSinglePhotoData, patchSinglePhotoData, addTagsToPhotoData, getPhotoTags } from './jsonController.js';
import formidable from 'formidable';
import { userRegisterHandler, confirmUserHandler, createToken } from './userController.js';
import { users } from './model.js';
import bcryptjs from 'bcryptjs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const usersRouter = async (req, res) => {
    if (req.url == '/api/users/register' && req.method == 'POST') {
        let form = formidable({});
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err);
                return;
            }
            let user = fields.data[0];
            user = JSON.parse(user);
            if (!user) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Bad data');
            }
            else {
                let name = user.name;
                let email = user.email;
                let password = user.pass;
                let lastName = user.lastName;
                if (!name || !email || !password || !lastName) {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('Bad data');
                }
                else {
                    if (users.find(user => user.email == email)) {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end('User already exists');

                    }
                    else {
                        let userData = { "name": name, "lastName": lastName, "email": email, "password": password };
                        let message = await userRegisterHandler(userData);
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end(message);
                    }
                }
            }
        });
    }
    else if (req.url.match(/\/api\/users\/confirm\/.+/) && req.method == 'GET') {
        let token = req.url.match(/\/api\/users\/confirm\/(.+)/)[1];
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(confirmUserHandler(token));
    }
    else if (req.url == '/api/users' && req.method == 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(users, null, 5));
    }
    else if (req.url == '/api/users/login' && req.method == 'POST') {
        let form = formidable({});
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err);
                return;
            }
            let data = fields.data[0];
            data = JSON.parse(data);
            if (!data) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Bad data');
            }
            let email = data.email;
            let password = data.pass;
            let user = users.find(user => user.email == email);
            if (!user) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('User not found');
            }
            else {
                if (user.confirmed) {
                    if (await bcryptjs.compare(password, user.password)) {
                        let loginToken = createToken(user.id, user.email, "10m");
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end('Token:' + loginToken);
                    }
                    else {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end('Wrong password');
                    }
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('User not confirmed');
                }
            }
        });
    }
}

export default usersRouter;