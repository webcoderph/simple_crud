require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

const app = express();
const PORT = process.env.PORT || 3030

app.use(cors());
app.use(express.json())
app.use(morgan('combined'))
app.use('/api', require('./src/config/routes'));


app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
