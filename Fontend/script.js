const API_URL = "https://migrantcare.onrender.com";
if (localStorage.getItem("loggedIn") !== "true") {

    window.location.href = "login.html";

}
let editId = null;
let allWorkers = [];

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const state = document.getElementById("state").value;

    const bloodGroup = document.getElementById("bloodGroup").value;

    const disease = document.getElementById("disease").value;

    const phone = document.getElementById("phone").value;

    const photo = document.getElementById("photo").files[0];

   

   
   

   if ( !name || !age || !state || !bloodGroup || !disease || !phone) {

        document.getElementById("message").innerText =
            "Please fill all fields";
            alert("fill!");

        return;
    }

   if (!/^\d+$/.test(phone)) {
    alert("Phone number should contain only digits");
    return;
}

if (phone.length !== 10) {
    alert("Phone number must be 10 digits");
    return;
}


if (editId) {

    fetch(`${API_URL}/api/workers/${editId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },

       body: JSON.stringify({
    name,
    age,
    state,
    bloodGroup,
    disease,
    phone,
   
})

    })
    .then(response => response.text())
    .then(data => {

    document.getElementById("message").innerText = data;

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("state").value = "";
    document.getElementById("bloodGroup").value = "";
    document.getElementById("disease").value = "";
    document.getElementById("phone").value = "";

    loadWorkers();

});
} else {

    fetch(`${API_URL}/api/workers/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            age,
            state,
            bloodGroup,
            disease,
            phone,
             photo: ""
        })
    })
    .then(response => response.text())
    .then(data => {

    document.getElementById("message").innerText = data;

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("state").value = "";
    document.getElementById("bloodGroup").value = "";
    document.getElementById("disease").value = "";
    document.getElementById("phone").value = "";

    editId = null;

    loadWorkers();

});
}

});

function loadWorkers() {

    fetch(`${API_URL}/api/workers`)
    .then(response => response.json())
    .then(workers => {

         allWorkers = workers;


         document.getElementById("workerCount").innerText =
workers.length;

const states =
new Set(workers.map(worker => worker.state));

document.getElementById("stateCount").innerText =
states.size;

const bloodGroups =
new Set(workers.map(worker => worker.bloodGroup));

document.getElementById("bloodCount").innerText =
bloodGroups.size;


        const workersTable =
        document.getElementById("workersTable");

        workersTable.innerHTML = "";

        workers.forEach(worker => {

            workersTable.innerHTML += `
                <tr>

                    <td>${worker.name}</td>
                    <td>${worker.age}</td>
                    <td>${worker.state}</td>
                    <td>${worker.bloodGroup || ""}</td>
                    <td>${worker.disease || ""}</td>
                    <td>${worker.phone || ""}</td>

                    <td>

                        <button class="edit-btn" onclick="editWorker(
                        '${worker._id}',
                        '${worker.name}',
                        '${worker.age}',
                        '${worker.state}',
                        '${worker.bloodGroup}',
                        '${worker.disease}',
                        '${worker.phone}'
                        )">
                            Edit
                        </button>

                        <button class="delete-btn" onclick="deleteWorker('${worker._id}')">
                            Delete
                        </button>

                    </td>

                    <td><button onclick="showQR('${worker._id}')">QR</button>
                    </td>

                </tr>
            `;

        });

    });

}

loadWorkers();

async function deleteWorker(id) {

    await fetch(
        `${API_URL}/api/workers/${id}`,
        {
            method: "DELETE"
        }
    );

    loadWorkers();

}

function editWorker(id, name, age, state, bloodGroup, disease, phone) {

    editId = id;

    document.getElementById("name").value = name;
    document.getElementById("age").value = age;
    document.getElementById("state").value = state;
    document.getElementById("bloodGroup").value = bloodGroup;
    document.getElementById("disease").value = disease;
    document.getElementById("phone").value = phone;

}



document.getElementById("search")
.addEventListener("input", function () {

    const value = this.value.toLowerCase();

    const filteredWorkers =
    allWorkers.filter(worker =>
        worker.name.toLowerCase().includes(value)
    );

    const workersTable =
    document.getElementById("workersTable");

    workersTable.innerHTML = "";

    filteredWorkers.forEach(worker => {

        workersTable.innerHTML += `
            <tr>
                <td>${worker.name}</td>
                <td>${worker.age}</td>
                <td>${worker.state}</td>
                <td>${worker.bloodGroup || ""}</td>
                <td>${worker.disease || ""}</td>
                <td>${worker.phone || ""}</td>

                <td>
                    <button class="edit-btn" onclick="editWorker(
                    '${worker._id}',
                    '${worker.name}',
                    '${worker.age}',
                    '${worker.state}',
                    '${worker.bloodGroup}',
                    '${worker.disease}',
                    '${worker.phone}'
                    )">
                        Edit
                    </button>

                    <button class="delete-btn" onclick="deleteWorker('${worker._id}')">
                        Delete
                    </button>
                </td>

                <td>

                        <button onclick="showQR('${worker._id}')">
                             QR
                        </button>

                </td>
            </tr>
        `;

    });

});

function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";

}

function showQR(id) {

    document.getElementById("qrcode").innerHTML = "";

    new QRCode(
        document.getElementById("qrcode"),
        `https://sage-melomakarona-029e8f.netlify.app/worker.html?id=${id}`
    );

}