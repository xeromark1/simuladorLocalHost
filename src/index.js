const path = require('path');

const express = require('express');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/index'));

app.use('/public', express.static( 'public'));      //esto agrega todo lo que es css y js
app.use('/generador.html', express.static( 'generador.html'));      //esto agrega todo lo que es css y js

app.get('/' , (request, response) => {

    response.sendFile(path.resolve(__dirname , "../index.html"))


});



app.listen(4000);
console.log('Server on port', 4000);