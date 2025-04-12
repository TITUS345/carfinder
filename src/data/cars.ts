export interface Car {
    id: number;
    brand: string;
    price: number;
    fuelType: "Gasoline" | "Diesel" | "Electric";
    seatingCapacity: number;
    image: string; // Added property for the car image URL
}

const cars: Car[] = [
    {
        id: 1,
        brand: "Toyota",
        price: 20000,
        fuelType: "Gasoline",
        seatingCapacity: 5,
        image: "/toyota.jpg", // Correct path
    },
    {
        id: 2,
        brand: "Honda",
        price: 18000,
        fuelType: "Diesel",
        seatingCapacity: 7,
        image: "/honda.jpg", // Correct path
    },
    {
        id: 3,
        brand: "Ford",
        price: 25000,
        fuelType: "Electric",
        seatingCapacity: 4,
        image: "/ford.jpg", // Correct path
    },
    {
        id: 4,
        brand: "BMW",
        price: 40000,
        fuelType: "Gasoline",
        seatingCapacity: 5,
        image: "/BMW.jpg", // Correct path
    },
    {
        id: 5,
        brand: "Mercedes",
        price: 50000,
        fuelType: "Diesel",
        seatingCapacity: 4,
        image: "/mercedes.jpg", // Correct path
    },
    {
        id: 6,
        brand: "Mercedes",
        price: 590000,
        fuelType: "Diesel",
        seatingCapacity: 8,
        image: "/mercedes.jpg", // Correct path
    },
    {
        id: 7,
        brand: "Mercedes",
        price: 850000,
        fuelType: "Diesel",
        seatingCapacity: 12,
        image: "/mercedes.jpg", // Correct path
    },
    {
        id: 8,
        brand: "Mercedes",
        price: 750000,
        fuelType: "Diesel",
        seatingCapacity: 3,
        image: "/mercedes.jpg", // Correct path
    },
    {
        id: 9,
        brand: "Mercedes",
        price: 670000,
        fuelType: "Diesel",
        seatingCapacity: 9,
        image: "/mercedes.jpg", // Correct path
    },
    {
        id: 10,
        brand: "Mercedes",
        price: 100000,
        fuelType: "Diesel",
        seatingCapacity: 13,
        image: "/mercedes.jpg", // Correct path
    },
    {
        id: 11,
        brand: "Mercedes",
        price: 900000,
        fuelType: "Diesel",
        seatingCapacity: 2,
        image: "/mercedes.jpg", // Correct path
    },
    {
        id: 12,
        brand: "Mercedes",
        price: 700000,
        fuelType: "Diesel",
        seatingCapacity: 10,
        image: "/mercedes.jpg", // Correct path
    },
];

export default cars;