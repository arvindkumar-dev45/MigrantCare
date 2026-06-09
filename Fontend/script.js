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

   if ( !name || !age || !state || !bloodGroup || !disease || !phone) {

        document.getElementById("message").innerText =
            "Please fill all fields";
            alert("fill!");

        return;
    }
if (editId) {

    fetch(`http://localhost:5000/api/workers/${editId}`, {
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
    phone
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

    fetch("http://localhost:5000/api/workers/register", {
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
            phone
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

    fetch("http://localhost:5000/api/workers")
    .then(response => response.json())
    .then(workers => {

         allWorkers = workers;
         document.getElementById("workerCount").innerText =`Total Workers: ${workers.length}`;
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

                        <button onclick="editWorker(
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

                        <button onclick="deleteWorker('${worker._id}')">
                            Delete
                        </button>

                    </td>

                </tr>
            `;

        });

    });

}

loadWorkers();

async function deleteWorker(id) {

    await fetch(
        `http://localhost:5000/api/workers/${id}`,
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
                    <button onclick="editWorker(
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

                    <button onclick="deleteWorker('${worker._id}')">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

});