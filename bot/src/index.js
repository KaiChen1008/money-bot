const {sumMonthlyExpense, sumDailyExpense} = require('./command');
const {record} = require('./record');


function executeCommand(text) {
  let command = text.substring(1,);
  var res = '';
  if (command.includes('month')) {
    return sumMonthlyExpense();
  } else if (command.includes('day')) {
    return sumDailyExpense();
  }else {
    return `invalid command: ${text}`;
  }
}

module.exports = async function App(context) {
  // await context.sendText('Welcome to Bottender');

  if (context.event.isText) {
    var res = '';
    if (context.event.text.includes('!') || context.event.text.includes('！')){
      res = executeCommand(context.event.text);
    }else{
      res = record(context.event.text);
    }
    await context.sendText(res);
  }
};
