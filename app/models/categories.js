var db = require("./db").db;
var categories = {
  
  get: function(callback) {
    var sql = 'SELECT * FROM movements_categories';
    db.query(sql, function(err, rows) {
        console.log(callback);
        if(err) {
          console.log("ERROR:model/categories/get", err);
          callback({result: false});
        } else {
          callback({result: true, data: rows});    
        }
    });
  }};

module.exports = categories;