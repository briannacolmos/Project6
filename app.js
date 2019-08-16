const express = require('express');
// const pug = require('pug');
// const path = require('path');
// const bodyParser = require('body-parser');
let data = require('./data.json');
const projects = data.projects
const app = express();
// app.use(bodyParser.urlencoded({ extended: false}));

// Set pug
app.set('view engine', 'pug');
// Set static route
app.use('/static', express.static('public'));

// Index route
app.get('/', (req, res) => {
  res.render('index', { projects: projects });
});

// About route
app.get("/about", (req, res)=> {
  res.render('about');
});

// Project route with ID param
app.get("/projects/:id", (req, res) => {
  const id = req.params.id;
  const project = projects[id];
  res.render('project', {project});
});

//Error message handler and sets status 
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

//locals that are passed to the PUG template
app.use((err, req, res, next) => {
  res.locals.error = err;
  let status = err.status;
  if (status === 'undefined') {
    status = 500;
    res.status(status);
  } 
  res.render('error');
});
  
//   // Console Log
//   //console.error('Error message:', err.message, ', Error status:', err.status)

//   // Error Page
//   res.status(status);
//   res.render('error');
// });

// App listen
app.listen(3000, () => {
 console.log('The App is listening to losthost: 3000')
});
