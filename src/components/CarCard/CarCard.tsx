import React from "react";
import { Car } from "@/types/Car";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface CarCardProps {
    car: Car; // Car details
    isInWishlist: boolean; // Indicates whether the car is in the wishlist
    onToggleWishlist: (car: Car) => void; // Function to handle wishlist toggle
    theme: string; // Current theme (light or dark)
}

const CarCard: React.FC<CarCardProps> = ({ car, isInWishlist, onToggleWishlist, theme }) => {
    return (
        <Card
            className={`w-full md:w-80 shadow-lg ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                }`}
        >
            <CardMedia
                component="img"
                alt={car.brand}
                height="140"
                image={car.image}
                className="transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <CardContent>
                {/* Brand Name */}
                <Typography
                    variant="h6"
                    component="div"
                    className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                    {car.brand}
                </Typography>

                {/* Price */}
                <Typography
                    variant="body2"
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                    Price: ${car.price.toLocaleString()}
                </Typography>

                {/* Fuel Type */}
                <Typography
                    variant="body2"
                    className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                    Fuel Type: {car.fuelType}
                </Typography>

                {/* Seating Capacity */}
                <Typography
                    variant="body2"
                    className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                >
                    Seats: {car.seatingCapacity}
                </Typography>

                {/* Wishlist Button */}
                <Button
                    variant="contained"
                    className={`mt-2 ${isInWishlist
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : theme === "dark"
                                ? "bg-gray-600 hover:bg-gray-700 text-white"
                                : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                    onClick={() => onToggleWishlist(car)}
                >
                    {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
            </CardContent>
        </Card>
    );
};

export default CarCard;