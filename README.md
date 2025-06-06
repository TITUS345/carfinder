1. Project Title
- Car Listing and Wishlist with Dark/Light Mode

2. Description
This project is a responsive car listing application that allows users to:
- Browse car listings with brand, price, fuel type, and seating capacity details.
- Add and remove cars from their wishlist.
- Toggle between light and dark themes for a personalized user experience.
- Filter and sort car listings dynamically based on user input.

3. Features
- Dynamic Theme Support: Light and dark mode support across all components, ensuring readability and aesthetic consistency.
- Interactive Wishlist: Add or remove cars from the wishlist, with pagination for large wishlists.
- Search and Filter: Input fields and dropdowns for filtering cars by brand, price range, and fuel type.
- Responsive Design: Works seamlessly across desktop and mobile devices.
- Pagination: Easy navigation for both car listings and wishlist items.

4. Tech Stack
- Frontend: React.js with Next.js
- Styling: Tailwind CSS and Material UI components
- State Management: React useState and useEffect hooks
- Storage: LocalStorage for saving wishlist and theme preferences

5. How to Run the Project
- Clone the repository:git clone [repository-url(https://github.com/TITUS345/carfinder.git)]

- Navigate to the project directory:cd car-listing-project

- Install dependencies:npm install

- Start the development server:npm run dev

- Access the application at http://localhost:3000.


6. Folder Structure
src/
├── components/
│   ├── SearchBar/
│   ├── CarCard/
├── pages/
│   ├── index.tsx
├── styles/
├── app/
│   ├── layout.tsx
│   ├── global.css

7. Known Issues
- Hydration Warning: A non-breaking hydration warning related to theme initialization.

8. Contributing
Feel free to fork the repository and submit a pull request for any improvements or bug fixes.

