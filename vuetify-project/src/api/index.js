import axios from 'axios';

// Funkcja obsługująca żądanie GET
const getData = async (url) => {
    try {
        const response = await axios.get(`http://localhost:3000${url}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

// Funkcja obsługująca żądanie DELETE
const deleteData = async (url) => {
    try {
        const response = await axios.delete(`http://localhost:3000${url}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

// Funkcja obsługująca żądanie POST
const postData = async (url, data) => {
    try {
        const response = await axios.post(`http://localhost:3000${url}`, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Funkcja obsługująca żądanie PATCH
const patchData = async (url, data) => {
    try {
        const response = await axios.patch(`http://localhost:3000${url}`, data);
        console.log('a ' + response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export { getData, deleteData, postData, patchData };