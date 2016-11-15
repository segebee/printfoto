var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/test');

var User = mongoose.model('User', { name: String, email: String, password: String, role: String, phone: String, address: String, state: String, lga: String, created: String });
var Order = mongoose.model('Order', { orderId: String, category: String, products: String, qty: String, state: String, lga: String, amount: String, status: String, paid: String, created: String });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routing
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/login',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   function(req, res){
  res.render('login', { title: 'PrintFoto | Login',bodyClass: "login-page" });
});

// get all users
app.get('/api/users', function(req, res) {
    // use mongoose to get all users in the database
    User.find(function(err, users) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) res.send(err);
        res.json(users); // return all todos in JSON format
    });
});

// get all users
app.get('/api/orders', function(req, res) {
    // use mongoose to get all users in the database
    Order.find(function(err, orders) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) res.send(err);
        res.json(orders); // return all todos in JSON format
    });
});

// create user
app.post('/api/create_user', function(req, res) {
  //user details
  var user = new User({ name: "Dele Abis", email: "sege5@gmail.com", password: "segebee#", role: "customer", phone: "08121747250", address: "UNILAG", state: "LAGOS", lga: "AGEGE", created: "1290494955" });
  user.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('user saved');
    }
  });    
});



/*app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    */

//define base controllers
/*var login = require('./app/login/controllers/login');
var orders = require('./app/orders/controllers/orders');*/
//application routing to controllers
/*app.use('/', login); //let index controller handle default route 
app.use('/orders', orders); //let index controller handle orders route */
//app.use('/users', users);

/*app.post('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");