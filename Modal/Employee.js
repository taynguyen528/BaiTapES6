import Person from "./Person.js";

class Employee extends Person {
    constructor(name, address, email, code, workDays, dailySalary) {
        super(name, address, email, code);
        this.workDays = workDays;
        this.dailySalary = dailySalary;
    }

    salary = () => {
        return this.workDays * this.dailySalary;
    };
}

export default Employee;
