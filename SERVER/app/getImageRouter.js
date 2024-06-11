import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import getRequestData from './getRequestData.js';
import { imgHandler } from './fileController.js';
import { getAllPhotosData, getSiglePhotoData, deleteSinglePhotoData, patchSinglePhotoData, addTagsToPhotoData, getPhotoTags, addFiltersToPhotoData } from './jsonController.js';
import formidable from 'formidable';
import { getPhotoMetaData, applyFilter } from './filtersController.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getImageRouter = async (req, res) => {
    if (req.url.match(/\/api\/getImage\/([0-9]+)$/) && req.method == 'GET') {
        let id = req.url.match(/\/api\/getImage\/([0-9]+)/)[1];
        let message;
        if (getSiglePhotoData(id) == undefined) {
            message = 'Photo with id ' + id + ' not found!';
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(message);
        }
        else {
            message = fs.readFileSync(path.join(__dirname, getSiglePhotoData(id).url));
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(message);
        }
    }
    else if (req.url.match(/\/api\/getImage\/([0-9]+)\/filter\/([a-z]+)/)) {
        const id = req.url.match(/\/api\/getImage\/([0-9]+)/)[1];
        const filter = req.url.match(/\/api\/getImage\/([0-9]+)\/filter\/([a-z]+)/)[2];
        console.log('aaaaaaaaaa');

        const photo = await getSiglePhotoData(id);
        if (photo == undefined) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Photo not found');
        }
        else {
            console.log(photo);
            if (photo.filters == undefined) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Photo has no filters');
            }
            else {
                let newPhoto = photo.filters.find(fil => fil.filter == filter);
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(fs.readFileSync(path.join(__dirname, newPhoto.url)));
            }
        }
    }
}

export default getImageRouter;