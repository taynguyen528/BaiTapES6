class EmployeeList {
    constructor() {
        this.listEmployee = [];
    }

    addNewEmployee(student) {
        this.listEmployee.push(student);
    }

    deleteEmployee(code) {
        const index = this.listEmployee.findIndex(
            (student) => student.code === code
        );
        if (index !== -1) {
            this.listEmployee.splice(index, 1);
        }
    }

    updateEmployee(index, student) {
        if (index !== -1) {
            this.listEmployee[index] = student;
        }
    }

    findCodeEmployee(code) {
        for (const student of this.listEmployee) {
            if (code === student.code) {
                return true;
            }
        }
        return false;
    }
}

export default EmployeeList;
