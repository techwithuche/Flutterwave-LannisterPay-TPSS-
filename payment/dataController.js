const dataSch = require('./dataSchema');
const Config = require('./dataConfig');
const Calculate = require('../helpers/calculation');
const httpStatus = require('http-status');
const Helper = require('../helpers/response');


const dataController = {};


dataController.Payment = async (req, res, next) => {
  
  let { ID, Balance, SplitBreakdown } = Calculate.Data(req.body); 
  
  const Transaction = new dataSch({ ID, Balance, SplitBreakdown });

  const data = await Transaction.save();

  const { payload } = await dataController.validLoginResponse(req, data, next);
  
  return Helper.sendResponse(res, httpStatus.OK, true, payload, null, null, );
    
  }

  dataController.validLoginResponse = async (req, data, next) => {
    try {

      const payload = {
        ID: data._id,
        Balance: data.Balance, 
        SplitBreakdown: data.SplitBreakdown
      };
  
      
      return { payload };
    } catch (err) {
      next(err);
    }
  };
  




module.exports = dataController;