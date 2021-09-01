const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Rendering function
// const render = require("./lib/htmlRenderer");
// Alternative rendering function
const render = require("./lib/page-template.js");


const teamMembers = [];
// Create an id array to store the ids.
// This array will be used to check the potential duplicate id newly entered by user
const idArray = [];

function appMenu() {
  //create manager first, then the manager will create a team
  //once manager is created, we will create team by asking the user which type of employee to create
  //based on the choice, we will create that employee object
  //loop throu 

  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      //
      // YOUR CODE HERE:
      // CREATE OBJECTS OF QUESTIONS HERE FOR MANAGER
      // Strongly recommend to add validate property function for id and email
      //
      {
        type: "input",
        name: "Name",
        message: "What is your name?"
      },
      {
        type: "input",
        name: "Manager ID",
        message: "Please enter your manager ID?"
      },
      {
        type: "input",
        name: "Email",
        message: "Please enter your email address."
      },
      {
        type: "input",
        name: "Manager Office Number",
        message: "Please enter your Manager Office Number."
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
        //to contain the manager's choicein this .then
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "Name",
        message: "Please enter your name."
      },
      {
        type: "input",
        name: "ID",
        message: "Please enter your company ID."
      },
      {
        type: "input",
        name: "Email",
        message: "Please enter your email address."
      },
      {
        type: "input",
        name: "GitHub",
        message: "Please enter your GitHub username."
      },
    ]).then(answers => {
      const engineer = new engineer (answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGitHub);
      teamMembers.push(engineer);
      idArray.push(engineerID);
      //
      // YOUR CODE HERE
      // 1. CREATE A VARIABLE TO STORE THE ENGINEER OBJECT INSTANTIATED WITH THE ENGINEER CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS
      //    TO THE ENGINEER CLASS CONSTRUCTOR
      // 2. ADD (PUSH) THE ENGINEER VARIABLE TO the teamMembers ARRAY
      // 3. ADD (PUSH) THE ENGINERR ID TO THE idArray ARRAY
      //

      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
     {
       type: "input",
       name: "Name",
       message: "Please enter your name?"
     },
     {
       type: "input",
       name: "ID",
       message: "Please enter your company ID",
     },
     {
       type: "input",
       name: "Email",
       message: "Please enter your email address"
     },
     {
       type: "input",
       name: "School",
       message: "Please enter your educational institution."
     },
    ]).then(answers => {
      const intern = new intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      idArray.push(internID);
  
      createTeam();
    });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();

}


appMenu();
