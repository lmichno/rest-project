import sharp from 'sharp'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { getSiglePhotoData } from './jsonController.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPhotoMetaData = async (id) => {
    let serverImgPath = path.join(__dirname, getSiglePhotoData(id).url)
    return await new Promise(async (resolve, reject) => {
        try {

            if (serverImgPath) {
                let meta = await sharp(serverImgPath)
                    .metadata()
                resolve(meta)
            }
            else {
                resolve("url_not_found")
            }

        } catch (err) {
            reject(err.mesage)
        }
    })
}

export { getPhotoMetaData };