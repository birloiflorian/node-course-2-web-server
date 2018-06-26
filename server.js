const express = require('express');
//handlebars
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//register middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

//not calling next will block the future requests
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
//set the path towards the static data -> dirname is the current directory
// if this is before maintenance page this page wont be private
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

//create a helper with arguments
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//create first route
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    //send data response
    // res.send({
    //     name: 'Florian',
    //     likes: [
    //         'Biking',
    //         'Making Money'
    //     ]
    // })

    //render using params
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Hi i am Florian, welcome to my web page'
    });
});

//create a new route
app.get('/about', (req, res) => {
    //render cerain page
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    })
});

// /bad - send back json wit errorMessage
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "This is not working"
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
