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
  const [wishlistSearch, setWishlistSearch] = useState<string>(""); // For filtering wishlist
  const [currentPage, setCurrentPage] = useState(1); // Pagination for search results
  const [wishlistPage, setWishlistPage] = useState(1); // Pagination for wishlist
  const [sortBy, setSortBy] = useState<string>(""); // Sorting criteria
  const [isLoading, setIsLoading] = useState(false); // Loading state for search
  const [showFilters, setShowFilters] = useState(false); // Visibility of filters
  const [theme, setTheme] = useState<string>("light"); // Light/Dark mode
  const carsPerPage = 5;
  const carsPerWishlistPage = 10;

  // Load saved wishlist and theme on component mount
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

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSearch = async (filters: SearchFilters) => {
    setIsLoading(true); // Show loading spinner
    try {
      const queryString = new URLSearchParams(
        filters as unknown as Record<string, string> // Converting filters to query string
      ).toString();
      const response = await fetch(`/api/cars?${queryString}`);
      const data = await response.json();
      setCarList(data); // Set search results
      setCurrentPage(1); // Reset pagination
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  const toggleWishlist = (car: Car) => {
    if (wishlist.some((item) => item.id === car.id)) {
      setWishlist(wishlist.filter((item) => item.id !== car.id)); // Remove from wishlist
    } else {
      setWishlist([...wishlist, car]); // Add to wishlist
    }
  };

  // Sorting logic based on the selected criteria
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
    car.brand.toLowerCase().includes(wishlistSearch.toLowerCase()) // Filter based on search input
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
    setCurrentPage(page); // Update current page for search results
  };

  const handleWishlistPageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setWishlistPage(page); // Update current page for wishlist
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light"); // Toggle light/dark mode
  };

  return (
    <div
      className={`p-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
    >
      {/* Search Bar */}
      <SearchBar
        onSearch={handleSearch}
        onSortChange={setSortBy} // Pass sorting state updater function
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
            className={`border rounded-md px-4 py-2 text-sm ${theme === "dark"
                ? "bg-gray-700 text-white border-gray-500"
                : "bg-blue-200 border-gray-300"
              }`}
            onChange={(e) => setWishlistSearch(e.target.value)}
          />
        </div>
        {filteredWishlist.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {currentWishlistCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  isInWishlist
                  onToggleWishlist={toggleWishlist}
                  theme={theme}
                />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Pagination
                count={Math.ceil(filteredWishlist.length / carsPerWishlistPage)}
                page={wishlistPage}
                onChange={handleWishlistPageChange}
                color="primary"
              />
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No cars in your wishlist.</p>
        )}
      </div>

      {/* Search Results Section */}
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
              theme={theme}
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