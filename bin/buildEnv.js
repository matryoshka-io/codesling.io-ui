const fs = require('fs');
const _ = require('lodash');

const config = require('../config/.env');
const environment = process.argv[2]

if (!config[environment]) {
  console.log('Could not find a configuration for the environment provided');
  process.exit(1);
} else {
  console.log(`ENV:  Building environment for ${environment}`)
}

const createENVFile = (directory, variables) => {
  _.each(variables, (variable) => {
    fs.appendFileSync(`./${directory}/.env`, variable + '\n');
  })
}

const buildEnv = () => {
  _.each(config[environment], (value, key) => {
    fs.writeFileSync(`./${key}/.env`, '')
    createENVFile(key, value);
  });
}

buildEnv();
