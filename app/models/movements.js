var db = require("./db").db;
var movements = {
  
  get: function(callback) {
    var sql = 'SELECT * FROM movements where valid = 1';
    db.query(sql, function(err, rows) {
        console.log(callback);
        if(err) {
          console.log("ERROR:model/movements/get", err);
          callback({result: false});
        } else {
          callback({result: true, data: rows});    
        }
    });
  },
  
  add: function(callback, args) {
    var movement  = { 
      date: args.date,
      title: args.title,
      description: args.description,
      type: args
    };
    
    db.query('INSERT INTO movements SET ?', movement, function(err, result) {
      if(err) {
        console.log("ERROR:model/movements/add", err);
        callback({result: false, msg: err});  
      } else {
        callback({result: true, data: {insertId: result.insertId}});   
      }
    });
  },
  
  add: function(callback, args) {
    var movement  = { 
      date: args.date,
      from: args.from,
      to: args.to,
      amount: args.amount,
      title: args.title,
      description: args.description,
      type: args.type
    };
    
    db.query('INSERT INTO movements SET ?', movement, function(err, result) {
      if(err) {
        console.log("ERROR:model/movements/add", err);
        callback({result: false, msg: err});  
      } else {
        callback({result: true, data: {insertId: result.insertId}});   
      }
    });
  },
  
  update: function(callback, args) {
    var movement  = { 
      date: args.date,
      from: args.from,
      to: args.to,
      amount: args.amount,
      title: args.title,
      description: args.description,
      type: args.type
    };
    
    console.log(movement);
    
    db.query('UPDATE movements SET ? WHERE id = ' + parseInt(args.id), movement, function(err, result) {
      if(err) {
        console.log("ERROR:model/movements/add", err);
        callback({result: false, msg: err});  
      } else {
        callback({result: true, data: result});   
      }
    });
  }
};

module.exports = movements;