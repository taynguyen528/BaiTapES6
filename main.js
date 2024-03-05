import ListPerson from "./Modal/ListPerson.js";
import Person from "./Modal/Person.js";
import Student from "./Modal/Student.js";
import Employee from "./Modal/Employee.js";
import Customer from "./Modal/Customer.js";
const userList = new ListPerson();
const student1 = new Student(
    "John Doe",
    "123 Main St",
    "S001",
    "john@example.com",
    80,
    75,
    90
);
const student2 = new Student(
    " Doe",
    "123 Main St",
    "S002",
    "john@example.com",
    80,
    75,
    90
);
const employee1 = new Employee(
    "Jane Smith",
    "456 Oak St",
    "E001",
    "jane@example.com",
    20,
    50
);
const customer1 = new Customer(
    "Acme Corp",
    "789 Pine St",
    "C001",
    "acme@example.com",
    "Acme Corp",
    10000,
    "Good service"
);

userList.addUser(student1);
userList.addUser(student2);

userList.addUser(employee1);
userList.addUser(customer1);

console.log(userList);
