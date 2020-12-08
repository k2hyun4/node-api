const { SSL_OP_NO_TLSv1_1 } = require('constants');
const fs = require('fs');

//const data = fs.readFileSync('./data.txt', 'utf8');
//console.log(data);

const data = fs.readFile('./data.txt', 'utf8', function(err, data) {
    console.log(data);
})

for (var i = 0; i < 10; i++) {
    console.log(i);
}