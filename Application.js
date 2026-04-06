const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: String,
    email: String
});

module.exports = mongoose.model('Application', applicationSchema);