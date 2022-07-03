'use strict';
const Helper = {};

Helper.sendResponse = (res, status, success, data, errors, msg) => {
    const response = {};
    if (success !== null) response.success = success;
    if (data !== null) response.data = data;
    if (errors !== null) response.errors = errors;
    if (msg !== null) response.msg = msg;

    return res.status(status).json(response);
  };


  Helper.validation = (data, validationArray) => {
    let errors = {};
    validationArray.forEach(validationObj => {
      let value = data[validationObj.field];
      value = !isEmpty(value) ? value + '' : '';
      const validation = validationObj.validate;
      for (let i = 0; i < validation.length; i++) {
        const val = validation[i];
        switch (val.condition) {
          case 'IsEmpty':
            if (Validator.isEmpty(value)) {
              errors[validationObj.field] = val.msg;
            }
            break;
          case 'IsLength':
            if (val.option) {
              if (!Validator.isLength(value, val.option)) {
                errors[validationObj.field] = val.msg;
              }
            }
            break;
          default:
            break;
        }
        if (errors[validationObj.field]) {
          i = validation.length;
        }
      }
    });
    return errors;
  };


  module.exports = Helper;