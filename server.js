const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // Change if using another username
    password: "",   // Add your MySQL password if needed
    database: "cafeteria_db"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: ", err);
    } else {
        console.log("Connected to MySQL");
    }
});

// Admin Login Route
app.post("/admin_login", (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM admin WHERE username = ? AND password = ?";
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error("Database error: ", err);
            return res.status(500).json({ message: "Server error. Try again later." });
        }

        if (results.length > 0) {
            return res.json({ success: true, message: "Login successful!" });
        } else {
            return res.status(401).json({ message: "Invalid username or password." });
        }
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



