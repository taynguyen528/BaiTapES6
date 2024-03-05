class CustomerList {
    constructor() {
        this.listCustomer = [];
    }

    addNewCustomer(customer) {
        this.listCustomer.push(customer);
    }

    deleteCustomer(code) {
        const index = this.listCustomer.findIndex(
            (customer) => customer.code === code
        );
        if (index !== -1) {
            this.listCustomer.splice(index, 1);
        }
    }

    updateCustomer(index, customer) {
        if (index !== -1) {
            this.listCustomer[index] = customer;
        }
    }
}

export default CustomerList;
