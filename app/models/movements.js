var db = require("./db").db;
var movements = {
  get: function(callback) {
    var sql = 'SELECT * FROM movements';
    db.query(sql, function(err, rows) {
        console.log(callback);
        if(err) {
          console.log("ERROR:model/movements/get", err);
          callback({result: false});
        } else {
          console.log(rows);
          callback({result: true, data: rows});    
        }
    });
  },
};
module.exports = movements;