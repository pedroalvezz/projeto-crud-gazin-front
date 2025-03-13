import React, { useState } from 'react';
import {
    Button, Card, CardContent, Typography, Dialog,
    DialogActions, DialogContent, DialogTitle, TextField,
    Box, Snackbar, Alert, IconButton, Tooltip
} from '@mui/material';
import api, { updateProductQuantity, removeProductQuantity } from '../services/api';
import { NumericFormat } from 'react-number-format';
import { AddCircle, Delete, Edit, RemoveCircle } from "@mui/icons-material";
import { useTheme } from '@mui/material/styles';


function ProductItem({ product, onDelete }) {
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState(product.nome);
    const [descricao, setDescricao] = useState(product.descricao);
    const [preco, setPreco] = useState(product.preco);
    const [quantidade, setQuantidade] = useState(product.quantidade || 1);
    const theme = useTheme();


    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");


    const handleIncreaseQuantity = async () => {
        const unidadesAdicionar = 1;

        try {
            await updateProductQuantity(product.id, unidadesAdicionar);
            setQuantidade(prevQuantidade => prevQuantidade + unidadesAdicionar);

            setSnackbarMessage(`Adicionadas ${unidadesAdicionar} unidade(s) de ${product.nome}!`);
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Erro ao atualizar quantidade:", error);
        }
    };

    const handleRemove = async () => {
        if (quantidade > 0) {
            try {
                await removeProductQuantity(product.id);
                setQuantidade(prevQuantidade => prevQuantidade - 1);
                setSnackbarMessage(`Removida 1 unidade de ${product.nome}!`);
                setSnackbarOpen(true);
            } catch (error) {
                console.error("Erro ao remover quantidade:", error);
            }
        }
    };

    const handleEdit = async () => {
        try {
            await api.put(`/produtos/${product.id}`, { nome, descricao, preco, });
            setOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao editar produto:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await api.delete(`/produtos/${product.id}`);
            if (response.status === 200) {
                onDelete(product.id);
            } else {
                console.error("Erro ao excluir produto:", response.status);
                alert(`Erro ao excluir produto. Código de status: ${response.status}`);
            }
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            alert(`Erro ao excluir o produto: ${error.message}`);
        }
    };

    return (
        <Card sx={{ marginBottom: 2, padding: 2, boxShadow: 3 }}>
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

                <Box sx={{ marginTop: 2, display: "flex", gap: 1 }}>
                    {/* Botão de Excluir */}
                    <Tooltip title="Excluir" arrow>
                        <IconButton
                            color="error"
                            onClick={handleDelete}
                            sx={{
                                backgroundColor: theme.palette.mode === 'dark'
                                    ? "rgba(0, 0, 0, 0.4)"  // Cor de fundo para tema escuro
                                    : "rgba(0, 0, 0, 0.1)",  // Cor de fundo para tema claro
                                borderRadius: "16px",
                                padding: "10px",
                                "&:hover": {
                                    backgroundColor: theme.palette.mode === 'dark'
                                        ? "rgba(255, 100, 100, 0.2)"
                                        : "rgba(255, 100, 100, 0.1)", // Efeito de hover para tema claro
                                },
                            }}
                        >
                            <Delete fontSize="large" />
                        </IconButton>
                    </Tooltip>

                    {/* Botão de Editar */}
                    <Tooltip title="Editar" arrow>
                        <IconButton
                            color="primary"
                            onClick={() => setOpen(true)}
                            sx={{
                                backgroundColor: theme.palette.mode === 'dark'
                                    ? "rgba(0, 0, 0, 0.4)"
                                    : "rgba(0, 0, 0, 0.1)",  // Cor de fundo para tema claro
                                borderRadius: "16px",
                                padding: "10px",
                                "&:hover": {
                                    backgroundColor: theme.palette.mode === 'dark'
                                        ? "rgba(255, 223, 100, 0.2)"
                                        : "rgba(255, 223, 100, 0.1)", // Efeito de hover para tema claro
                                },
                            }}
                        >
                            <Edit fontSize="large" />
                        </IconButton>
                    </Tooltip>
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
                        customInput={TextField} // Usa o TextField do MUI
                        fullWidth
                        required
                        variant="outlined" // Ou "filled", "standard" dependendo do estilo que deseja
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

            <Card sx={{ maxWidth: 1200, m: 2, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="body1">
                        <strong>Quantidade:</strong> {quantidade}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1, color: "primary.main" }}>
                        <strong>Total: R${(product?.preco || 0) * quantidade}</strong>
                    </Typography>
                    <Box sx={{ mt: 1, display: "flex", justifyContent: "center", gap: 2 }}>

                        {/* Botão de Remover */}
                        <Tooltip title="Remover Unidade" arrow>
                            <IconButton color="secondary" onClick={handleRemove} disabled={quantidade <= 0}>
                                <RemoveCircle fontSize="large" />
                            </IconButton>
                        </Tooltip>

                        {/* Botão de Adicionar */}
                        <Tooltip title="Adicionar Unidade" arrow>
                            <IconButton color="primary" onClick={handleIncreaseQuantity}>
                                <AddCircle fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </CardContent>
            </Card>

            {/* Snackbar para exibir mensagens */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Card>
    );
}

export default ProductItem;
