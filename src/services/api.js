import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

export default api;

export const updateProductQuantity = async (id, quantidade) => {
    const response = await fetch(`http://localhost:8000/api/produtos/${id}/quantidade`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantidade }),
    });

    return response.json();
};

export const removeProductQuantity = async (id) => {
    const response = await fetch(`http://localhost:8000/api/produtos/${id}/remover`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
};