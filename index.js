import { createServer } from 'http';
import imgRouter from "./app/imgRouter.js";
import { replace, replaceTags } from './app/model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { tagsRouter } from './app/tagsRouter.js';
import filtersRouter from './app/filtersRouter.js';
import getImageRouter from './app/getImageRouter.js';
import usersRouter from './app/userRouter.js';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

fs.readFile(path.join(__dirname, 'app', 'photos.json'), 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    replace(JSON.parse(data));
});

fs.readFile(path.join(__dirname, 'app', 'tags.json'), 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    replaceTags(JSON.parse(data));
});

createServer((req, res) => {
    //images

    if (req.url.search("/api/photos") != -1) {
        imgRouter(req, res)
    }

    //tags

    else if (req.url.search("/api/tags") != -1) {
        tagsRouter(req, res)
    }
    //filters router
    else if (req.url.search("/api/filters") != -1) {
        filtersRouter(req, res)
    }
    else if (req.url.search('/api/getImage') != -1) {
        getImageRouter(req, res)
    }
    else if (req.url == '/api/users' != -1) {
        usersRouter(req, res)
    }
})
    .listen(process.env.APP_PORT, () => console.log("listen on " + process.env.APP_PORT))