import fs, { mkdir } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { photos, add } from './model.js';
import { replace } from './model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const photoDataHandler = (data, album, timestamp) => {
    const photo = {
        'id': timestamp,
        'album': album,
        'originamName': data.originalFilename,
        'url': path.join('upload', album, data.newFilename),
        'lastChange': 'original',
        'history': [
            {
                'status': 'original',
                'timestamp': timestamp,
            }
        ]
    }
    add(photo);
}

const getAllPhotosData = () => {
    return photos;
}

const getSiglePhotoData = (id) => {
    return photos.find(photo => photo.id == id);
}

const deleteSinglePhotoData = (id) => {
    if (!photos.find(photo => photo.id == id)) {
        return 'Photo with id' + id + ' not found!';
    }
    else {
        const newPhotos = photos.filter(photo => photo.id != id);
        replace(newPhotos);
        return 'Photo with id' + id + ' deleted successfully!';
    }
}

export { photoDataHandler, getAllPhotosData, getSiglePhotoData, deleteSinglePhotoData };