var express     = require('express');           // call express
var app         = express();                    // define our app using express
var flights     = require('./db/Flights_Full.json');
var port        = process.env.PORT || 8080;     // set our port
var _           = require("underscore");
var cors        = require('cors');
var basicAuth   = require('basic-auth');
app.use(cors());

var auth = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    }
    var user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }
    if (user.name === 'foo' && user.pass === 'bar') {
        return next();
    } else {
        return unauthorized(res);
    }
};
app.get('/carriers', function(req, res){
    var carriersSort = [];
    for (var i=0; i<flights.length; i++){
        var carriersAll = _.omit(flights[i], 'carrier_id', 'id', 'flight_number_start', 'flight_number_end', 'operational_suffix');
        carriersSort.push(carriersAll)
    }
    res.json(carriersSort);
});

app.get('/flight_subscriptions/:carrier_code', auth, function(req, res) {
    var flights2 = _.where(flights, {carrier_code: req.params.carrier_code});
        if(flights2.length > 0){
            res.json(flights2)
        }else{
            res.send('Page not Found\n', 404);
        }
});

app.get('*', function(req, res){
    res.send('Page not Found\n', 404);
});

app.listen(port);                       // START THE SERVER
console.log('Magic happens on port ' + port);
