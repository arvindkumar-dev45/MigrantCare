
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
<div class="health-card">

    <img class="worker-photo"
         src="${worker.photo}"
         alt="${worker.name}">

    <h1>${worker.name}</h1>

    <div class="blood-group">
        ${worker.bloodGroup}
    </div>

    <p><strong>Age:</strong> ${worker.age}</p>
    <p><strong>State:</strong> ${worker.state}</p>
    <p><strong>Disease:</strong> ${worker.disease}</p>
    <p><strong>Phone:</strong> ${worker.phone}</p>

</div>
`;
});