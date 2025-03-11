import React, { useState } from 'react';
import api from '../services/api';
import { TextField, Button, Box, Typography, Snackbar, Alert, } from '@mui/material';
import { NumericFormat } from 'react-number-format';

function ProductForm({ produto, onProductSaved }) {
    const [nome, setNome] = useState(produto ? produto.nome : '');
    const [descricao, setDescricao] = useState(produto ? produto.descricao : '');
    const [preco, setPreco] = useState(produto ? produto.preco : '');
    const [successMessage, setSuccessMessage] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            nome,
            descricao,
            preco,
        };

        console.log('Enviando payload:', payload);

        try {
            const payload = { nome, descricao, preco };

            if (produto) {
                // Atualizar produto existente (edição)
                await api.put(`/produtos/${produto.id}`, payload);
                setSuccessMessage('Produto atualizado com sucesso!');
            } else {
                // Criar novo produto
                const response = await api.post('/produtos', payload);
                setSuccessMessage('Produto criado com sucesso!');
                onProductSaved(response.data);
            }

            // Resetar o formulário apenas se for um novo produto
            if (!produto) {
                setNome('');
                setDescricao('');
                setPreco('');
            }
        } catch (error) {
            console.error('Erro ao salvar produto:', error.response?.data);
        }
    };

    const handleCloseSnackbar = () => {
        setSuccessMessage('');
    };

    return (
        <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'text.primary' }}>
                {produto ? 'Editar Produto' : 'Adicionar Produto'}
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
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        input: { color: 'text.primary' }, // Altera a cor do texto digitado
                    }}
                />
                <TextField
                    label="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        input: { color: 'text.primary' }, // Altera a cor do texto digitado
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
                    customInput={TextField} // Usa o TextField do MUI
                    fullWidth
                    required
                    variant="outlined" // Ou "filled", "standard" dependendo do estilo que deseja
                />




                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    {produto ? 'Atualizar Produto' : 'Salvar Produto'}
                </Button>
            </form>

            <Snackbar open={!!successMessage} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>


        </Box>
    );
}

export default ProductForm;
