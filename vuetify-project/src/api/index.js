import axios from 'axios';

// Funkcja obsługująca żądanie GET
const getData = async (url) => {
    try {
        const store = userAppStore();
        const token = store.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.get(`http://localhost:3000${url}`, config);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

// Funkcja obsługująca żądanie DELETE
const deleteData = async (url) => {
    try {
        const store = userAppStore();
        const token = store.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.delete(`http://localhost:3000${url}`, config);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

// Funkcja obsługująca żądanie POST
const postDataNoToken = async (url, data) => {
    try {
        const response = await axios.post(`http://localhost:3000${url}`, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const postData = async (url, data) => {
    try {
        const store = userAppStore();
        const token = store.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.post(`http://localhost:3000${url}`, data, config);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Funkcja obsługująca żądanie PATCH
const patchData = async (url, data) => {
    try {
        const store = userAppStore();
        const token = store.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.patch(`http://localhost:3000${url}`, data, config);
        console.log('a ' + response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export { getData, deleteData, postDataNoToken, patchData, postData };