import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { AppBar, Toolbar, Typography, Container, Button, Box, Snackbar, Alert } from '@mui/material';
import api from './services/api';
import './App.css';


function App() {
  const [products, setProducts] = useState([]);
  const [showProductList, setShowProductList] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await api.get('/produtos');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductCreated = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setShowProductList(true);
    setSuccessMessage('Produto criado com sucesso!');
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setSuccessMessage('Produto editado com sucesso!');
  };

  const handleProductDeleted = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };


  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CRUD de Produtos
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        {showProductList ? (
          <Box>
            <Button variant="contained" color="primary" onClick={() => setShowProductList(false)} sx={{ marginBottom: 2 }}>
              Criar Novo Produto
            </Button>
            <ProductList products={products} onDelete={handleProductDeleted} onEdit={handleProductUpdated} />
          </Box>
        ) : (
          <Box>
            <Button variant="contained" color="secondary" onClick={() => setShowProductList(true)} sx={{ marginBottom: 2 }}>
              Visualizar Produtos
            </Button>
            <ProductForm onProductCreated={handleProductCreated} onProductUpdated={handleProductUpdated} />
          </Box>
        )}
        <Snackbar
          open={Boolean(successMessage)}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage('')}
        >
          <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );


}

export default App;
