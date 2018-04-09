const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

const app = express();
// Middleware to use publicPath
app.use(express.static(publicPath));

// Routes
app.get('/', (req, res) => {
	res.render('index');
});

// Port
const port = process.env.PORT || 3000;

// Server Listens
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
