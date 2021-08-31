const Employee = require('./Employee');

class Engineer extends Employee {

    constructor (name, id, email, gitHub) {
        super(name, id, email);
        this.GitHub = gitHub; 
    }

    getRole() {
        return "Engineer";
    }

    getGitHub () {
        return this.GitHub;
    }
}

module.exports = Engineer;