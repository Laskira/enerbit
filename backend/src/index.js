const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
const path = require('path');

const app = express();

// Database connection
const { mongoose } = require('./database'); 

// Settings 
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/inventario', require('./routes/inventario.routes'));
app.use('', require('./routes/login.routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));;

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});