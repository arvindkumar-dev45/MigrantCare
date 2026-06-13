
const API_URL = "https://migrantcare.onrender.com";
const params =new URLSearchParams(window.location.search);

const id = params.get("id");
if (!id) {
    document.getElementById("details").innerHTML =
    "<h2>No Worker Selected</h2>";
    throw new Error("No worker id");
}

fetch(`${API_URL}/api/workers/${id}`)
.then(response => response.json())
.then(worker => {

    document.getElementById("details").innerHTML = `
        <h2>${worker.name}</h2>
        <p>Age: ${worker.age}</p>
        <p>State: ${worker.state}</p>
        <p>Blood Group: ${worker.bloodGroup}</p>
        <p>Disease: ${worker.disease}</p>
        <p>Phone: ${worker.phone}</p>
    `;
});