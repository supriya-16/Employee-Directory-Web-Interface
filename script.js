
let pageSize = 10;
let editingEmployeeId = null;

function renderEmployees() {
    const list = document.getElementById("employeeList");
    list.innerHTML = "";
    employees.slice(0, pageSize).forEach(emp => {
        const card = document.createElement("div");
        card.className = "employee-card";
        card.innerHTML = `
            <strong>${emp.firstName} ${emp.lastName}</strong><br>
            <b>Email:</b> ${emp.email}<br>
            <b>Department:</b> ${emp.department}<br>
            <b>Role:</b> ${emp.role}<br>
            <button onclick="editEmployee(${emp.id})">Edit</button>
            <button onclick="deleteEmployee(${emp.id})">Delete</button>
        `;
        list.appendChild(card);
    });
}

function openForm(editing = false) {
    document.getElementById("formTitle").innerText = editing ? "Edit Employee" : "Add Employee";
    document.getElementById("employeeFormModal").classList.remove("hidden");
}

function closeForm() {
    editingEmployeeId = null;
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("department").value = "";
    document.getElementById("role").value = "";
    document.getElementById("employeeFormModal").classList.add("hidden");
}

function submitForm() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value.trim();
    const role = document.getElementById("role").value.trim();

    // Validation
    if (!firstName || !lastName || !email || !department || !role) {
        alert("All fields are required.");
        return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Invalid email format.");
        return;
    }

    if (editingEmployeeId !== null) {
        const emp = employees.find(e => e.id === editingEmployeeId);
        emp.firstName = firstName;
        emp.lastName = lastName;
        emp.email = email;
        emp.department = department;
        emp.role = role;
    } else {
        const newEmp = {
            id: Date.now(),
            firstName,
            lastName,
            email,
            department,
            role
        };
        employees.push(newEmp);
    }
    closeForm();
    renderEmployees();
}

function editEmployee(id) {
    const emp = employees.find(e => e.id === id);
    if (!emp) return;
    editingEmployeeId = id;
    document.getElementById("firstName").value = emp.firstName;
    document.getElementById("lastName").value = emp.lastName;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;
    document.getElementById("role").value = emp.role;
    openForm(true);
}

function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees = employees.filter(e => e.id !== id);
        renderEmployees();
    }
}

function applyFilters() {
    const name = document.getElementById("filterFirstName").value.toLowerCase();
    const dept = document.getElementById("filterDepartment").value.toLowerCase();
    const role = document.getElementById("filterRole").value.toLowerCase();
    const filtered = employees.filter(e =>
        e.firstName.toLowerCase().includes(name) &&
        e.department.toLowerCase().includes(dept) &&
        e.role.toLowerCase().includes(role)
    );
    renderFilteredList(filtered);
}

function resetFilters() {
    document.getElementById("filterFirstName").value = "";
    document.getElementById("filterDepartment").value = "";
    document.getElementById("filterRole").value = "";
    renderEmployees();
}

function showFilterSidebar() {
    document.getElementById("filterSidebar").classList.toggle("hidden");
}

function applySort() {
    const val = document.getElementById("sortSelect").value;
    if (val) {
        employees.sort((a, b) => a[val].localeCompare(b[val]));
    }
    renderEmployees();
}

function changePageSize() {
    pageSize = parseInt(document.getElementById("paginationSelect").value);
    renderEmployees();
}

function applySearch() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = employees.filter(e =>
        e.firstName.toLowerCase().includes(query) ||
        e.lastName.toLowerCase().includes(query) ||
        e.email.toLowerCase().includes(query)
    );
    renderFilteredList(filtered);
}

function renderFilteredList(filteredList) {
    const list = document.getElementById("employeeList");
    list.innerHTML = "";
    filteredList.slice(0, pageSize).forEach(emp => {
        const card = document.createElement("div");
        card.className = "employee-card";
        card.innerHTML = `
            <strong>${emp.firstName} ${emp.lastName}</strong><br>
            <b>Email:</b> ${emp.email}<br>
            <b>Department:</b> ${emp.department}<br>
            <b>Role:</b> ${emp.role}<br>
            <button onclick="editEmployee(${emp.id})">Edit</button>
            <button onclick="deleteEmployee(${emp.id})">Delete</button>
        `;
        list.appendChild(card);
    });
}

window.onload = renderEmployees;
