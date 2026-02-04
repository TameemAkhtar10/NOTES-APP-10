let monoose = require('mongoose');
let notesSchema = new monoose.Schema({
    title: String,
    content: String
});
let Notes = monoose.model('Notes10', notesSchema);
module.exports = Notes;