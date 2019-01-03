const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    let now = new Date().toString();
    console.log(now);
    let log = `${now} ${req.method}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log(err);
    });
    next();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle : 'Page Title',
        welcomeMassage : 'Welcome',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'Page Title',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMassage : 'error'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});