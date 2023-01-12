const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || process.argv[2] || 3000;

app.use(express.static(path.join(__dirname, './public')));

app.listen(PORT, () => {
	console.log(
		`The server(${process.pid}) is now running on http://localhost:${PORT}`
	);
});
