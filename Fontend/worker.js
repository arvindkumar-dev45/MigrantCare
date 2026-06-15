
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

    <div class="card-header">
        🚑 MigrantCare Health Card
    </div>

    <img
        src="${worker.photo}"
        class="worker-photo"
        alt="Worker Photo">

    <div class="worker-name">
        ${worker.name}
    </div>

    <div class="blood-group">
        🩸 ${worker.bloodGroup}
    </div>

    <div class="info">
        <p><strong>👤 Age:</strong> ${worker.age}</p>
        <p><strong>📍 State:</strong> ${worker.state}</p>
        <p><strong>🏥 Disease:</strong> ${worker.disease}</p>
        <p><strong>📞 Phone:</strong> ${worker.phone}</p>
    </div>

</div>
`;
});