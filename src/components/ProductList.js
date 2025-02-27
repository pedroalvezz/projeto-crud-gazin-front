import React from 'react';
import ProductItem from './ProductItem';
import { Typography, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';

function ProductList({ products, onDelete, onEdit }) {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


    const handleDelete = async (deletedProductId) => {
        try {
            onDelete(deletedProductId); // Atualiza a UI no componente pai
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            setError('Erro ao excluir produto.');
        }
    };

    const handleEdit = (updatedProduct) => {
        onEdit(updatedProduct);
        setMessage('Produto editado com sucesso!');
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Lista de Produtos
            </Typography>
            {Array.isArray(products) && products.length > 0 ? (
                products.map(product => (
                    <ProductItem key={product.id} product={product} onDelete={handleDelete} onEdit={handleEdit} />
                ))
            ) : (
                <Typography variant="body1">Nenhum produto encontrado.</Typography>
            )}
            <Snackbar open={!!message} autoHideDuration={3000} onClose={() => setMessage('')}>
                <Alert severity="success" onClose={() => setMessage('')}>{message}</Alert>
            </Snackbar>

            <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError('')}>
                <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
            </Snackbar>
        </div>
    );
}

export default ProductList;
