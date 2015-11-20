var db = require("./db").db;
var categories = {
  get: function(callback) {
    var sql = 'SELECT * FROM movements_categories';
    db.query(sql, function(err, rows) {
        if(err) {
          console.log("ERROR:model/movements/getCategories", err);
          callback({result: false});
        } else {
          callback({result: true, data: rows});    
        }
    });  
  }
};
module.exports = categories;