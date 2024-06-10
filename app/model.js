import { replacePhotosJsonData, replaceTagsJsonData } from './fileController.js';

let photos = [];
let tags = [];
let users = [];

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

const addTag = (tag) => {
    tags.push(tag);
    replaceTagsJsonData();
    console.log('Tag added successfully!');
}

const replaceTags = (data) => {
    tags = data;
    replaceTagsJsonData();
}

const addUser = (user) => {
    users.push(user);
    console.log(users);
}
const confirmUser = (id) => {
    const index = users.findIndex(user => user.id == id);
    users[index].confirmed = true;
    console.log(users);
}

export { add, photos, replace, replaceSingle, addTag, tags, replaceTags, users, addUser, confirmUser };