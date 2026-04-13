const express = require('express');
const app = express();
const port = 3030; // CHANGED TO 3030 TO BYPASS ZOMBIE SERVERS

// Basic Authentication Middleware
const basicAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).json({ message: 'Group 6 says: Unauthorized. Please provide credentials.' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = decodedCredentials.split(':');

    if (username === 'admin' && password === 'secret123') {
        next(); 
    } else {
        res.setHeader('WWW-Authenticate', 'Basic');
        return res.status(401).json({ message: 'Invalid username or password.' });
    }
};

// Protect this route with the middleware
app.get('/api/secure-data', basicAuthMiddleware, (req, res) => {
    res.json({
        status: "Success!",
        message: "Welcome to the Group 6 Basic Authentication Demo. You have successfully authenticated."
    });
});

app.listen(port, () => {
    console.log(`\n=========================================`);
    console.log(`✅ SUCCESS! The server actually updated!`);
    console.log(`🔌 Group 6 Server running on port ${port}`);
    console.log(`=========================================\n`);
});