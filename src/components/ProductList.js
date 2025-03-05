import React from 'react';
import ProductItem from './ProductItem';
import { Typography, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';

function ProductList({ products, onDelete, onEdit, setProdutos, atualizarProdutos }) {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [listaProdutos] = useState(products);


    const atualizarProduto = (produtoAtualizado) => {
        // Aqui, você pode atualizar o produto localmente ou fazer a chamada de API para salvar no backend.
        // Para simplicidade, você pode simplesmente atualizar o estado local com o produto alterado.
        const produtosAtualizados = products.map(produto =>
            produto.id === produtoAtualizado.id ? produtoAtualizado : produto
        );
        setProdutos(produtosAtualizados); // Atualiza os produtos na lista
    };

    const handleUpdate = async (produtoAtualizado) => {
        const produtosAtualizados = products.map(prod =>
            prod.id === produtoAtualizado.id ? produtoAtualizado : prod
        );
        setProdutos(produtosAtualizados);
    };



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

            <div>
                {listaProdutos.length > 0 ? (
                    listaProdutos.map(product => (
                        <ProductItem key={product.id} product={product} onUpdate={handleUpdate} atualizarProdutos={atualizarProdutos} atualizarProduto={atualizarProduto} />
                    ))
                ) : (
                    <p></p>
                )}
            </div>


        </div>
    );
}

export default ProductList;
