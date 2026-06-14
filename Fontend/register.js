const API_URL = "https://migrantcare.onrender.com";

function register() {

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

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

        document.getElementById("message").innerText =
        data;

    });

}