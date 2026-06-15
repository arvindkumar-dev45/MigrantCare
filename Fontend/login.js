const API_URL = "https://migrantcare.onrender.com";

function login() {

    const email =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    fetch(`${API_URL}/api/users/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })

    })
    .then(response => response.json())
    .then(data => {

        if (data.message === "Login Successful") {

            localStorage.setItem("loggedIn", "true");

            localStorage.setItem(
                "userId",
                data.user._id
            );

            localStorage.setItem(
                "role",
                data.user.role
            );

            window.location.href = "index.html";

        } else {

            document.getElementById("message").innerText =
            "Invalid Email or Password";

        }

    })
    .catch(error => {

        console.log(error);

        document.getElementById("message").innerText =
        "Login Failed";

    });

}

function showRegister() {

    document.getElementById("loginForm").style.display = "none";

    document.getElementById("registerForm").style.display = "block";

}

function showLogin() {

    document.getElementById("registerForm").style.display = "none";

    document.getElementById("loginForm").style.display = "block";

}

function register() {

    const name =
    document.getElementById("regName").value;

    const email =
    document.getElementById("regEmail").value;

    const password =
    document.getElementById("regPassword").value;

    fetch(`${API_URL}/api/users/register`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            email,
            password
        })

    })
    .then(response => response.text())
    .then(data => {

        document.getElementById("registerMessage").innerText =
        data;

        if (data === "User Registered Successfully") {

            setTimeout(() => {

                showLogin();

            }, 1500);

        }

    });

}