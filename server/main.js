require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cluster = require('cluster');

const numCPUS = 2;

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use('/api', require('./src/config/routes'));

if(cluster.isMaster) {
	for(let i = 0; i < numCPUS; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		cluster.fork();
	});
} else {
	app.listen(PORT, () => console.log(`Server id ${process.pid} Listening to port ${PORT}`));
}

