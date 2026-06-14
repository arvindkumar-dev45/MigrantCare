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
                "userName",
                data.user.name
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