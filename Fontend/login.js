
function login() {

    const username =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    if (
        username === "admin" &&
        password === "1234"
    ) {

        
        localStorage.setItem("loggedIn", "true");
        window.location.href = "index.html";

    } else {

        document.getElementById("message").innerText =
        "Invalid Username or Password";

    }

}