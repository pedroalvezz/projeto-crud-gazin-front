import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from '@mui/material';
import api from '../services/api';
import { NumericFormat } from 'react-number-format';


function ProductItem({ product, onDelete }) {
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState(product.nome);
    const [descricao, setDescricao] = useState(product.descricao);
    const [preco, setPreco] = useState(product.preco);

    const handleEdit = async () => {
        try {
            await api.put(`/produtos/${product.id}`, { nome, descricao, preco });
            setOpen(false);
            window.location.reload(); // Atualizar a lista de produtos
        } catch (error) {
            console.error('Erro ao editar produto:', error);
        }
    };

    return (
        <Card sx={{ marginBottom: 2, padding: 2, backgroundColor: '#f9f9f9', boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {product.nome}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
                    {product.descricao}
                </Typography>
                <Typography variant="h5" color="primary">
                    R$ {product.preco}
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                    <Button color="error" onClick={() => onDelete(product.id)} sx={{ marginRight: 1 }}>
                        Excluir
                    </Button>
                    <Button color="primary" onClick={() => setOpen(true)}>
                        Editar
                    </Button>
                </Box>
            </CardContent>

            {/* Modal de Edição */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Editar Produto</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        margin="dense"
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleEdit} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default ProductItem;
