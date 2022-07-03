const mongoose = require('mongoose');
const schema = mongoose.Schema;


const dataSchema = new schema({

  ID: { type: String },
  Amount: { type: Number, },
  Currency: { type: String, },
  CustomerEmail: { type: String, },
  SplitInfo: [{
    SplitType: String,
    SplitValue: Number,
    SplitEntityId: String,
  }],

  Balance: { type: Number },
  SplitBreakdown: [{
    SplitEntityId: String,
    Amount: Number
  }],
});


module.exports = Data = mongoose.model('data', dataSchema);