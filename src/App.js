import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import { AppBar, Toolbar, Typography, Container, Button, Box, Snackbar, Alert } from '@mui/material';
import api from './services/api';
import './App.css';
import FilteredProductList from './components/FilteredProductList';
import { useAppThemeContext } from './components/contexts/ThemeContext';

function App() {
  const [products, setProducts] = useState([]);
  const [showProductList, setShowProductList] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  // Hook para acessar o contexto de tema
  const { toggleTheme } = useAppThemeContext();

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

  const handleProductDeleted = (deletedProductId) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== deletedProductId));
    setShowProductList(true);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setSuccessMessage('Produto editado com sucesso!');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CRUD de Produtos
          </Typography>
          {/* Adicionando o botão para alternar tema */}
          <Button
            variant="contained"
            color="default"
            onClick={toggleTheme}
            sx={{ marginLeft: 'auto' }}
          >
            Alternar Tema
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        {showProductList ? (
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowProductList(false)}
              sx={{ marginBottom: 2 }}
            >
              Criar Novo Produto
            </Button>
            <FilteredProductList products={products} onDelete={handleProductDeleted} onEdit={handleProductUpdated} />
          </Box>
        ) : (
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowProductList(true)}
              sx={{ marginBottom: 2 }}
            >
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
          <Alert severity="success" onClose={() => setSuccessMessage('')} sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

export default App;
