const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Post Job
router.post('/create', async (req, res) => {
    const job = new Job(req.body);
    await job.save();
    res.json({ message: "Job created" });
});

// Get Jobs
router.get('/', async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
});

module.exports = router;