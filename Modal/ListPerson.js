class ListPerson {
    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    deleteUserByCode(code) {
        this.users = this.users.filter((user) => user.code !== code);
    }

    updateUser(user) {}

    sortByName() {
        this.users.sort((a, b) => a.name.localeCompare(b.name));
    }

    filterByType(type) {
        return this.users.filter((user) => user instanceof type);
    }
}

export default ListPerson;
