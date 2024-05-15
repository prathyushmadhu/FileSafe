const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: {type: String, required: true},
    size: {type: Number, required: true},
    type: {type: String, required: true},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    data: {type: String, required: true}
});

const File = mongoose.model('File', fileSchema);

module.exports = File;