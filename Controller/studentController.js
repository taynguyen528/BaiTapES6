import Student from "../Modal/Student.js";
import StudentList from "./ListStudent.js";
import Validation from "../Validation/Validation.js";
const getElement = (id) => document.getElementById(id);

const getInfoStudent = () => {
    const elements = document.querySelectorAll("#formStudent input");

    let data = {};
    elements.forEach((elements) => {
        const { name, value } = elements;
        data[name] = value;
    });

    const student = new Student(
        data.name,
        data.address,
        data.email,
        data.code,
        data.math,
        data.physics,
        data.chemistry
    );
    return student;
};

var listStudent = new StudentList();

const renderStudent = (arrStudent = listStudent.listStudent) => {
    var htmlContent = "";
    for (let student of arrStudent) {
        htmlContent += `
        <tr>
            <td>${student.code}</td>
            <td>${student.name}</td>
            <td>${student.address}</td>
            <td>${student.email}</td>
            <td>${student.math}</td>
            <td>${student.physics}</td>
            <td>${student.chemistry}</td>
            <td id="average-${student.code}"></td>
            <td>
                <button
                    class="btn btn-success mr-2"
                    onclick="editStudent('${student.code}')"
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg"
                >
                    Edit
                </button>
                <button
                    class="btn btn-danger mr-2"
                    onclick="deleteStudent('${student.code}')"
                >
                    Delete
                </button>
                <button
                    class="btn btn-info"
                    onclick="calculateAverage('${student.code}')"
                >
                    Average
                </button>
            </td>
        </tr>
        `;
    }
    getElement("tbodySinhVien").innerHTML = htmlContent;
};

const setLocalStorageData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getLocalStorageData = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
};

document.addEventListener("DOMContentLoaded", () => {
    const storedStudentList = getLocalStorageData("studentList");
    if (storedStudentList) {
        listStudent.listStudent = storedStudentList;
        renderStudent();
    }
});

const validation = new Validation();
function check(student) {
    var isValid = true;

    isValid &= validation.checkEmpty(
        student.name,
        "invalidName",
        "Tên tài khoản không được để trống!"
    );
    isValid &= validation.checkEmpty(
        student.address,
        "invalidAddress",
        "Địa chỉ không được để trống!"
    );
    isValid &= validation.checkEmpty(
        student.code,
        "invalidCode",
        "Code không được để trống!"
    );
    isValid &=
        validation.checkEmpty(
            student.email,
            "invalidEmail",
            "Email không được để trống!"
        ) &&
        validation.checkEmail(
            student.email,
            "invalidEmail",
            "Email không đúng định dạng!"
        );
    isValid &=
        validation.checkEmpty(
            student.math,
            "invalidScoresMath",
            "Score Math không được để trống!"
        ) &&
        validation.checkScores(
            student.math,
            "invalidScoresMath",
            "Score Math phải > 0 và < 10.",
            0,
            10
        );

    isValid &=
        validation.checkEmpty(
            student.physics,
            "invalidScoresPhysics",
            "Score Physics không được để trống!"
        ) &&
        validation.checkScores(
            student.physics,
            "invalidScoresPhysics",
            "Score Physics phải > 0 và < 10.",
            0,
            10
        );
    isValid &=
        validation.checkEmpty(
            student.chemistry,
            "invalidScoresChemistry",
            "Score Chemistry không được để trống!"
        ) &&
        validation.checkScores(
            student.chemistry,
            "invalidScoresChemistry",
            "Score Chemistry phải > 0 và < 10.",
            0,
            10
        );
    return isValid;
}

// add new student
getElement("btnAddNewUser").onclick = function () {
    getElement("exampleModalLabel").innerHTML = "Form Add Info Student";
    getElement("btnSubmitStudent").style.display = "block";
    getElement("btnUpdateStudent").style.display = "none";
    getElement("btn-reset-modal").style.display = "block";

    getElement("Code").disabled = false;

    getElement("btnSubmitStudent").onclick = () => {
        const student = getInfoStudent();
        var flag = check(student);
        // check xem da co ma SV do chua
        var findStudent = listStudent.findCodeStudent(student.code);
        if (findStudent) {
            document.getElementById("invalidCode").innerHTML =
                "Mã này đã có người sử dụng, vui lòng chọn mã khác!";
        }

        if (flag && !findStudent) {
            listStudent.addNewStudent(student);
            renderStudent();
            setLocalStorageData("studentList", listStudent.listStudent);
            resetForm();
        } else {
            return;
        }
    };
};

//edit student
window.editStudent = (code) => {
    resetForm();
    getElement("exampleModalLabel").innerHTML = "Edit Info Student";
    getElement("btnSubmitStudent").style.display = "none";
    getElement("btnUpdateStudent").style.display = "block";
    getElement("btn-reset-modal").style.display = "none";

    getElement("Code").disabled = true;

    const student = listStudent.listStudent.find((s) => s.code === code);

    getElement("Name").value = student.name;
    getElement("Address").value = student.address;
    getElement("Code").value = student.code;
    getElement("Email").value = student.email;
    getElement("Math").value = student.math;
    getElement("Physics").value = student.physics;
    getElement("Chemistry").value = student.chemistry;

    getElement("btnUpdateStudent").onclick = function () {
        const updatedStudent = getInfoStudent();
        const studentIndex = listStudent.listStudent.findIndex(
            (s) => s.code === code
        );
        var flag = check(updatedStudent);

        if (flag) {
            listStudent.updateStudent(studentIndex, updatedStudent);
            setLocalStorageData("studentList", listStudent.listStudent);
            renderStudent();
            resetForm();
        } else {
            return;
        }
    };
};

// delete user
window.deleteStudent = (code) => {
    listStudent.deleteStudent(code);
    setLocalStorageData("studentList", listStudent.listStudent);
    renderStudent();
};

// calculator average
window.calculateAverage = (code) => {
    const student = listStudent.listStudent.find((s) => s.code === code);

    if (student) {
        const average = (
            (+student.math + +student.physics + +student.chemistry) /
            3
        ).toFixed(2);
        getElement(`average-${student.code}`).innerHTML = average;
    }
};

let isSort = true;
// sort by name
const sortStudentListByName = () => {
    // Sắp xếp danh sách hiện tại
    listStudent.listStudent.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (isSort) {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });

    isSort = !isSort;

    renderStudent();
};

getElement("btn-sort").onclick = () => {
    sortStudentListByName();
};

window.resetForm = () => {
    const form = document.getElementById("formStudent");
    form.reset();
};

getElement("btn-reset-modal").onclick = function () {
    resetForm();
};
