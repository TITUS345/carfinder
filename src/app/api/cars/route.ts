import cars from "@/data/cars";
import { Car } from "@/types/Car";

export async function GET(request: Request): Promise<Response> {
    const { searchParams } = new URL(request.url);

    // Retrieve search parameters
    const brand = searchParams.get("brand");
    const minPrice = searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!, 10) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!, 10) : undefined;
    const fuelType = searchParams.get("fuelType");

    // Initialize filtered cars
    let filteredCars: Car[] = cars;

    // Filter by brand (case insensitive)
    if (brand) {
        filteredCars = filteredCars.filter(car =>
            car.brand.toLowerCase() === brand.toLowerCase()
        );
    }

    // Filter by price range
    if (minPrice !== undefined || maxPrice !== undefined) {
        filteredCars = filteredCars.filter(
            car => car.price >= (minPrice || 0) && car.price <= (maxPrice || Infinity)
        );
    }

    // Filter by fuel type
    if (fuelType) {
        filteredCars = filteredCars.filter(car => car.fuelType === fuelType);
    }

    // Return filtered cars as the response
    return new Response(JSON.stringify(filteredCars), { status: 200 });
}