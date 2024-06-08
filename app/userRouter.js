import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getRequestData from './getRequestData.js';
import { imgHandler } from './fileController.js';
import { getAllPhotosData, getSiglePhotoData, deleteSinglePhotoData, patchSinglePhotoData, addTagsToPhotoData, getPhotoTags } from './jsonController.js';
import formidable from 'formidable';


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
            let users = fields.data[0];
            users = JSON.parse(users);
            if (!users) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Bad data');
            }
            else {
                let name = users.name;
                let email = users.email;
                let password = users.password;
                let lastName = users.lastName;
                if (!name || !email || !password || !lastName) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Bad data');
                }
                else {

                }
            }
        });
    }
}

export default usersRouter;