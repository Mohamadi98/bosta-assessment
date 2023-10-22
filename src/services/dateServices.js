const moment = require('moment-timezone');

const dateFormatValidator = (date) => {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormatRegex.test(date);
}

const checkDatePassed = (inputDate) => {
    const currentDate = moment().startOf('day');
    const dateToCheck = moment(inputDate, 'YYYY-MM-DD').startOf('day');
  
    return dateToCheck.isBefore(currentDate);
  }

module.exports = {
    dateFormatValidator: dateFormatValidator,
    checkDatePassed: checkDatePassed
}