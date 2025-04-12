export interface SearchFilters {
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    fuelType?: "Gasoline" | "Diesel" | "Electric";
}