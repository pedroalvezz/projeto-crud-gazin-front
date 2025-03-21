import { useState } from "react";
import { TextField } from "@mui/material";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { Search } from "@mui/icons-material";

const ProductSearch = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const theme = useTheme();
    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <TextField
                label="Buscar produto..."
                variant="outlined"
                size="large"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    input: { color: 'text.primary' }, // Altera a cor do texto digitado
                }}
            />
            <Tooltip title="Buscar" arrow>
                <IconButton
                    color="primary"
                    onClick={handleSearch}
                    sx={{
                        backgroundColor:
                            theme.palette.mode === "light"
                                ? "rgba(255, 223, 100, 0.1)" // Amarelo claro no tema claro
                                : "rgba(255, 223, 100, 0.5)", // Mais escuro no tema escuro
                        borderRadius: "16px", // Bordas arredondadas
                        padding: "10px", // Aumenta a área de clique
                        transition: "background-color 0.3s",
                        "&:hover": {
                            backgroundColor:
                                theme.palette.mode === "light"
                                    ? "rgba(255, 223, 100, 0.2)" // Hover mais intenso no tema claro
                                    : "rgba(255, 223, 100, 0.2)", // Hover mais intenso no tema escuro
                        },
                    }}
                >
                    <Search fontSize="large" />
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default ProductSearch;
