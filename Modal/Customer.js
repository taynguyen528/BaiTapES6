import Person from "./Person.js";

class Customer extends Person {
    constructor(name, address, email, code, nameCompany, orderValue, feedBack) {
        super(name, address, email, code);
        this.nameCompany = nameCompany;
        this.orderValue = orderValue;
        this.feedBack = feedBack;
    }
}

export default Customer;
