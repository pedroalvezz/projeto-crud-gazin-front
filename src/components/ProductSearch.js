import { useState } from "react";
import { TextField, Button } from "@mui/material";

const ProductSearch = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <TextField
                label="Buscar produto..."
                variant="outlined"
                size="small"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
                Buscar
            </Button>
        </div>
    );
};

export default ProductSearch;
