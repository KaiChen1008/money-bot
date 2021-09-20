const lineByLine = require('n-readlines');
const {ctime} = require('./utils/utils');
const {MONTHS, RECORD_FILE} = require('./param');

let liner = null, line = null;
let total = 0;
let curr  = null;

function parseData(line) {
  const recordRegex = new RegExp('(?<year>\\d+), (?<month>\\d+), (?<day>\\d+), (?<hour>\\d+), (?<minute>\\d+), (?<item>.+), (?<price>\\d+)');
  var data = recordRegex.exec(line);
    if (data == null) {
      console.error("Record file is broken");
      console.error(line);
      // TODO: We shall let user know that the data is broken and the result may not be correct.
    }else {
      data = data.groups;
    }
  return data;
}

function initialize() {
  liner = new lineByLine(RECORD_FILE);
  line  = null;
  total = 0;
  curr = ctime();
}

/**
* Calculate monthly expense
*/
function sumMonthlyExpense() {
  initialize();
  var lastDay = null, dayCount = 0;
  var data;
  // get all record
  while (line = liner.next()) {
    data = parseData(line.toString());
    if (data == null) continue;

    if (data.year == curr.year && data.month == curr.month) {
      total += parseInt(data.price);
    }

    if (lastDay != data.day) {
      ++dayCount;
      lastDay = data.day;
    }
  }

  console.info(`[INFO] Total ${total} in ${MONTHS[curr.month]}`);
  return `You have spent ${total} in ${MONTHS[curr.month]}, ${(total/dayCount).toFixed(2)}/day`;
}

/**
* Calculate daily expense
*/
function sumDailyExpense() {
  initialize();
  var data;
  // get all recor
  while (line = liner.next()) {
    data = parseData(line.toString());
    if (data == null) continue;

    if (data.year == curr.year && data.month == curr.month && data.day == curr.day) {
      total += parseInt(data.price);
    }
  }

  console.info(`[INFO] Total ${total} Today`);
  return `You have spent ${total} Today`;
}

module.exports = {
  sumMonthlyExpense: sumMonthlyExpense,
  sumDailyExpense: sumDailyExpense,
}   