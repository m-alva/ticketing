const fs = require('fs');

var file = fs.readFileSync('all.css');

console.debug(file,"utf8");
