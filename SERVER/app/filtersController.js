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

const applyFilter = async (id, filter) => {
    let serverImgPath = path.join(__dirname, getSiglePhotoData(id).url)
    return await new Promise(async (resolve, reject) => {
        try {
            if (serverImgPath) {
                switch (filter) {
                    case 'rotate':
                        await sharp(serverImgPath).rotate(90)
                            .toFile(path.join(__dirname, getSiglePhotoData(id).url + '_rotate'))
                        resolve("filter_applied")
                        break;
                    case 'resize':
                        await sharp(serverImgPath).resize({ width: 200, height: 200 })
                            .toFile(path.join(__dirname, getSiglePhotoData(id).url + '_resize'))
                        resolve("filter_applied")
                        break;
                    // case 'reformat':
                    //     await sharp(serverImgPath).toFormat('png')
                    //         .toFile(path.join(__dirname, getSiglePhotoData(id).url + '_reformat'))
                    //     resolve("filter_applied")
                    //     break;
                    case 'crop':
                        await sharp(serverImgPath).extract({ left: 20, top: 20, width: 200, height: 200 })
                            .toFile(path.join(__dirname, getSiglePhotoData(id).url + '_crop'))
                        resolve("filter_applied")
                        break;
                    case 'grayscale':
                        await sharp(serverImgPath).grayscale()
                            .toFile(path.join(__dirname, getSiglePhotoData(id).url + '_grayscale'))
                        resolve("filter_applied")
                        break;
                    case 'flip':
                        await sharp(serverImgPath).flip()
                            .toFile(path.join(__dirname, getSiglePhotoData(id).url + '_flip'))
                        resolve("filter_applied")
                        break;
                    case 'negate':
                        await sharp(serverImgPath).negate()
                            .toFile(path.join(__dirname, getSiglePhotoData(id).url + '_negate'))
                        resolve("filter_applied")
                        break;
                    case 'tint':
                        await sharp(serverImgPath).tint({ r: 0.5, g: 0.5, b: 0.5 })
                            .toFile(path.join(__dirname, getSiglePhotoData(id).url + '_tint'))
                        resolve("filter_applied")
                        break;
                    default:
                        resolve("filter_not_found")
                        break;
                }
            }
            else {
                resolve("url_not_found")
            }

        } catch (err) {
            reject(err.mesage)
        }
    })
}

export { getPhotoMetaData, applyFilter };