import Customer from "../Modal/Customer.js";
import CustomerList from "./ListCustomer.js";
import Validation from "../Validation/Validation.js";
const getElement = (id) => document.getElementById(id);

const getInfoCustomer = () => {
    const elements = document.querySelectorAll("#formCustomer input");
    let data = {};
    elements.forEach((elements) => {
        const { name, value } = elements;
        data[name] = value;
    });

    const customer = new Customer(
        data.name,
        data.address,
        data.email,
        data.code,
        data.nameCompany,
        data.orderValue,
        data.feedBack
    );

    return customer;
};

const setLocalStorageData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getLocalStorageData = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
};

var listCustomer = new CustomerList();

const renderCustomer = (arrCustomer = listCustomer.listCustomer) => {
    var htmlContent = "";
    for (let customer of arrCustomer) {
        htmlContent += `
        <tr>
            <td style="white-space: nowrap;">${customer.code}</td>
            <td style="white-space: nowrap;">${customer.name}</td>
            <td style="white-space: nowrap;">${customer.address}</td>
            <td style="white-space: nowrap;">${customer.email}</td>
            <td style="white-space: nowrap;">${customer.nameCompany}</td>
            <td style="white-space: nowrap;">${customer.orderValue}</td>
            <td style="white-space: nowrap;">${customer.feedBack}</td>
            <td style="white-space: nowrap;">
                <button
                    class="btn btn-success mr-2"
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg"
                    onclick="editStudent('${customer.code}')"
                >
                    Edit
                </button>
                <button
                    class="btn btn-danger mr-2"
                    onclick="deleteCustomer('${customer.code}')"
                >
                    Delete
                </button>
               
            </td>
        </tr>
        `;
    }
    getElement("tbodyCustomer").innerHTML = htmlContent;
};

document.addEventListener("DOMContentLoaded", () => {
    const storedCustomerList = getLocalStorageData("customerList");
    if (storedCustomerList) {
        listCustomer.listCustomer = storedCustomerList;
        renderCustomer();
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
    isValid &= validation.checkEmpty(
        student.nameCompany,
        "invalidNameCompany",
        "Name Company không được để trống!"
    );
    isValid &=
        validation.checkEmpty(
            student.orderValue,
            "invalidOrderValue",
            "Order Value không được để trống!"
        ) &&
        validation.checkForNegativeNumbers(
            +student.orderValue,
            "invalidOrderValue",
            "Order Value không được bé hơn 0.",
            0
        );
    isValid &= validation.checkEmpty(
        student.feedBack,
        "invalidFeedBack",
        "FeedBack không được để trống!"
    );
    return isValid;
}

// add customer
getElement("btnAddNewCustomer").onclick = () => {
    getElement("exampleModalLabel").innerHTML = "Form Add Info Customer";
    getElement("btnSubmitCustomer").style.display = "block";
    getElement("btnUpdateCustomer").style.display = "none";
    getElement("btn-reset-modal").style.display = "block";
    getElement("Code").disabled = false;
    resetForm();
    getElement("btnSubmitCustomer").onclick = () => {
        let customer = getInfoCustomer();
        var flag = check(customer);
        var findCustomer = listCustomer.findCodeCustomer(customer.code);
        if (findCustomer) {
            document.getElementById("invalidCode").innerHTML =
                "Mã này đã có người sử dụng, vui lòng chọn mã khác!";
        }
        if (flag && !findCustomer) {
            listCustomer.addNewCustomer(customer);
            renderCustomer();
            setLocalStorageData("customerList", listCustomer.listCustomer);
            resetForm();
        } else {
            return;
        }
    };
};

// update customer
window.editStudent = (code) => {
    resetForm();
    getElement("exampleModalLabel").innerHTML = "Edit Info Customer";
    getElement("btnSubmitCustomer").style.display = "none";
    getElement("btnUpdateCustomer").style.display = "block";
    getElement("btn-reset-modal").style.display = "none";

    getElement("Code").disabled = true;

    const customer = listCustomer.listCustomer.find((c) => c.code === code);

    getElement("Name").value = customer.name;
    getElement("Address").value = customer.address;
    getElement("Code").value = customer.code;
    getElement("Email").value = customer.email;
    getElement("nameCompany").value = customer.nameCompany;
    getElement("orderValue").value = customer.orderValue;
    getElement("feedBack").value = customer.feedBack;

    getElement("btnUpdateCustomer").onclick = () => {
        const updatedCustomer = getInfoCustomer();
        const customerIndex = listCustomer.listCustomer.findIndex(
            (s) => s.code === code
        );
        var flag = check(updatedCustomer);

        if (flag) {
            listCustomer.updateCustomer(customerIndex, updatedCustomer);
            setLocalStorageData("customerList", listCustomer.listCustomer);
            renderCustomer();
            resetForm();
        } else {
            return;
        }
    };
};

// delete user
window.deleteCustomer = (code) => {
    listCustomer.deleteCustomer(code);
    setLocalStorageData("customerList", listCustomer.listCustomer);
    renderCustomer();
};

window.resetForm = () => {
    const form = document.getElementById("formCustomer");
    form.reset();
};

getElement("btn-reset-modal").onclick = function () {
    resetForm();
};

let isSort = true;
const sortCustomerListByName = () => {
    listCustomer.listCustomer.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (isSort) {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });
    isSort = !isSort;
    renderCustomer();
};

getElement("btn-sort").onclick = () => {
    sortCustomerListByName();
};
