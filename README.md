## Requirements

- Node.js
- npm (Node Package Manager)

## Installation

1. **Clone the repository**:
   ```
   git clone https://github.com/Nandeeswar7/product-manager.git
   cd product-manager
   ```  

2. **Start back end**:  
   Navigate to api directory 
   ```
   cd api
   npm i
   npm start
   ``` 

   The backend will run on http://localhost:4000.  

3. **Start front end**:  
   Open a new terminal and navigate to web directory 
   ```
   cd web
   npm i
   npm start
   ``` 

   The frontend will run on http://localhost:3000.

## Features

This application includes the following features:

### Frontend

1. **Product Search**:
   - Users can search for products by title, category, or brand using a search bar.
   - The search is debounced for better performance, updating the results only after the user stops typing.

2. **Pagination**:
   - Displays products in a paginated format, with a maximum of 10 products per page.
   - Users can navigate through multiple pages, with the ability to jump to the first or last page using arrows.

3. **Delete Selected Products**:
   - Users can select individual product rows using checkboxes.
   - A checkbox at the top allows users to select or deselect all visible rows at once.
   - Users can delete multiple selected products with a single click using the "Delete Selected" button.
   - 
5. **Responsive Design**:
   - The layout adjusts for different screen sizes, hiding the product description on smaller screens for a cleaner interface.

6. **Product Table**:
   - A visually appealing table displays product details, including title, category, brand, rating, and price.

### Backend

A simple node server with one endpoint /products  
Returns data from https://dummyjson.com/products



