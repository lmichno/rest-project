import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getRequestData from './getRequestData.js';
import { imgHandler } from './fileController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = async (req, res) => {
    if (req.url == '/api/photos' && req.method == 'GET') {

        res.end(JSON.stringify(functions.getAll(), null, 5));
    }
    else if (req.url == '/api/photos' && req.method == 'POST') {
        imgHandler(req, res);
    }
    else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == 'GET') {
    }
    else if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == 'DELETE') {
    }
    else if (req.url == '/api/photos' && req.method == 'PATCH') {
    }
}

export default router;