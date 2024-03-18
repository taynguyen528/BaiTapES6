import EmployeeList from "./listEmployee.js";
import Employee from "../Modal/Employee.js";
import Validation from "../Validation/Validation.js";
const getElement = (id) => document.getElementById(id);

const getInfoEmployee = () => {
    const elements = document.querySelectorAll("#formEmployee input");

    let data = {};
    elements.forEach((elements) => {
        const { name, value } = elements;
        data[name] = value;
    });
    const employee = new Employee(
        data.name,
        data.address,
        data.email,
        data.code,
        data.workDays,
        data.dailySalary
    );
    return employee;
};

getInfoEmployee();

const setLocalStorageData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getLocalStorageData = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
};
var listEmployee = new EmployeeList();

const renderEmployee = (arrEmployee = listEmployee.listEmployee) => {
    var htmlContent = "";
    for (let employee of arrEmployee) {
        htmlContent += `
        <tr>
            <td>${employee.code}</td>
            <td>${employee.name}</td>
            <td>${employee.address}</td>
            <td>${employee.email}</td>
            <td>${employee.workDays}</td>
            <td>${employee.dailySalary}</td>
            <td id="salary-${employee.code}"></td>
            <td>
                <button
                    class="btn btn-success mr-2"
                    onclick="editEmployee('${employee.code}')"
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg"
                >
                    Edit
                </button>
                <button
                    class="btn btn-danger mr-2"
                    onclick="deleteEmployee('${employee.code}')"
                >
                    Delete
                </button>
                <button
                    class="btn btn-info"
                    onclick="calculatePayroll('${employee.code}')"
                >
                Payroll
                </button>
            </td>
        </tr>
        `;
    }
    getElement("tbodyEmployee").innerHTML = htmlContent;
};

const validation = new Validation();
function check(employee) {
    var isValid = true;

    isValid &= validation.checkEmpty(
        employee.name,
        "invalidName",
        "Tên tài khoản không được để trống!"
    );
    isValid &= validation.checkEmpty(
        employee.address,
        "invalidAddress",
        "Địa chỉ không được để trống!"
    );
    isValid &= validation.checkEmpty(
        employee.code,
        "invalidCode",
        "Code không được để trống!"
    );
    isValid &=
        validation.checkEmpty(
            employee.email,
            "invalidEmail",
            "Email không được để trống!"
        ) &&
        validation.checkEmail(
            employee.email,
            "invalidEmail",
            "Email không đúng định dạng!"
        );

    isValid &= validation.checkEmpty(
        employee.workDays,
        "invalidWorkDays",
        "Work Days không được để trống!"
    );
    isValid &=
        validation.checkEmpty(
            employee.dailySalary,
            "invalidDailySalary",
            "Daily Salary không được để trống!"
        ) &&
        validation.checkForNegativeNumbers(
            +employee.dailySalary,
            "invalidDailySalary",
            "Daily Salary không được bé hơn 0.",
            0
        );
    return isValid;
}
document.addEventListener("DOMContentLoaded", () => {
    const storedEmployeeList = getLocalStorageData("employeeList");
    if (storedEmployeeList) {
        listEmployee.listEmployee = storedEmployeeList;
        renderEmployee();
    }
});

// add employee
getElement("btnAddNewEmployee").onclick = () => {
    getElement("exampleModalLabel").innerHTML = "Form Add Info Employee";
    getElement("btnSubmitEmployee").style.display = "block";
    getElement("btnUpdateEmployee").style.display = "none";
    getElement("btn-reset-modal").style.display = "block";
    getElement("Code").disabled = false;
    resetForm();
    getElement("btnSubmitEmployee").onclick = () => {
        let employee = getInfoEmployee();
        var flag = check(employee);
        var findEmployee = listEmployee.findCodeEmployee(employee.code);
        if (findEmployee) {
            document.getElementById("invalidCode").innerHTML =
                "Mã này đã có người sử dụng, vui lòng chọn mã khác!";
        }
        if (flag && !findEmployee) {
            listEmployee.addNewEmployee(employee);
            renderEmployee();
            setLocalStorageData("employeeList", listEmployee.listEmployee);
            resetForm();
        } else {
            return;
        }
    };
};

//edit employee
window.editEmployee = (code) => {
    resetForm();
    getElement("exampleModalLabel").innerHTML = "Edit Info Employee";
    getElement("btnSubmitEmployee").style.display = "none";
    getElement("btnUpdateEmployee").style.display = "block";
    getElement("btn-reset-modal").style.display = "none";

    getElement("Code").disabled = true;

    const employee = listEmployee.listEmployee.find((s) => s.code === code);

    getElement("Name").value = employee.name;
    getElement("Address").value = employee.address;
    getElement("Code").value = employee.code;
    getElement("Email").value = employee.email;
    getElement("workDays").value = employee.workDays;
    getElement("dailySalary").value = employee.dailySalary;

    getElement("btnUpdateEmployee").onclick = function () {
        const updatedEmployee = getInfoEmployee();
        const employeeIndex = listEmployee.listEmployee.findIndex(
            (s) => s.code === code
        );
        var flag = check(updatedEmployee);

        if (flag) {
            listEmployee.updateEmployee(employeeIndex, updatedEmployee);
            setLocalStorageData("employeeList", listEmployee.listEmployee);
            renderEmployee();
            resetForm();
        } else {
            return;
        }
    };
};

// delete employee
window.deleteEmployee = (code) => {
    listEmployee.deleteEmployee(code);
    setLocalStorageData("employeeList", listEmployee.listEmployee);
    renderEmployee();
};

window.resetForm = () => {
    const form = document.getElementById("formEmployee");
    form.reset();
};

getElement("btn-reset-modal").onclick = function () {
    resetForm();
};

let isSort = true;
const sortEmployeeListByName = () => {
    listEmployee.listEmployee.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (isSort) {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });

    isSort = !isSort;

    renderEmployee();
};

getElement("btn-sort").onclick = () => {
    sortEmployeeListByName();
};

// payroll
window.calculatePayroll = (code) => {
    const employee = listEmployee.listEmployee.find((e) => e.code === code);
    if (employee) {
        const salary = +employee.dailySalary * +employee.workDays;
        getElement(`salary-${employee.code}`).innerHTML = salary;
    }
};
