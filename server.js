const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/freelancerDB')
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// Import Models
const User = require('./models/User');
const Job = require('./models/Job');


// =======================
// 🔐 SIGNUP API
// =======================
app.post('/signup', async (req, res) => {

    const { name, email, password } = req.body;

    const newUser = new User({
        name,
        email,
        password
    });

    await newUser.save();

    res.json({ message: "User registered successfully ✅" });
});


// =======================
// 🔐 LOGIN API (STEP 4.1)
// =======================
app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });

        if (user) {
            res.json({
                message: "Login successful ✅",
                user: user
            });
        } else {
            res.json({
                message: "Invalid email or password ❌"
            });
        }

    } catch (error) {
        res.json({
            message: "Error occurred ❌"
        });
    }
});


// =======================
// 💼 CREATE JOB
// =======================
app.post('/job', async (req, res) => {

    const { title, description, budget, userId } = req.body;

    const job = {
        title,
        description,
        budget,
        userId   // 🔥 VERY IMPORTANT
    };

    await db.collection("jobs").insertOne(job);

    res.json({ message: "Job created" });
});

// =======================
// 📋 GET ALL JOBS
// =======================
app.get('/jobs/:userId', async (req, res) => {

    const userId = req.params.userId;

    const jobs = await db.collection("jobs")
        .find({ userId: userId })
        .toArray();

    res.json(jobs);
});

// =======================
// 🚀 START SERVER
// =======================
console.log(senderId, receiverId, message);
console.log(data);
app.post('/message', async (req, res) => {

    const { senderId, receiverId, message } = req.body;

    const msg = {
        senderId,
        receiverId,
        message,
        time: new Date() // optional (timestamp)
    };

    await db.collection("messages").insertOne(msg);

    res.json({ message: "Message sent successfully" });
});
app.listen(5000, () => {
    console.log("Server running on port 5000 🚀");
});
const Application = require('./models/Application');

// Apply for job
app.post('/apply', async (req, res) => {

    const application = new Application(req.body);
    await application.save();

    res.json({ message: "Applied successfully ✅" });
});
app.post('/apply', async (req, res) => {

    const { jobId, name, proposal } = req.body;

    const application = {
        jobId,
        name,
        proposal
    };

    await db.collection("applications").insertOne(application);

    res.json({ message: "Applied successfully" });
});
app.get('/applications/:jobId', async (req, res) => {

    const jobId = req.params.jobId;

    const apps = await db.collection("applications")
        .find({ jobId: jobId })
        .toArray();

    res.json(apps);
});
const { ObjectId } = require('mongodb');

app.delete('/job/:id', async (req, res) => {

    const jobId = req.params.id;

    await db.collection("jobs").deleteOne({
        _id: new ObjectId(jobId)
    });

    res.json({ message: "Job deleted successfully" });
});
app.post('/message', async (req, res) => {

    const { senderId, receiverId, message } = req.body;

    await db.collection("messages").insertOne({
        senderId,
        receiverId,
        message
    });

    res.json({ message: "Message sent" });
});
app.get('/messages/:user1/:user2', async (req, res) => {

    const { user1, user2 } = req.params;

    const messages = await db.collection("messages").find({
        $or: [
            { senderId: user1, receiverId: user2 },
            { senderId: user2, receiverId: user1 }
        ]
    }).toArray();

    res.json(messages);
});