import { createServer } from 'http';
import router from "./app/router.js";
import { replace } from './app/model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

fs.readFile(path.join(__dirname, 'app', 'photos.json'), 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    replace(JSON.parse(data));
});

createServer((req, res) => router(req, res))
    .listen(3000, () => console.log("listen on 3000"))