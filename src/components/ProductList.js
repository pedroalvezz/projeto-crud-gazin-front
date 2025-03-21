import React, { useState } from 'react';
import ProductItem from './ProductItem';
import { Typography, Snackbar, Alert, TextField } from '@mui/material';

function ProductList({ products, onDelete, onEdit }) {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');


    const handleDelete = (deletedProductId) => {
        try {
            onDelete(deletedProductId);
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            setError('Erro ao excluir produto.');
        }
    };

    const handleEdit = (updatedProduct) => {
        onEdit(updatedProduct);
        setMessage('Produto editado com sucesso!');
    };

    // Filtra os produtos sem alterar o estado global
    const filteredProducts = products.filter(product => {
        const preco = parseFloat(product.preco); // Agora pegamos "preco"

        if (isNaN(preco)) {
            console.warn("Produto com preço inválido:", product);
            return true; // Mostra o produto mesmo que o preço esteja incorreto
        }

        const min = minPrice ? parseFloat(minPrice) : 0;
        const max = maxPrice ? parseFloat(maxPrice) : Infinity;

        return preco >= min && preco <= max;
    });


    return (
        <div>


            {/* Campos para filtrar por preço */}
            <div style={{ marginBottom: '10px' }}>
                <TextField
                    label="Preço Mínimo"
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    style={{ marginRight: '10px' }}
                    sx={{
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        input: { color: 'text.primary' }, // Altera a cor do texto digitado
                    }}
                />
                <TextField
                    label="Preço Máximo"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    style={{ marginRight: '10px' }}
                    sx={{
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        input: { color: 'text.primary' }, // Altera a cor do texto digitado
                    }}
                />
            </div>
            <Typography variant="h4" sx={{ color: 'text.primary' }}>
                Lista de <span style={{ color: 'text.secondary' }}>Produtos</span>
            </Typography>
            {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                    <ProductItem key={product.id} product={product} onDelete={handleDelete} onEdit={handleEdit} />
                ))
            ) : (
                <Typography variant="body1" >Nenhum produto encontrado.</Typography>
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
