document.addEventListener("DOMContentLoaded", function () {

    const authModal = document.getElementById("authModal");
    const dashboard = document.getElementById("dashboard");
    const landing = document.getElementById("landing");
    const navbar = document.getElementById("navbar");

    // Auto-login if user exists
    const savedUser = localStorage.getItem("velioraUser");
    if (savedUser) {
        activateDashboard(savedUser);
    }

    window.openModal = function () {
        authModal.classList.remove("hidden");
    }

    window.login = function () {
        const name = document.getElementById("usernameInput").value.trim();
        if (name !== "") {
            localStorage.setItem("velioraUser", name);
            activateDashboard(name);
        }
    }

    function activateDashboard(name) {
        authModal.classList.add("hidden");
        if (landing) landing.classList.add("hidden");
        if (navbar) navbar.classList.add("hidden");
        dashboard.classList.remove("hidden");
        document.getElementById("welcomeText").textContent = "Hi, " + name;
    }

    window.logout = function () {
        localStorage.removeItem("velioraUser");
        location.reload();
    }

});
