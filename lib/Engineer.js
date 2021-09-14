const Employee = require('./Employee');

class Engineer extends Employee {

    constructor (name, id, email, github) {
        super(name, id, email);
        this.Github = github; 
    }

    getRole() {
        return "Engineer";
    }

    getGithub () {
        return this.Github;
    }
}

module.exports = Engineer;