const express = require('express');
const itemsRouter = require('./routes/items')
const app = express();
const cors = require('cors');

app.use(cors());

// Init middleware
app.use(express.json({extended:false}));

// Define routes
app.use('/api/items', itemsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));