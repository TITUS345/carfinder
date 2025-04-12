export interface Car {
    id: number;
    brand: string;
    price: number;
    fuelType: "Gasoline" | "Diesel" | "Electric";
    seatingCapacity: number;
    image: string; // URL for the car image
}