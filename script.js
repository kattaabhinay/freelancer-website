// =======================
// 🔐 SIGNUP FUNCTION
// =======================
async function signup() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await res.json();
        alert(data.message);

    } catch (error) {
        console.log(error);
        alert("Signup failed ❌");
    }
}


// =======================
// 🔐 LOGIN FUNCTION
// =======================
async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    // 🔥 STEP 2 IMPORTANT
    localStorage.setItem("userId", data.user._id);

    alert("Login successful!");

    // Redirect to dashboard
    window.location.href = "dashboard.html";
}

// =======================
// 💼 CREATE JOB
// =======================
async function createJob() {

    const title = document.getElementById("title").value;
    const description = document.getElementById("desc").value;
    const budget = document.getElementById("budget").value;

    const userId = localStorage.getItem("userId"); // 🔥 important

    await fetch("http://localhost:5000/job", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ title, description, budget, userId })
    });

    alert("Job Created!");
    loadJobs();
}


// 📋 LOAD JOBS (FINAL VERSION)
// =======================
async function loadJobs() {

    const userId = localStorage.getItem("userId");

    const res = await fetch(`http://localhost:5000/jobs/${userId}`);
    const jobs = await res.json();

    let output = "";

    jobs.forEach(job => {
        output += `
            <div class="card-custom">
                <h4>${job.title}</h4>
                <p>${job.description}</p>
                <p>₹${job.budget}</p>
            </div>
        `;
    });

    document.getElementById("jobs").innerHTML = output;
}

// =======================
// 🚀 AUTO LOAD JOBS
// =======================
if (document.getElementById("jobs")) {
    loadJobs();
}
async function applyJob(jobId) {

    const email = prompt("Enter your email:");

    if (!email) {
        alert("Email required ❌");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/apply", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                jobId: jobId,
                email: email
            })
        });

        const data = await res.json();
        alert(data.message);

    } catch (error) {
        console.log(error);
        alert("Apply failed ❌");
    }
}
function renderChart(jobs) {

    const ctx = document.getElementById('jobChart');

    const labels = jobs.map(job => job.title);
    const budgets = jobs.map(job => job.budget);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Budget',
                data: budgets
            }]
        }
    });
}
output += `
<div class="card-custom">
    <h4>${job.title}</h4>
    <p>${job.description}</p>
    <p><b>Budget:</b> ₹${job.budget}</p>

    <button onclick="applyJob('${job._id}')" class="btn btn-success">
        Apply
    </button>
</div>
`;
async function applyJob(jobId) {

    const name = prompt("Enter your name:");
    const proposal = prompt("Enter your proposal:");

    await fetch("http://localhost:5000/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, name, proposal })
    });

    alert("Applied successfully!");
}
<button onclick="viewApplicants('${job._id}')" class="btn btn-info">
    View Applicants
</button>
async function viewApplicants(jobId) {

    const res = await fetch(`http://localhost:5000/applications/${jobId}`);
    const data = await res.json();

    console.log(data);

    let output = "";

    data.forEach(app => {
        output += `
            <div class="card-custom">
                <h5>${app.name}</h5>
                <p>${app.proposal}</p>
            </div>
        `;
    });

    document.getElementById("jobs").innerHTML = output;
}
async function deleteJob(id) {

    await fetch(`http://localhost:5000/job/${id}`, {
        method: "DELETE"
    });

    alert("Job Deleted!");
    loadJobs();
}
function searchJobs() {

    // 1. Get what user typed
    const value = document.getElementById("search").value.toLowerCase();

    // 2. Get all job cards
    const cards = document.getElementsByClassName("card-custom");

    // 3. Loop through each job card
    for (let card of cards) {

        // 4. Check if card text includes search value
        if (card.innerText.toLowerCase().includes(value)) {

            // 5. Show card
            card.style.display = "block";

        } else {

            // 6. Hide card
            card.style.display = "none";
        }
    }
}
function renderPieChart(jobs) {

    // 1. Get canvas element
    const ctx = document.getElementById('pieChart');

    // 2. Create chart
    new Chart(ctx, {

        type: 'pie',

        data: {
            // 3. Labels (job titles)
            labels: jobs.map(job => job.title),

            datasets: [{
                // 4. Data (budgets)
                data: jobs.map(job => job.budget)
            }]
        }

    });
}
async function sendMessage() {

    const senderId = localStorage.getItem("userId");
    const receiverId = document.getElementById("receiverId").value;
    const message = document.getElementById("msg").value;

    await fetch("http://localhost:5000/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ senderId, receiverId, message })
    });

    alert("Message sent!");
}
async function loadMessages() {

    const user1 = localStorage.getItem("userId");
    const user2 = document.getElementById("receiverId").value;

    console.log("User1:", user1);
    console.log("User2:", user2);

    const res = await fetch(`http://localhost:5000/messages/${user1}/${user2}`);
    const data = await res.json();

    console.log("Messages:", data);

    let output = "";

    data.forEach(msg => {
        output += `
            <div class="card-custom">
                <b>${msg.senderId}:</b> ${msg.message}
            </div>
        `;
    });

    document.getElementById("chatBox").innerHTML = output;
}
