const authModal = document.getElementById("authModal");
const dashboard = document.getElementById("dashboard");
const landing = document.getElementById("landing");
const navbar = document.getElementById("navbar");

if (localStorage.getItem("velioraUser")) {
    showDashboard(localStorage.getItem("velioraUser"));
}

function openModal() {
    authModal.classList.remove("hidden");
}

function login() {
    const name = document.getElementById("usernameInput").value.trim();
    if (name !== "") {
        localStorage.setItem("velioraUser", name);
        showDashboard(name);
    }
}

function showDashboard(name) {
    authModal.classList.add("hidden");
    landing.classList.add("hidden");
    navbar.classList.add("hidden");
    dashboard.classList.remove("hidden");
    document.getElementById("welcomeText").textContent = "Hi, " + name;
}

function logout() {
    localStorage.removeItem("velioraUser");
    location.reload();
}

/* Section Switching */
function showSection(section) {
    document.getElementById("tasksSection").classList.add("hidden");
    document.getElementById("timerSection").classList.add("hidden");
    document.getElementById("moodSection").classList.add("hidden");
    document.getElementById(section + "Section").classList.remove("hidden");
}

/* TASKS */
function addTask() {
    const input = document.getElementById("taskInput");
    if (input.value.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = input.value;
        document.getElementById("taskList").appendChild(li);
        input.value = "";
    }
}

/* TIMER */
let time = 1500;
let interval;

function updateTimer() {
    const m = Math.floor(time / 60);
    const s = time % 60;
    document.getElementById("timerDisplay").textContent =
        (m < 10 ? "0" : "") + m + ":" +
        (s < 10 ? "0" : "") + s;
}

function startTimer() {
    clearInterval(interval);
    interval = setInterval(() => {
        if (time > 0) {
            time--;
            updateTimer();
        } else {
            clearInterval(interval);
            alert("Session Complete 🎉");
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(interval);
    time = 1500;
    updateTimer();
}

updateTimer();

/* MOOD */
function setMood(mood) {
    document.getElementById("moodText").textContent =
        "Current Mood: " + mood;
}
