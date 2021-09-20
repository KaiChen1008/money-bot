const fs = require('fs');
const {RECORD_FILE} = require('./param');
const {ctime} = require('./utils/utils');

const regex = new RegExp('(?<item>.+)[:：](?<price>\\d+)');
/*
prcie: \d+ : number, at least one, 
item: \\w: A-Z a-z 0-9
item: \\u4e00-\\u9fa5: Chinese Character
item: + : at least one
*/

function record(text) {
  var data = regex.exec(text);
  if (data == null) 
    return 'Cannot parse data';
  else 
    data = data.groups;

  var c = ctime();

  var content = `${c.year}, ${c.month}, ${c.day}, ${c.hour}, ${c.minute}, ${data.item}, ${data.price}\n`;
  try {
    const req = fs.writeFileSync(RECORD_FILE, content, {flag: 'a+'});
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