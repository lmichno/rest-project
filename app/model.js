import { replacePhotosJsonData } from './fileController.js';

let photos = [];

const add = (photo) => {
    photos.push(photo);
    replacePhotosJsonData();
    console.log('Photo added successfully!');
}

const replace = (data) => {
    photos = data;
    replacePhotosJsonData();
}
const replaceSingle = (data, id) => {
    const index = photos.findIndex(photo => photo.id == id);
    photos[index] = data;
    replacePhotosJsonData();
}

export { add, photos, replace, replaceSingle };