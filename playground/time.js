const moment = require('moment');

// const date = new Date();
// console.log(date.getMonth());

// const date = moment();
// date.subtract(1, 'year')
//
// console.log(date.format('MMM Do, YYYY'));


var date = moment();
console.log(date.format('h:mm a'));

var createdAt = 234235;
var date2 = moment(createdAt)
console.log(date2);
