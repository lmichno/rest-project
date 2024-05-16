import { tags } from './model.js';
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

export { getRawTags, getTags, getSingleTag, addTag };