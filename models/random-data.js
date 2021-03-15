const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const schema = new Schema({
    string: { type: String, required: [true, 'String is required.'] },
    type: { type: String, enum: ['type1', 'type2', 'type3'] },
    created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('randomData', schema);