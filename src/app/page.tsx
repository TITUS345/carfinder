'use client';

import React, { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import CarCard from "@/components/CarCard/CarCard";
import { SearchFilters } from "@/types/SearchFilters";
import { Car } from "@/types/Car";
import Pagination from "@mui/material/Pagination";

const HomePage: React.FC = () => {
  const [carList, setCarList] = useState<Car[]>([]);
  const [wishlist, setWishlist] = useState<Car[]>([]);
  const [wishlistSearch, setWishlistSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistPage, setWishlistPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [theme, setTheme] = useState<string>("light");
  const carsPerPage = 5;
  const carsPerWishlistPage = 10;

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSearch = async (filters: SearchFilters) => {
    setIsLoading(true);
    try {
      const queryString = new URLSearchParams(filters as any).toString();
      const response = await fetch(`/api/cars?${queryString}`);
      const data = await response.json();
      setCarList(data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWishlist = (car: Car) => {
    if (wishlist.some((item) => item.id === car.id)) {
      setWishlist(wishlist.filter((item) => item.id !== car.id));
    } else {
      setWishlist([...wishlist, car]);
    }
  };

  const sortedWishlist = [...wishlist].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price;
      case "brand":
        return a.brand.localeCompare(b.brand);
      case "seatingCapacity":
        return a.seatingCapacity - b.seatingCapacity;
      default:
        return 0;
    }
  });

  const filteredWishlist = sortedWishlist.filter((car: Car) =>
    car.brand.toLowerCase().includes(wishlistSearch.toLowerCase())
  );

  const indexOfLastWishlistCar = wishlistPage * carsPerWishlistPage;
  const indexOfFirstWishlistCar = indexOfLastWishlistCar - carsPerWishlistPage;
  const currentWishlistCars = filteredWishlist.slice(
    indexOfFirstWishlistCar,
    indexOfLastWishlistCar
  );

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = carList.slice(indexOfFirstCar, indexOfLastCar);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleWishlistPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setWishlistPage(page);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`p-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <SearchBar
        onSearch={handleSearch}
        onSortChange={setSortBy}
        toggleTheme={toggleTheme}
        theme={theme}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      {/* Wishlist Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Wishlist</h2>
          <input
            type="text"
            placeholder="Search Wishlist..."
            className={`border rounded-md px-4 py-2 text-sm ${theme === "dark" ? "bg-gray-700 text-white border-gray-500" : "bg-blue-200 border-gray-300"
              }`}
            onChange={(e) => setWishlistSearch(e.target.value)}
          />
        </div>
        <p className={`mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          {filteredWishlist.length} {filteredWishlist.length === 1 ? "car" : "cars"} in your wishlist.
        </p>
        <div
          className={`max-h-100 overflow-y-auto rounded-md p-4 shadow-md ${theme === "dark" ? "bg-gray-700 text-white border-gray-500" : "bg-gray-100 text-gray-900 border-gray-300"
            }`}
        >
          {currentWishlistCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentWishlistCars.map((car: Car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  isInWishlist={true}
                  onToggleWishlist={toggleWishlist}
                  theme={theme} // Pass current theme for dynamic adaptation
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No cars match your search.</p>
          )}
          {filteredWishlist.length > carsPerWishlistPage && (
            <div className="flex justify-center mt-4">
              <Pagination
                count={Math.ceil(filteredWishlist.length / carsPerWishlistPage)}
                page={wishlistPage}
                onChange={handleWishlistPageChange}
                color="primary"
              />
            </div>
          )}
        </div>
      </div>

      {/* Render Current Cars */}
      {isLoading ? (
        <div className="flex justify-center items-center mt-4">
          <div className="spinner-border animate-spin inline-block w-6 h-6 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
          <p className="ml-2 text-gray-500">Fetching results, please wait...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {currentCars.map((car: Car) => (
            <CarCard
              key={car.id}
              car={car}
              isInWishlist={wishlist.some((item) => item.id === car.id)}
              onToggleWishlist={toggleWishlist}
              theme={theme} // Dynamic styling based on the theme
            />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(carList.length / carsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default HomePage;