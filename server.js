const express = require('express');
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const app = express();



//middleware so the app can accept data
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//links to routes files
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
//access to the html and css
app.use(express.static('public'));

//listens to for the server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});