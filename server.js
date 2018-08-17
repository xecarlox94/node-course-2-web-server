const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getFullYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to File');
    }
  });

  next();
});

// app.use((req, res, next) => res.render('maintenance.hbs'));

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  // res.send('<h1>Hello World!</h1>');
  // res.send({
  //   name: 'Jose Fernandes',
  //   likes: [
  //     'Football',
  //     'Programming',
  //     'movies'
  //   ]
  // })

  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Some Website'
  })
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});



app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error handling route'
  });
});


app.listen( port, () => {
  console.log(`Server is up on port 3000 ${port}`);
});
