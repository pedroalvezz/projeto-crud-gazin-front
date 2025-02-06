import React, { useState } from 'react';
import api from '../services/api';
import { Button, TextField, Box, Typography, Snackbar, Alert } from '@mui/material';
import { NumericFormat } from 'react-number-format';



function ProductForm({ onProductCreated }) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/produtos', { nome, descricao, preco });
            onProductCreated(response.data);
            setNome('');
            setDescricao('');
            setPreco('');
            setSuccessMessage('Produto criado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar produto:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage('');
    };

    return (
        <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h5" gutterBottom>
                Adicionar Produto
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    sx={{
                        backgroundColor: '#fff',
                    }}
                />
                <TextField
                    label="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{
                        backgroundColor: '#fff',
                    }}
                />
                <NumericFormat
                    value={preco}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale
                    onValueChange={(values) => setPreco(values.value)}
                    placeholder="Preço"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    required
                />
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Salvar Produto
                </Button>
            </form>

            <Snackbar
                open={!!successMessage}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default ProductForm;
