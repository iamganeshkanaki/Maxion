const express = require('express');
const app = express();
const port = 3000;

// In-memory database for storing user information
let users = [];

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.post('/register', (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    // Check if email already exists
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'Email already registered' });
    }

    // Add new user
    users.push({ firstname, lastname, email, password });
    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
