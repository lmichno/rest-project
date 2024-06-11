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
import { checkToken } from './app/userController.js';
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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    //images
    if (req.url.search("/api/photos") != -1 && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        let token = req.headers.authorization.split(" ")[1]
        if (checkToken(token)) {
            imgRouter(req, res)
        }
        else {
            res.writeHead(401, { 'Content-Type': 'text/plain' });
            res.end('Unauthorized');
        }
    }

    //tags

    else if (req.url.search("/api/tags") != -1 && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        let token = req.headers.authorization.split(" ")[1]
        if (checkToken(token)) {
            tagsRouter(req, res)
        }
        else {
            res.writeHead(401, { 'Content-Type': 'text/plain' });
            res.end('Unauthorized');
        }

    }
    //filters router
    else if (req.url.search("/api/filters") != -1 && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        let token = req.headers.authorization.split(" ")[1]
        if (checkToken(token)) {
            filtersRouter(req, res)
        }
        else {
            res.writeHead(401, { 'Content-Type': 'text/plain' });
            res.end('Unauthorized');
        }

    }
    else if (req.url.search('/api/getImage') != -1 && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        let token = req.headers.authorization.split(" ")[1]
        if (checkToken(token)) {
            getImageRouter(req, res)
        }
        else {
            res.writeHead(401, { 'Content-Type': 'text/plain' });
            res.end('Unauthorized');
        }

    }
    else if (req.url.search('/api/users') != -1) {
        usersRouter(req, res)
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('No token or wrong url');
    }
})
    .listen(process.env.APP_PORT, () => console.log("listen on " + process.env.APP_PORT))