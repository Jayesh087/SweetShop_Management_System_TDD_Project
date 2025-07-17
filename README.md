
# Sweet Shop Management System

This project is a Sweet Shop Management System that helps manage the sweets inventory, sales, and stock restocking. The system allows users to add, delete, search, purchase, and restock sweets.

## Getting Started

To get started with the project, first, clone the repository and install the necessary dependencies:

### `git clone https://github.com/Jayesh087/SweetShop_Management_System_TDD_Project.git`
Clone the repository to your local machine.

### `cd SweetShop_Management_System_TDD_Project`
Navigate to the project directory.

### `npm install`
Install all the required dependencies.

## Available API Endpoints

In the project, you can interact with the following API endpoints:

### `POST /api/v1/Sweet/addNewSweet`
Adds a new sweet to the shop's inventory.

**Request Body:**
```json
{
    "name": "Kaju Katli",
    "category": "Nut-Based",
    "price": 50,
    "availableStock": 20
}
```
**Response:**
```json
{
    "message": "Sweet added successfully",
    "success": true,
    "sweet": {
        "name": "Kaju Katli",
        "category": "Nut-Based",
        "price": 50,
        "availableStock": 20
    }
}
```

### `POST /api/v1/Sweet/deleteSweet`
Deletes a sweet from the shop's inventory.

**Request Body:**
```json
{
    "sweetId": "1001"
}
```
**Response:**
```json
{
    "message": "Sweet deleted successfully"
}
```

### `POST /api/v1/Sweet/purchaseSweet`
Purchases a sweet from the shop.

**Request Body:**
```json
{
    "sweetId": "1001",
    "quantity": 2
}
```
**Response:**
```json
{
    "message": "Sweet purchased successfully",
    "updatedSweet": {
        "name": "Kaju-Katli",
        "category": "Nut-Based",
        "price": 50,
        "availableStock": 18
    }
}
```

### `POST /api/v1/Sweet/restockSweet`
Restocks a sweet in the shop's inventory.

**Request Body:**
```json
{
    "sweetId": "1001",
    "quantity": 5
}
```
**Response:**
```json
{
    "message": "Sweet restocked successfully",
    "updatedSweet": {
        "name": "Kaju-Katli",
        "category": "Nut-Based",
        "price": 50,
        "availableStock": 23
    }
}
```

### `GET /api/v1/Sweet/viewAllSweets`
Retrieves a list of all sweets in the shop.

**Response:**
```json
{
    "allSweets": [
        {
            "name": "Kaju-Katli",
            "category": "Nut-Based",
            "price": 50,
            "availableStock": 23
        }
    ]
}
```

### `GET /api/v1/Sweet/viewAvailableSweets`
Retrieves a list of sweets that are currently available for purchase.

**Response:**
```json
{
    "availableSweets": [
        {
            "name": "Kaju-Katli",
            "category": "Nut-Based",
            "price": 50,
            "availableStock": 23
        }
    ]
}
```

## All testCase Are Passed 

<img width="514" height="150" alt="Screenshot 2025-07-17 130926" src="https://github.com/user-attachments/assets/cb1b2d0d-dfd7-48b8-98d3-e18595581858" />

