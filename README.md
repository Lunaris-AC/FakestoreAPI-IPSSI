# React FakestoreAPI App -

This project is a comprehensive e-commerce web application built using React.js for the frontend, styled with Tailwind CSS, and powered by the [Fake Store API](https://fakestoreapi.com/). It's designed to demonstrate a variety of modern web development techniques and includes features like dynamic product display, robust filtering, cart management, secure user authentication, and responsive design. This README aims to provide a thorough guide to the application, its architecture, and usage.

## Core Features

*   **Dynamic Product Listing:**
    *   The application fetches and displays all available products from the Fake Store API on the home page.
    *   Product cards showcase essential information like product image, title, and price.
    *   Each product card provides a link to a dedicated product details page.
*   **Detailed Product View:**
    *   Individual product pages display comprehensive information, including the product image, title, price, category, and a detailed description.
    *   Users can add the product to their shopping cart from this page.
    *   A "Please login to add to cart" button is shown to non-authenticated users with a redirect to the login page.
*   **Advanced Product Filtering:**
    *   A search bar enables users to filter products by name using case-insensitive matching.
    *   A category filter allows users to narrow down the product list by selecting a specific product category.
*   **Shopping Cart Functionality:**
    *   Users can add products to their shopping cart from the product details page or directly from the home page.
    *   The shopping cart displays each item with options to adjust the quantity, as well as the total cost.
    *   Users can remove items from the cart.
    *   A simulated checkout process is included for demonstration purposes.
*   **User Authentication System:**
    *   A dedicated login page provides a form for username and password input.
    *   The application verifies user credentials against the Fake Store API's authentication endpoint using `POST` requests.
    *   Successful login attempts return a token, which is stored in local storage.
    *   The user's authentication state is managed using the React Context API, ensuring consistent access across all components.
    *   Protected routes using `PrivateRoute` redirect non-authenticated users to the login page.
*   **Responsive and Appealing UI:**
    *   The entire application is styled using Tailwind CSS, a utility-first CSS framework, for a clean and responsive layout across various devices.
    *   The layout adjusts smoothly on different screen sizes, offering a user-friendly experience on both desktop and mobile devices.
*   **Live Cart Item Count Bubble:**
    *   A live cart item count bubble is displayed next to the cart icon in the header. The bubble is updated in real-time, whenever an item is added, removed, or updated.
    *   The count is updated automatically whenever the user interacts with the cart by listening to localStorage updates, and by forcing a page reload.
    *   The bubble disappears if the cart is empty.

## Core Technologies and Libraries

*   **React.js:**
    *   The core library for building the user interface.
    *   Provides components, state management, and hooks for efficient UI development.
    *   Utilizes JSX syntax for declarative UI definitions.
*   **React Router DOM:**
    *   Handles navigation between different pages within the React application.
    *   Allows for declarative routing and management of browser history.
    *   Provides hooks like `useNavigate`, `useParams`, and `useLocation` for navigation and route information access.
*   **Tailwind CSS:**
    *   Provides a utility-first approach to CSS styling, enabling rapid UI construction and customizability.
    *   Offers a wide range of predefined classes for styling layout, typography, backgrounds, and more.
    *   Facilitates responsive design through breakpoint prefixes.
*   **Heroicons:**
    *   A collection of beautifully designed SVG icons.
    *   Used to enhance the user interface with intuitive and consistent visual elements.
*   **Fake Store API:**
    *   A free, publicly available API for fetching product data, categories, and for simulating user login.
    *   Provides a realistic dataset for e-commerce applications without requiring a custom backend.
*  **Context API:**
    *   A React feature for providing global state management in the component tree.
    *   Utilized for managing user authentication state, allowing access from any component.
*   **LocalStorage:**
    *   Used to store cart items and the authentication token in the browser's local storage.
    *   Allows persistence of data across page reloads.
*   **Jest & React Testing Library:**
    *   Jest is a JavaScript testing framework used for running unit and integration tests.
    *   React Testing Library is used to interact with rendered components as a user would and make assertions about their behavior.

## Detailed Getting Started Instructions

1.  **Clone the Repository:**
    *   Open your terminal or command prompt.
    *   Navigate to your desired directory to clone the repository.
    *   Execute the following command to clone the repository:

        ```bash
        git clone https://github.com/Lunaris-AC/FakestoreAPI-IPSSI
        ```

2.  **Navigate to the Project Directory:**
    *   Use the `cd` command to move into the cloned project directory.

        ```bash
        cd e-commerce-app
        ```

3.  **Install Dependencies:**
    *   Install all the necessary libraries and dependencies using npm:

        ```bash
        npm install
        ```

4.  **Start the Development Server:**
    *   Start the development server using the `npm start` script, which is included in the `package.json` file:

        ```bash
        npm start
        ```

    *   The application will be running at `http://localhost:3000`. You can access it using your web browser.

## Comprehensive Project Architecture
e-commerce-app/
├── node_modules/ # Contains project dependencies.
├── public/ # Contains static assets like index.html, favicon etc.
├── src/ # Contains all the source code
│ ├── components/ # Contains all reusable React components.
│ │ ├── ProductCard.jsx # Displays a single product card.
│ │ ├── ProductDetails.jsx # Shows details for a single product.
│ │ ├── SearchBar.jsx # Implements the product search functionality.
│ │ ├── CategoryFilter.jsx# Implements the product category filtering.
│ │ ├── CartItem.jsx # Displays a single item in the shopping cart.
│ │ ├── Login.jsx # Handles the user login logic.
│ │ ├── PrivateRoute.jsx # Protects the routes that need authentication.
│ │ ├── Layout.jsx # Wraps every page with the same layout.
│ │ └── Header.jsx # Renders the header component with the navigation.
│ ├── contexts/ # Contains the application context.
│ │ └── AuthContext.jsx # Provides the user authentication context.
│ ├── hooks/ # Contains all the custom React hooks.
│ │ └── useAuth.jsx # Hook for authentication context.
│ ├── pages/ # Contains the components for every page.
│ │ ├── Home.jsx # Displays product listings.
│ │ ├── ProductPage.jsx # Displays details for a specific product.
│ │ ├── Cart.jsx # Displays and handles shopping cart logic.
│ │ └── LoginPage.jsx # Displays the login form.
│ ├── utils/ # Contains utility functions.
│ │ └── api.js # Contains the API calling logic.
│ ├── App.jsx # Main React application component.
│ ├── index.js # Entry point of the application.
│ └── ... # Other files
├── package.json # Stores project settings and dependencies.
├── package-lock.json # Keeps track of specific dependency versions.
├── tailwind.config.js # Stores tailwind configuration.
└── ... # Other configuration files.

*   **`src/components`**: This directory contains all the reusable React components. Components here are designed to be modular and are used across multiple pages.
    *   **`ProductCard.jsx`**:  Responsible for displaying a single product card, including its image, title, and price. It also links to the full product page.
    *   **`ProductDetails.jsx`**: Displays the complete details of a single product, like image, title, price, and description. It also includes the "Add to Cart" or "Please Login to Add to Cart" button.
    *   **`SearchBar.jsx`**: Implements the product search functionality, which filters product listings based on user input.
    *   **`CategoryFilter.jsx`**: Provides the ability to filter products by category.
    *   **`CartItem.jsx`**: Displays a single item in the shopping cart, along with its quantity and options to change or remove it.
    *   **`Login.jsx`**: Renders the login form, handles user inputs, and integrates with the Fake Store API for user authentication.
    *   **`PrivateRoute.jsx`**: A utility component to protect specific routes that require user authentication.
    *   **`Layout.jsx`**: A component to wrap every page to provide consistent UI elements like header.
    *  **`Header.jsx`**: Renders the header with all the navigation buttons.
*   **`src/contexts`**: Contains all the application context.
    *   **`AuthContext.jsx`**: Manages the authentication state of the user, providing the login, logout and user data to the app.
*   **`src/hooks`**: Contains all the custom React Hooks.
    *   **`useAuth.jsx`**: A custom hook to access the user authentication context.
*   **`src/pages`**: This folder contains components that represent each page of the application.
    *   **`Home.jsx`**: The main page that displays all available products. It also includes the search bar and category filter.
    *   **`ProductPage.jsx`**: Displays the detailed view for a specific product.
    *  **`Cart.jsx`**: Displays the shopping cart where users can see their items, update the quantity and proceed to checkout.
    *   **`LoginPage.jsx`**: The login page for the app.
*   **`src/utils`**:  This directory contains utility functions for the project.
    *   **`api.js`**: Encapsulates the logic for making API requests to the Fake Store API, keeping API calls centralized.
*   **`src/App.jsx`**: The main component of the application. This file sets up routes, wraps everything with the `AuthProvider` for authentication, and renders the layout.
*   **`src/index.js`**: The entry point of the application where we bootstrap the application.

## Detailed Testing Instructions

The application includes a comprehensive set of unit and integration tests to ensure all components and interactions work as intended. Tests are written using Jest and React Testing Library.

To run the tests:

1.  Open your terminal in the project's root directory.
2.  Execute the following command:

    ```bash
    npm test
    ```
    This will run all tests present in the `__tests__` directory or `.test.jsx` files.

*   **Unit Tests:**  Unit tests are designed to test individual React components in isolation. These tests focus on rendering the UI elements, handling user interactions, and state changes of specific components.
*   **Integration Tests:** Integration tests verify interactions between components and different modules within the application.

## API Endpoints Reference

The application interacts with the following Fake Store API endpoints:

*   **Fetch all Products:**
    *   `GET https://fakestoreapi.com/products`
    *   This endpoint is used to retrieve all products for the home page display.
*   **Fetch a Single Product:**
    *   `GET https://fakestoreapi.com/products/{id}`
    *   Used to get all the details of a product in the Product Details page.
*   **Fetch Product Categories:**
    *   `GET https://fakestoreapi.com/products/categories`
    *    Used to retrieve the available product categories for the category filter.
*   **Fetch Products by Category:**
    *  `GET https://fakestoreapi.com/products/category/{category}`
    *   Used to fetch products inside a specific category.
*   **User Login:**
    *   `POST https://fakestoreapi.com/auth/login`
    *   Used to authenticate a user by sending username and password.

## User Login Credentials

For testing and development purposes, the application provides a mock user that you can use to login:

*   **Username:** `mor_2314`
*   **Password:** `83r5^_`

## Licensing Information

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute this code.