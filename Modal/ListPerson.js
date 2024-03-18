class ListPerson {
    constructor() {
        this.users = [];
    }

    sortByName() {
        this.users.sort((a, b) => a.name.localeCompare(b.name));
    }

    filterByType(type) {
        return this.users.filter((user) => user instanceof type);
    }
}

export default ListPerson;
