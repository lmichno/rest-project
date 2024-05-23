import fs, { mkdir } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { photos, add, tags } from './model.js';
import { replace, replaceSingle } from './model.js';
import { addTag } from './tagsController.js'

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

const getPhotoTags = (id) => {
    const photo = photos.find(photo => photo.id == id);
    if (!photo) {
        return 'Photo with id ' + id + ' not found!';
    }
    return { 'id': photo.id, 'tags': photo.tags };
}

const deleteSinglePhotoData = (id) => {
    if (!photos.find(photo => photo.id == id)) {
        return 'Photo with id ' + id + ' not found!';
    }
    else {
        const newPhotos = photos.filter(photo => photo.id != id);
        replace(newPhotos);
        return 'Photo with id ' + id + ' deleted successfully!';
    }
}

const patchSinglePhotoData = (id) => {
    const photo = photos.find(photo => photo.id == id);
    if (!photo) {
        return 'Photo with id ' + id + ' not found!';
    }
    else {
        if (photo.lastChange == 'original') {
            photo.lastChange = 1;
        }
        else {
            photo.lastChange++;
        }
        photo.history.push({
            'status': photo.lastChange,
            'timestamp': new Date().getTime()
        });
        replaceSingle(photo, id);
        return 'Photo with id ' + id + ' updated successfully!';
    }
}

const addTagsToPhotoData = (id, tagsAdd) => {
    const photo = photos.find(photo => photo.id == id);
    if (!photo) {
        return 'Photo with id ' + id + ' not found!';
    }
    if (!photo.tags) {
        photo.tags = [];
    }
    for (let element of tagsAdd) {
        if (photo.tags.find(tag => tag.name == element)) {
            continue;
        }
        if (!tags.find(tag => tag.name == element)) {
            addTag({ 'name': [element], 'popularity': [1] });
        }
        photo.tags.push({ "name": element });
    }
    replaceSingle(photo, id);
    return 'Tags added successfully!';
}

export { photoDataHandler, getPhotoTags, getAllPhotosData, getSiglePhotoData, deleteSinglePhotoData, patchSinglePhotoData, addTagsToPhotoData };