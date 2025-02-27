import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const FilteredProductList = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8000/api/produtos?search=${search}`)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Erro ao buscar produtos", err));
    }, [search]);

    return (
        <div>
            <ProductSearch onSearch={setSearch} />
            <ProductList products={products} />
        </div>
    );
};

export default FilteredProductList;
