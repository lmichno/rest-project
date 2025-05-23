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

const imgRouter = async (req, res) => {
    if (req.url == '/api/photos' && req.method == 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(getAllPhotosData(), null, 5));
    }
    else if (req.url == '/api/photos' && req.method == 'POST') {
        imgHandler(req, res);
    }
    else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == 'GET') {
        const id = req.url.match(/\/api\/photos\/([0-9]+)/)[1];
        const photo = getSiglePhotoData(id);
        if (photo) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify(photo, null, 5));
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Photo not found');
        }
    }
    else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == 'DELETE') {
        const id = req.url.match(/\/api\/photos\/([0-9]+)/)[1];
        const message = deleteSinglePhotoData(id);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(message);
    }
    else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == 'PATCH') {
        const id = req.url.match(/\/api\/photos\/([0-9]+)/)[1];
        const message = patchSinglePhotoData(id);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(message);
    }
    else if (req.url == '/api/photos/tags' && req.method == 'PATCH') {
        const form = formidable({});
        let message;

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                return;
            }
            const photoID = fields.photoID[0];
            let tags = [fields.tags[0]];
            tags = JSON.parse(tags).tags;


            message = addTagsToPhotoData(photoID, tags);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(message);
        });

    }
    else if (req.url == '/api/photos/tags/mass' && req.method == 'PATCH') {
        const form = formidable({});
        let message;

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                return;
            }
            const photoID = fields.photoID[0];
            let tags = fields.tags[0];
            tags = JSON.parse(tags).tags;

            message = addTagsToPhotoData(photoID, tags);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(message);
        });

    }
    else if (req.url.match(/\/api\/photos\/tags\/([0-9]+)/) && req.method == 'GET') {
        const id = req.url.match(/\/api\/photos\/tags\/([0-9]+)/)[1];

        const message = getPhotoTags(id);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(message, null, 5));
    }
}

export default imgRouter;