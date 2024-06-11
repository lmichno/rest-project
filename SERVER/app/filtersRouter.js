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

const filtersRouter = async (req, res) => {
    if (req.url.match(/\/api\/filters\/([0-9]+)/) && req.method == 'GET') {
        const id = req.url.match(/\/api\/filters\/([0-9]+)/)[1];
        const photo = await getPhotoMetaData(id);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify(photo, null, 5));
    }
    else if (req.url == '/api/filters' && req.method == 'POST') {

        const form = formidable({})

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error(err)
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Error');
            }
            else {
                const data = JSON.parse(fields.data[0]);
                const id = data.id;
                const filter = data.filter;
                let filterResult = await applyFilter(id, filter);
                let message = '';
                if (filterResult == 'filter_applied') {
                    message = addFiltersToPhotoData(id, filter);
                }
                else {
                    message = 'Error';
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(message);
            }
        })
    }
}

export default filtersRouter;