import fs, { mkdir } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import formidable from 'formidable';
import { photoDataHandler } from './jsonController';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgHandler = (data, res) => {
    const form = formidable({});
    form.parse(data, (err, fields, files) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(files);
        const oldPath = files.img[0].filepath;
        const album = fields.album[0];
        const newPath = path.join(__dirname, 'upload', album, files.img[0].newFilename);
        const timestamp = new Date().getTime();

        fs.mkdir(path.join(__dirname, 'upload', album), { recursive: true }, (err) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.log('Directory already exists!');
                }
                else {
                    console.error(err);
                }
                return;
            }
            console.log('Directory created successfully!');
        });

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error(err);
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File uploaded!');
        });
    });
}

export { imgHandler };