// const express = require('express');
// const bodyParser = require('body-parser');
// const mailRoutes = require('./routes/mail');
// require('dotenv').config();

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use('/send-mail', mailRoutes);

// // Start the server
// app.listen(PORT, () => {
//     console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mailRoutes = require('./routes/mail');
// require('dotenv').config();

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(cors({
//     origin: [
//         'https://shilpgroup.com',
//         'https://mail.shilpgroup.com'
//     ], // Allowed domains
//     methods: ['GET', 'POST'], // Allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
// }));

// app.use(bodyParser.json());
// app.use('/send-mail', mailRoutes);

// // Start the server
// app.listen(PORT, () => {
//     console.log(`🚀 Server is running at http://localhost:${PORT}`);
// });



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mailRoutes = require('./routes/mail');
require('dotenv').config();

const app = express();
const PORT = 3000;

// CORS Configuration
app.use(cors({
    origin: [
        'https://shilpgroup.com',
        'https://mail.shilpgroup.com'
    ],
    methods: ['GET', 'POST', 'OPTIONS'], // Include OPTIONS for preflight
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
    credentials: true // Allow cookies and credentials if needed
}));

// Handle preflight requests explicitly
app.options('*', cors()); // Enable CORS for preflight (OPTIONS)

// Middleware
app.use(bodyParser.json());
app.use('/send-mail', mailRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
