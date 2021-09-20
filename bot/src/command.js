const fs = require('fs');
const lineByLine = require('n-readlines');
const { DateTime } = require("luxon");
const {MONTHS, RECORD_FILE} = require('./param');

let currYear;
let currMonth;
let currDay;
let total = 0;
let line = null;
let liner;
/**
* Calculate monthly expense
*/
function sumMonthlyExpense() {
    liner = new lineByLine(RECORD_FILE);
    total = 0;
		var c = DateTime.now().setZone('Asia/Taipei').c
    currMonth = c.month;
		currYear  = c.year;
    var y,m,d,h,min,item,price;
    var _d = null;
    var countD = 0;
  
    // get all record
    while (line = liner.next()) {
      line = line.toString();
      [y,m,d,h,min,item,price] = line.split(",");
      if (m == currMonth) {
        total += parseInt(price);
      }
  
      if (_d == null || d != _d) {
        countD ++;
        _d = d;
      }
    }
  
    console.info(`[INFO] Total ${total} in ${MONTHS[parseInt(m)]}`);
    return `You have spent ${total} in ${MONTHS[parseInt(m)]}, ${(total/countD).toFixed(2)}/day`;
}

/**
* Calculate daily expense
*/
function sumDailyExpense() {
	liner = new lineByLine(RECORD_FILE);
	total = 0;
	var c = DateTime.now().setZone('Asia/Taipei').c;
	currMonth = c.month;
	currDay   = c.day;
	currYear  = c.year;

	var y,m,d,h,min,item,price;

	// get all record
	while (line = liner.next()) {
		line = line.toString();
		[y,m,d,h,min,item,price] = line.split(",");
		if (y == currYear && m == currMonth && d == currDay) {
			total += parseInt(price);
		}
	}

	console.info(`[INFO] Total ${total} Today`);
	return `You have spent ${total} Today`;
}



module.exports = {
  sumMonthlyExpense: sumMonthlyExpense,
	sumDailyExpense: sumDailyExpense,
}   