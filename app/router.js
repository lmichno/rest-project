import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getRequestData from './getRequestData.js';
import { imgHandler } from './fileController.js';
import { getAllPhotosData, getSiglePhotoData, deleteSinglePhotoData } from './jsonController.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = async (req, res) => {
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
    else if (req.url == '/api/photos' && req.method == 'PATCH') {

    }
}

export default router;