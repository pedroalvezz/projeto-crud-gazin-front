import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";
import { Snackbar, Alert } from "@mui/material";


const FilteredProductList = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8000/api/produtos?search=${search}`)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Erro ao buscar produtos", err));
    }, [search]);


    const handleDelete = (deletedProductId) => {
        console.log("🗑️ Removendo produto ID:", deletedProductId);
        setProducts(prevProducts => prevProducts.filter(prod => prod.id !== deletedProductId));

        setSuccessMessage('Produto excluído com sucesso!');

    }


    return (
        <div>
            <ProductSearch onSearch={setSearch} />
            <ProductList products={products} onDelete={handleDelete} setProdutos={setProducts}
            />


            <Snackbar
                open={!!successMessage}
                autoHideDuration={3000}
                onClose={() => setSuccessMessage('')}
            >
                <Alert severity="success" onClose={() => setSuccessMessage('')}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default FilteredProductList;
