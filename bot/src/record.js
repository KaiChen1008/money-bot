const fs = require('fs');
const { DateTime } = require("luxon");
const {RECORD_FILE} = require('./param');


function record(text) {
  var item, price;
  // TODO: Use Regrex
  if (text.includes("：")) {
    [item, price] = text.split("：");
  }else {
    [item, price] = text.split(":");
  }
  
  var t = DateTime.now().setZone('Asia/Taipei').c;
  if (item == undefined || price == undefined){
    return 'Cannot parse data';
  }

  const content = `${t.year}, ${t.month}, ${t.day}, ${t.hour}, ${t.minute}, ${item}, ${price}\n`;
  try {
    const req = fs.writeFileSync(RECORD_FILE, content, {flag: 'a+'});
    //file written successfully
  } catch (err) {
    console.error(err)
    return "fail";
  }

  console.info(`[INFO] Write: ${content}`);
  return 'sussesful';
}

module.exports = {
  record:record,
}