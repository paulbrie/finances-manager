module.exports = function(app) {
  var config = require('../config/api');
  var api = require('../controllers/api')(app);
  
  app.get('/api/:resource/:method/:param1/:param2', api.index);
  app.get('/api/:resource/:method/:param1', api.index);
  app.get('/api/:resource/:method', api.index);
  app.post('/api/:resource/:method', api.index);
};