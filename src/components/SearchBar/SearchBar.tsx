import React, { useState } from "react";
import { SearchFilters } from "@/types/SearchFilters";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

interface SearchBarProps {
    onSearch: (filters: SearchFilters) => void;
    onSortChange: (sortBy: string) => void; // Callback to update sort criteria
    toggleTheme: () => void;
    theme: string; // Light or dark mode
    showFilters: boolean; // Tracks visibility of filters
    setShowFilters: React.Dispatch<React.SetStateAction<boolean>>; // Toggles visibility of filters
}

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    onSortChange,
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
    const [sortCriteria, setSortCriteria] = useState<string>(""); // Local state for sorting

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleFilterSubmit = () => {
        onSearch(filters);
    };

    const handleSortChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const selectedSort = e.target.value as string;
        setSortCriteria(selectedSort); // Update local sorting state
        onSortChange(selectedSort); // Pass sorting criteria to parent
    };

    return (
        <div
            className={`p-4 rounded-md shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
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

            {/* Sorting Dropdown */}
            <TextField
                select
                label="Sort Wishlist"
                value={sortCriteria}
                onChange={handleSortChange}
                variant="outlined"
                className="w-full md:w-1/7 mb-4"
                SelectProps={{
                    style: theme === "dark"
                        ? { color: "white", backgroundColor: "#333" }
                        : {},
                }}
                InputLabelProps={{
                    style: theme === "dark" ? { color: "white" } : {},
                }}
            >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="brand">Brand</MenuItem>
                <MenuItem value="seatingCapacity">Seating Capacity</MenuItem>
            </TextField>

            {/* Filters Section */}
            {showFilters && (
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Filter: Brand */}
                    <TextField
                        label="Search by Brand"
                        name="brand"
                        variant="outlined"
                        value={filters.brand || ""}
                        onChange={handleInputChange}
                        className="w-full md:w-1/8"
                        InputProps={{
                            style: theme === "dark"
                                ? { color: "white", backgroundColor: "#333" }
                                : {},
                        }}
                        InputLabelProps={{
                            style: theme === "dark" ? { color: "white" } : {},
                        }}
                    />

                    {/* Filter: Min Price */}
                    <TextField
                        label="Min Price"
                        name="minPrice"
                        type="number"
                        variant="outlined"
                        value={filters.minPrice || ""}
                        onChange={handleInputChange}
                        className="w-full md:w-1/8"
                        InputProps={{
                            style: theme === "dark"
                                ? { color: "white", backgroundColor: "#333" }
                                : {},
                        }}
                        InputLabelProps={{
                            style: theme === "dark" ? { color: "white" } : {},
                        }}
                    />

                    {/* Filter: Max Price */}
                    <TextField
                        label="Max Price"
                        name="maxPrice"
                        type="number"
                        variant="outlined"
                        value={filters.maxPrice || ""}
                        onChange={handleInputChange}
                        className="w-full md:w-1/8"
                        InputProps={{
                            style: theme === "dark"
                                ? { color: "white", backgroundColor: "#333" }
                                : {},
                        }}
                        InputLabelProps={{
                            style: theme === "dark" ? { color: "white" } : {},
                        }}
                    />

                    {/* Filter: Fuel Type */}
                    <TextField
                        select
                        label="Fuel Type"
                        name="fuelType"
                        value={filters.fuelType || ""}
                        onChange={handleInputChange}
                        variant="outlined"
                        className="w-full md:w-1/7"
                        SelectProps={{
                            style: theme === "dark"
                                ? { color: "white", backgroundColor: "#333" }
                                : {},
                        }}
                        InputLabelProps={{
                            style: theme === "dark" ? { color: "white" } : {},
                        }}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="Gasoline">Gasoline</MenuItem>
                        <MenuItem value="Diesel">Diesel</MenuItem>
                        <MenuItem value="Electric">Electric</MenuItem>
                    </TextField>

                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleFilterSubmit}
                        className="mt-4"
                    >
                        Search
                    </Button>

                    {/* Theme Toggle Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={toggleTheme}
                        className="mt-4 bg-blue-500 text-white"
                    >
                        Switch to {theme === "light" ? "Dark" : "Light"} Mode
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SearchBar;