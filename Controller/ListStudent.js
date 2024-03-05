class StudentList {
    constructor() {
        this.listStudent = [];
    }

    addNewStudent(student) {
        this.listStudent.push(student);
    }

    deleteStudent(code) {
        const index = this.listStudent.findIndex(
            (student) => student.code === code
        );
        if (index !== -1) {
            this.listStudent.splice(index, 1);
        }
    }

    updateStudent(index, student) {
        if (index !== -1) {
            this.listStudent[index] = student;
        }
    }

    findCodeStudent(code) {
        for (const student of this.listStudent) {
            if (code === student.code) {
                return true;
            }
        }
        return false;
    }
}

export default StudentList;
