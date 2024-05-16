import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getRequestData from './getRequestData.js';
import { imgHandler } from './fileController.js';
import { getRawTags, getTags, getSingleTag, addTag } from './tagsController.js';
import formidable from 'formidable';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tagsRouter = async (req, res) => {
    if (req.url == '/api/tags/raw' && req.method == 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(getRawTags(), null, 5));
    }
    else if (req.url == '/api/tags' && req.method == 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(getTags(), null, 5));
    }
    else if (req.url.match(/\/api\/tags\/([0-9]+)/)) {
        const id = req.url.match(/\/api\/tags\/([0-9]+)/)[1];
        const photo = getSingleTag(id);
        if (photo) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(photo, null, 5));
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Photo not found');
        }
    }
    else if (req.url == '/api/tags' && req.method == 'POST') {
        const form = formidable({});

        let message;

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                return;
            }
            message = addTag(fields);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(message);
        });
    }
}

export { tagsRouter };