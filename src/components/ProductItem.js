import React, { useState } from 'react';
import {
    Button, Card, CardContent, Typography, Dialog,
    DialogActions, DialogContent, DialogTitle, TextField,
    Box
} from '@mui/material';
import api, { updateProductQuantity } from '../services/api';
import { removeProductQuantity, } from '../services/api';
import { NumericFormat } from 'react-number-format';


function ProductItem({ product, onDelete, onUpdate }) {
    const [open, setOpen] = useState(false);
    const [nome, setNome] = useState(product.nome);
    const [descricao, setDescricao] = useState(product.descricao);
    const [preco, setPreco,] = useState(product.preco);
    const [quantidade, setQuantidade] = useState(product.quantidade || 1);


    const handleIncreaseQuantity = async () => {

        try {
            const updatedProduct = await updateProductQuantity(product.id, 1);
            onUpdate(updatedProduct.product);
        } catch (error) {
            console.error("Erro ao atualizar quantidade:", error);
        }
        await updateProductQuantity(product.id); // Chama a API para adicionar
        const novaQuantidade = quantidade + 1;

        setQuantidade(novaQuantidade); // Atualiza a quantidade localmente
        // Atualiza o preço total localmente

        // Se necessário, faça também a atualização no backend

    };

    const handleRemove = async () => {

        await removeProductQuantity(product.id);
        if (typeof atualizarProdutos === 'function') {
            // 🔥 Certifique-se de chamar apenas se for uma função
        } else {
            console.error('atualizarProdutos não é uma função',);
        }

        if (quantidade > 0) {

            await removeProductQuantity(product.id); // Chama a API para remover
            const novaQuantidade = quantidade - 1;


            setQuantidade(novaQuantidade); // Atualiza a quantidade localmente
            // Atualiza o preço total localmente

            // Se necessário, faça também a atualização no backend

        }
    };


    const handleEdit = async () => {
        try {
            await api.put(`/produtos/${product.id}`, { nome, descricao, preco });
            setOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Erro ao editar produto:', error);
        }
    };

    const handleDelete = async () => {
        try {
            console.log("onDelete no ProductItem:", onDelete);
            const response = await api.delete(`/produtos/${product.id}`);

            if (response.status === 200) {
                onDelete(product.id);
            } else {
                console.error("Erro ao excluir produto. Código de status:", response.status);
                alert(`Erro ao excluir produto. Código de status: ${response.status}`);
            }
        } catch (error) {
            console.error("Erro ao excluir produto:", error.response ? error.response.data : error);
            alert(`Erro ao excluir o produto: ${error.response ? error.response.data.message : error.message}`);
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
                    <Button color="error" onClick={handleDelete} sx={{ marginRight: 1 }}>
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

            <Card sx={{ maxWidth: 1200, m: 2, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="body1">
                        <strong>Quantidade:</strong> {quantidade}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1, color: "primary.main" }}>
                        <strong>Total: R${(product?.preco || 0) * quantidade}</strong>
                    </Typography>
                    <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                        <Button variant="contained" color="primary" onClick={handleIncreaseQuantity}>
                            Adicionar Unidade
                        </Button>
                    </Box>
                    <Box sx={{ mt: 1, display: "flex", justifyContent: "center", }}>
                        <Button variant="contained" color="primary" onClick={handleRemove} disabled={product.quantidade <= 0}>
                            Remover  Unidade
                        </Button>
                    </Box>
                </CardContent>
            </Card>

        </Card>

    );
}

export default ProductItem;
