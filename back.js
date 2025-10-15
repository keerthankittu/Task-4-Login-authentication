const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// In-memory users array
const users = [
    { email: 'test@example.com', password: 'password123' }
];

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front.html'));
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        return res.json({ message: 'Login successful' });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
});

// Registration endpoint
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const exists = users.find(u => u.email === email);
    if (exists) {
        return res.status(409).json({ message: 'Email already registered' });
    }

    // Add new user
    users.push({ email, password });
    return res.json({ message: 'Registration successful' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
