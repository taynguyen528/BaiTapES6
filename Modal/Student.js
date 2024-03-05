import Person from "./Person.js";

class Student extends Person {
    constructor(name, address, email, code, math, physics, chemistry) {
        super(name, address, email, code);
        {
            this.math = math;
            this.physics = physics;
            this.chemistry = chemistry;
        }
    }

    average = () => {
        return (+this.math + +this.physics + +this.chemistry) / 3;
    };
}

export default Student;
