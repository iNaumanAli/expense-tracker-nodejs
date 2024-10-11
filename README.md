# Expense Tracker

## Overview

The Expense Tracker is a web application that allows users to manage their daily expenses efficiently. Users can add, view, and categorize their expenses, making it easier to keep track of their financial activities.

## Features

- **User-Friendly Interface**: A clean and responsive design that allows users to easily input and manage their expenses.
- **Expense Management**:
  - **Add Expenses**: Users can enter details such as title, amount, date, category, and optional notes for each expense.
  - **View Expenses**: A list of all recorded expenses is displayed, organized by date.
- **Backend Integration**:
  - Connects to a MySQL database to store and retrieve expense data.
  - Handles form submissions securely using POST requests.
- **Real-Time Feedback**: Users receive immediate feedback on successful or failed operations through alerts.

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MySQL
- dotenv (for managing environment variables)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/iNaumanAli/expense-tracker-nodejs.git
   cd expense-tracker-nodejs
   
2. **Install dependencies**:
   ```bash
   npm install

3. **Setup the database**:
   - Create a MySQL database named expenses_db.
   - Run the following SQL command to create the necessary table:
     ```sql
     CREATE TABLE expenses (
     id INT AUTO_INCREMENT PRIMARY KEY,
     expense_title VARCHAR(255) NOT NULL,
     expense_date DATE NOT NULL,
     category ENUM('groceries', 'rent', 'utilities', 'entertainment', 'transport', 'others'),
     amount DECIMAL(10, 2) NOT NULL,
     notes TEXT
     );
4. **Create a .env file in the root directory with the following content**:
   ```text
   DB_HOST='localhost'
   DB_USER='your_mysql_username'
   DB_PASSWORD='your_mysql_password'
   DB_NAME='expenses_db'

5. **Run the application**:
    ```bash
    node server.js
    
6. **Access the application**:
   - Open your web browser and go to http://localhost:3000/.


## Usage

- Users can add an expense by filling in the form fields and submitting the information.
- The expenses will be listed below the form, showing the most recent entries at the top.

## Contribution

Contributions are welcome! If you'd like to contribute, please follow these steps:

- Fork the repository.
- Create a new branch (git checkout -b feature-YourFeature).
- Make your changes and commit them (git commit -m 'Add some feature').
- Push to the branch (git push origin feature-YourFeature).
- Open a pull request
