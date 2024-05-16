import { tags, photos, replaceSingle } from './model.js';
import { replaceTagsJsonData } from './fileController.js';

const getRawTags = () => {
    const rawTags = tags.map(tag => tag.name);
    return rawTags;
}

const getTags = () => {
    return tags;
}

const getSingleTag = (id) => {
    return tags.find(tag => tag.id == id);
}

const addTag = (data) => {
    const tagCheck = tags.find(tag => tag.name == data.name[0]);
    if (tagCheck) {
        return 'Tag already exists!';
    }
    const id = tags[tags.length - 1].id + 1;
    const tag = {
        'id': id,
        'name': data.name[0],
        'popularity': data.popularity[0]
    }
    tags.push(tag);
    replaceTagsJsonData();
    return 'Tag added successfully!';
}

const patchSingleTag = (tagID, photoID) => {
    const tag = tags.find(tag => tag.id == tagID);
    const photo = photos.find(photo => photo.id == photoID);
    if (!tag) {
        return 'Tag not found!';
    }
    else {
        if (!photo) {
            return 'Photo not found';
        }
        if (!photo.tags) {
            photo.tags = [];
        }
        if (photo.tags.find(localTag => localTag.name == tag.name)) {
            return 'Photo already has this tag!';
        }
        photo.tags.push({ 'name': tag.name });
        replaceSingle(photo, photoID);
        return 'Photo tag updated successfully!';
    }
}

export { getRawTags, getTags, getSingleTag, addTag, patchSingleTag };