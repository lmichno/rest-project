import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getRequestData from './getRequestData.js';
import { imgHandler } from './fileController.js';
import { getAllPhotosData, getSiglePhotoData, deleteSinglePhotoData, patchSinglePhotoData, addTagsToPhotoData, getPhotoTags } from './jsonController.js';
import formidable from 'formidable';
import { getPhotoMetaData } from './filtersController.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filtersRouter = async (req, res) => {
    if (req.url.match(/\/api\/filters\/([0-9]+)/) && req.method == 'GET') {
        const id = req.url.match(/\/api\/filters\/([0-9]+)/)[1];
        const photo = await getPhotoMetaData(id);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(photo, null, 5));
    }
    else if (req.url == '/api/filters' && req.method == 'POST') {

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Filtering photo');
    }
}

export default filtersRouter;