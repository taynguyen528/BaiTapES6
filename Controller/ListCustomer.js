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

  findCodeCustomer(code) {
    for (const customer of this.listCustomer) {
      if (code === customer.code) {
        return true;
      }
    }
    return false;
  }
  updateCustomer(index, customer) {
    if (index !== -1) {
      this.listCustomer[index] = customer;
    }
  }
}

export default CustomerList;
