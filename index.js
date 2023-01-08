const path = require('path');
    //"dev": "nodemon index.js"

const express = require('express');

const app = express();


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//app.use(require('./archives'));
 
/*
// Routes
app.use(require('./routes/index'));

app.use('/public', express.static( 'public'));      //esto agrega todo lo que es css y js
app.use('/generador.html', express.static( 'generador.html'));      //esto agrega todo lo que es css y js
*/

app.get('/' , (request, response) => {

    response.sendFile(path.resolve(__dirname , "./archives/index.html"))

});
const port = process.env.PORT || 4000;

app.listen(port);
console.log('Server on port', port);
