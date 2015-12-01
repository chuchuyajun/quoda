var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mustache = require('mustache');
var mustacheExpress = require('mustache-express');
var ejs = require('ejs');
var sunTzu = require('sun-tzu-quotes')



// YODA STUFF
var YodaSpeak = require('yoda-speak');
var yoda = new YodaSpeak("Xex9aAhpbNmshSAENJbMzAOoMJZ8p1A4WXfjsnBaE1N6oHtetL");

// yoda.convert("I'm really happy for you, and I'm going to let you finish, but this is the best Node package of all time.",
yoda.convert(sunTzu(),
function(err, result) {
    if (!err) {
        console.log(result.toString());
    } else {
        console.log(err);
    }
})
// YODA STUFF

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Register '.mustache' extension with The Mustache Express
// app.engine('mustache', mustacheExpress());

app.set('view engine', 'html');

// view engine setup
app.set('port', 3000);
// app.set('views', __dirname + '/public');
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

// set the view engine to ejs
// app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// urls
app.get('/', function(req, res) {

   res.render('index.html');
});

// EJS index page
// app.get('/', function(req, res) {
//   var YodaSpeak = require('yoda-speak');
//   var yoda = new YodaSpeak("Xex9aAhpbNmshSAENJbMzAOoMJZ8p1A4WXfjsnBaE1N6oHtetL");
//
//   var test = "test";
//   yoda.convert("I'm really happy for you, and I'm going to let you finish, but this is the best Node package of all time.",
//   function(err, result) {
//       if (!err) {
//           console.log(result.toString());
//       } else {
//           console.log(err);
//       };
//
//   res.render('public/test', {
//       test: test
//     });
//   });
// });

// Mustache page
// app.get("/", function(req, res) {
//     res.render("index.html", {
//         locals: {
//             message: "Hello World!",
//             items: ["one", "two", "three"]
//         },
//         partials: {
//             foo: "<h1>{{message}}</h1>",
//             bar: "<ul>{{#items}}<li>{{.}}</li>{{/items}}</ul>"
//         }
//     });
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});

module.exports = app;
