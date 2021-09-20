const { DateTime } = require("luxon");

function ctime() {
    return DateTime.now().setZone('Asia/Taipei').c;
}

module.exports = {
    ctime: ctime,
}