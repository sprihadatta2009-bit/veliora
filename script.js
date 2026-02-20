// SAFE DOM LOADING
document.addEventListener("DOMContentLoaded", () => {

    const loginModal = document.getElementById("loginModal");
    const dashboard = document.getElementById("dashboard");

    // OPEN MODAL
    window.openModal = function () {
        if (loginModal) loginModal.classList.remove("hidden");
    }

    // CLOSE MODAL
    window.closeModal = function () {
        if (loginModal) loginModal.classList.add("hidden");
    }

    // LOGIN
    window.login = function () {
        const email = document.getElementById("email");
        if (!email || email.value.trim() === "") return;

        closeModal();
        if (dashboard) dashboard.classList.remove("hidden");
        document.body.classList.add("logged-in");
    }

    // LOGOUT
    window.logout = function () {
        if (dashboard) dashboard.classList.add("hidden");
    }

    // BUTTON MICRO-ANIMATION
    document.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.style.transform = "scale(0.96)";
            setTimeout(() => {
                btn.style.transform = "";
            }, 120);
        });
    });

});
