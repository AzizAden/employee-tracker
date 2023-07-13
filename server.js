const prompts = require('./prompts');

const displayWelcomeMessage = () => {
  console.log(`Welcome to the Employee Tracker CLI
-----------------------------------`);
};

const initializeApp = () => {
  displayWelcomeMessage();
  prompts();
};

initializeApp();
