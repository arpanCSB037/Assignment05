// Q8 - Sorting state
let currentSortColumn = null;
let currentSortDirection = "ASC";

// Q3 - Load all records
function loadRecords() {
    currentSortColumn = null;

    fetch("fetch_records.php")
        .then(response => response.json())
        .then(records => displayRecords(records))
        .catch(error => console.error("Error loading records:", error));
}

document.getElementById("loadBtn").addEventListener("click", loadRecords);

// Display records in table
function displayRecords(records) {
    const tableContainer = document.getElementById("tableContainer");

    if (records.length === 0) {
        tableContainer.innerHTML = "<p>No records found.</p>";
        return;
    }

    const table = document.createElement("table");

    table.innerHTML = `
        <thead>
            <tr>
                <th class="sortable-header" onclick="sortRecords('rollno')">
                    Roll No ${getSortArrow("rollno")}
                </th>
                <th class="sortable-header" onclick="sortRecords('name')">
                    Name ${getSortArrow("name")}
                </th>
                <th class="sortable-header" onclick="sortRecords('gender')">
                    Gender ${getSortArrow("gender")}
                </th>
                <th class="sortable-header" onclick="sortRecords('department')">
                    Department ${getSortArrow("department")}
                </th>
                <th class="sortable-header" onclick="sortRecords('CGPA')">
                    CGPA ${getSortArrow("CGPA")}
                </th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    records.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.rollno}</td>
            <td>${student.name}</td>
            <td>${student.gender}</td>
            <td>${student.department}</td>
            <td class="cgpa-cell">${student.CGPA}</td>
            <td class="actions-cell">
                <button type="button" class="edit-btn"
                    onclick="editStudent('${student.rollno}')">Edit</button>
                <button type="button" class="delete-btn"
                    onclick="deleteStudent('${student.rollno}')">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    });

    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);
}

// Q4 + Q7 - Insert / Update
document.getElementById("studentForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const action = document.getElementById("formAction").value;
    let phpFile = "";

    if (action === "insert") {
        phpFile = "insert_record.php";
    } else if (action === "update") {
        phpFile = "update_record.php";
    }

    fetch(phpFile, {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(result => {
            console.log("PHP response:", result);

            const message = document.getElementById("message");

            if (result === "success") {
                message.textContent = action === "insert"
                    ? "✓ Student added successfully"
                    : "✓ Student updated successfully";
                message.style.color = "green";

                this.reset();
                document.getElementById("formAction").value = "insert";
                document.getElementById("submitBtn").textContent = "Add Student";
                document.getElementById("rollno").readOnly = false;

                loadRecords();
            } else if (result === "duplicate") {
                message.textContent = "⚠ Roll number already exists";
                message.style.color = "orange";
            } else if (result === "nochange") {
                message.textContent = "No changes were made";
                message.style.color = "blue";

                this.reset();
                document.getElementById("formAction").value = "insert";
                document.getElementById("submitBtn").textContent = "Add Student";
                document.getElementById("rollno").readOnly = false;
            } else {
                message.textContent = "✗ Operation failed";
                message.style.color = "red";
            }
        })
        .catch(error => {
            console.error("Error:", error);

            const message = document.getElementById("message");
            message.textContent = "✗ Something went wrong";
            message.style.color = "red";
        });
});

// Q5 - Live search
document.getElementById("searchBox").addEventListener("input", function () {
    const searchValue = this.value.trim();

    if (searchValue === "") {
        document.getElementById("tableContainer").innerHTML = "";
        return;
    }

    fetch("search_records.php?search=" + encodeURIComponent(searchValue))
        .then(response => response.json())
        .then(records => displayRecords(records))
        .catch(error => console.error("Search error:", error));
});

// Q6 - Statistics
document.getElementById("statisticsBtn").addEventListener("click", function () {
    fetch("statistics.php")
        .then(response => response.json())
        .then(data => {
            const statisticsResult = document.getElementById("statisticsResult");

            statisticsResult.innerHTML = `
                <div class="statistics-summary">
                    <p>
                        <strong>Total CGPA:</strong>
                        ${data.total.toFixed(2)}
                    </p>
                    <p>
                        <strong>Average CGPA:</strong>
                        ${data.average.toFixed(2)}
                    </p>
                </div>
            `;

            const table = document.createElement("table");

            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Roll No</th>
                        <th>Name</th>
                        <th>CGPA</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;

            const tbody = table.querySelector("tbody");

            data.records.forEach(student => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${student.rollno}</td>
                    <td>${student.name}</td>
                    <td class="cgpa-cell">${student.CGPA}</td>
                    <td>${student.category}</td>
                `;

                tbody.appendChild(row);
            });

            statisticsResult.appendChild(table);
        })
        .catch(error => console.error("Statistics error:", error));
});

// Q7 - Edit student
function editStudent(rollno) {
    fetch("fetch_records.php")
        .then(response => response.json())
        .then(records => {
            const student = records.find(record => record.rollno === rollno);

            if (!student) return;

            document.getElementById("rollno").value = student.rollno;
            document.getElementById("name").value = student.name;

            const genderRadio = document.querySelector(
                `input[name="gender"][value="${student.gender}"]`
            );

            if (genderRadio) {
                genderRadio.checked = true;
            }

            document.getElementById("department").value = student.department;
            document.getElementById("CGPA").value = student.CGPA;
            document.getElementById("formAction").value = "update";
            document.getElementById("submitBtn").textContent = "Update Student";
            document.getElementById("rollno").readOnly = true;

            const message = document.getElementById("message");
            message.textContent = "Editing student: " + student.name;
            message.style.color = "#2563eb";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        })
        .catch(error => console.error("Edit error:", error));
}

// Q7 - Delete student
function deleteStudent(rollno) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    const formData = new FormData();
    formData.append("rollno", rollno);

    fetch("delete_record.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(result => {
            const message = document.getElementById("message");

            if (result === "success") {
                message.textContent = "✓ Student deleted successfully";
                message.style.color = "green";
                loadRecords();
            } else {
                message.textContent = "✗ Failed to delete student";
                message.style.color = "red";
            }
        })
        .catch(error => {
            console.error("Delete error:", error);

            const message = document.getElementById("message");
            message.textContent = "✗ Something went wrong";
            message.style.color = "red";
        });
}

// Q8 - Sort records
function sortRecords(column) {
    if (currentSortColumn === column) {
        currentSortDirection =
            currentSortDirection === "ASC" ? "DESC" : "ASC";
    } else {
        currentSortColumn = column;
        currentSortDirection = "ASC";
    }

    fetch(
        "sort_records.php?column=" +
        encodeURIComponent(column) +
        "&direction=" +
        encodeURIComponent(currentSortDirection)
    )
        .then(response => response.json())
        .then(records => displayRecords(records))
        .catch(error => console.error("Sorting error:", error));
}

function getSortArrow(column) {
    if (currentSortColumn !== column) {
        return "";
    }

    return currentSortDirection === "ASC" ? " ↑" : " ↓";
}