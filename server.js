const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MySQL database connection setup
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Serve static HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');  // Ensure index.html is in the same folder as server.js
});

// Handle form submission and insert data into MySQL database
app.post('/submit-expense', (req, res) => {
    const { 
        'expense-title': expense_title, 
        'expense-date': expense_date, 
        'expense-category': category, 
        'expense-amount': amount, 
        'expense-notes': notes 
    } = req.body;

    // Check for null or empty title
    if (!expense_title) {
        return res.status(400).send('Expense title cannot be empty');
    }

    // Prepare the expense data to insert
    const expense = {
        expense_title: expense_title,
        expense_date: expense_date,
        category: category,
        amount: parseFloat(amount).toFixed(2),
        notes: notes || null
    };

    const sql = 'INSERT INTO expenses (expense_title, expense_date, category, amount, notes) VALUES (?, ?, ?, ?, ?)';
    const values = [expense.expense_title, expense.expense_date, expense.category, expense.amount, expense.notes];

    connection.query(sql, values, (err, result) => { // Changed from db.query to connection.query
        if (err) {
            console.error('Error inserting data into database:', err);
            res.status(500).send('Database error');
        } else {
            res.send('Expense submitted successfully');
        }
    });
});

// Route to retrieve expenses from the database
app.get('/get-expenses', (req, res) => {
    const query = 'SELECT * FROM expenses ORDER BY expense_date DESC';
    connection.query(query, (err, results) => { // Changed from db.query to connection.query
        if (err) {
            console.error('Error fetching expenses:', err);
            res.status(500).send('Error fetching expenses data!');
            return;
        }
        res.json(results);
    });
});

// Start the server listening on all network interfaces
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running and accessible at http://localhost:${port}/`);
});
