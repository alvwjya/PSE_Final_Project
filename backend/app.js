const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const port = process.env.PORT || 4000;

//Initialize
dotenv.config();
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get('/', function (req, res) {
    res.send("Pervasive Backend")
})
app.use(require('./routes/device'));

//Port
app.listen(port, () => {
    console.log('Server is running on port: ', port);
});