
const dateFormatValidator = (date) => {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormatRegex.test(date);
  }
  
  module.exports = {
      dateFormatValidator: dateFormatValidator
  }