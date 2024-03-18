const getLocalStorageData = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
};

const renderTable = (data, tableBodyId) => {
    const tableBody = document.getElementById(tableBodyId);
    let htmlContent = "";
    if (data) {
        data.forEach((item) => {
            htmlContent += `
                <tr>
                    <td>${item.code}</td>
                    <td>${item.name}</td>
                    <td>${item.address}</td>
                    <td>${item.email}</td>
                    <td>${item.type}</td> 
                </tr>
            `;
        });
    }
    tableBody.innerHTML = htmlContent;
};

const customerListData = getLocalStorageData("customerList");
const employeeListData = getLocalStorageData("employeeList");
const studentListData = getLocalStorageData("studentList");

const addTypeToData = (data, type) => {
    return data.map((item) => ({ ...item, type }));
};

const customerListDataWithType = addTypeToData(customerListData, "Customer");
const employeeListDataWithType = addTypeToData(employeeListData, "Employee");
const studentListDataWithType = addTypeToData(studentListData, "Student");

const allData = [
    ...customerListDataWithType,
    ...employeeListDataWithType,
    ...studentListDataWithType,
];

renderTable(allData, "tbodyMain");

window.filterUsers = () => {
    const selectedType = document.getElementById("userType").value;
    console.log(selectedType);
    let filteredData;

    if (selectedType === "all") {
        filteredData = allData;
    } else {
        filteredData = allData.filter((user) => user.type === selectedType);
    }

    renderTable(filteredData, "tbodyMain");
};
