import React, { useState } from "react";
import { SearchFilters } from "@/types/SearchFilters";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

interface SearchBarProps {
    onSearch: (filters: SearchFilters) => void; // Function to handle searches
    toggleTheme: () => void; // Function to toggle between dark and light mode
    theme: string; // Current theme (light or dark)
    showFilters: boolean; // Tracks visibility of filters
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>; // Function to toggle filters
}

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    toggleTheme,
    theme,
    showFilters,
    setShowFilters,
}) => {
    const [filters, setFilters] = useState<SearchFilters>({
        brand: "",
        minPrice: undefined,
        maxPrice: undefined,
        fuelType: undefined,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleFilterSubmit = () => {
        onSearch(filters);
    };

    return (
        <div
            className={`p-4 rounded-md shadow-md ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                }`}
        >
            {/* Show/Hide Filters Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={() => setShowFilters(!showFilters)}
                className="mb-4"
            >
                {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>

            {showFilters && (
                <div className="flex flex-wrap md:flex-row gap-4 items-center">
                    {/* Filters Section */}
                    <TextField
                        label="Search by Brand"
                        name="brand"
                        variant="outlined"
                        value={filters.brand || ""}
                        onChange={handleInputChange}
                        className="w-full md:w-1/8"
                        InputProps={{
                            style: theme === "dark" ? { color: "white" } : {}, // Input text color
                        }}
                        InputLabelProps={{
                            style: theme === "dark" ? { color: "white" } : {}, // Placeholder color
                        }}
                    />
                    <TextField
                        label="Min Price"
                        name="minPrice"
                        type="number"
                        variant="outlined"
                        value={filters.minPrice || ""}
                        onChange={handleInputChange}
                        className="w-full md:w-1/8"
                        InputProps={{
                            style: theme === "dark" ? { color: "white" } : {}, // Input text color
                        }}
                        InputLabelProps={{
                            style: theme === "dark" ? { color: "white" } : {}, // Placeholder color
                        }}
                    />
                    <TextField
                        label="Max Price"
                        name="maxPrice"
                        type="number"
                        variant="outlined"
                        value={filters.maxPrice || ""}
                        onChange={handleInputChange}
                        className="w-full md:w-1/8"
                        InputProps={{
                            style: theme === "dark" ? { color: "white" } : {}, // Input text color
                        }}
                        InputLabelProps={{
                            style: theme === "dark" ? { color: "white" } : {}, // Placeholder color
                        }}
                    />
                    <TextField
                        select
                        label="Fuel Type"
                        name="fuelType"
                        value={filters.fuelType || ""}
                        onChange={handleInputChange}
                        variant="outlined"
                        className="w-full md:w-1/7"
                        SelectProps={{
                            style: theme === "dark" ? { color: "white" } : {}, // Dropdown text color
                        }}
                        InputLabelProps={{
                            style: theme === "dark" ? { color: "white" } : {}, // Label color
                        }}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="Gasoline">Gasoline</MenuItem>
                        <MenuItem value="Diesel">Diesel</MenuItem>
                        <MenuItem value="Electric">Electric</MenuItem>
                    </TextField>

                    {/* Search Button */}
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleFilterSubmit}
                        className="w-3px md:w-1/9"
                    >
                        Search
                    </Button>

                    {/* Theme Toggle Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={toggleTheme}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 md:ml-auto"
                    >
                        Switch to {theme === "light" ? "Dark" : "Light"} Mode
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SearchBar;