#! /usr/bin/env node
import * as fs from 'node:fs/promises';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import path from 'path';
import { fileURLToPath } from 'url';
import shell from 'shelljs';
// var shell = require("shelljs");

/**
 *
 *
       _____  .__                   ___________           .__
      /     \ |__| ___________  ____\_   _____/_ __  _____|__| ____   ____
     /  \ /  \|  |/ ___\_  __ \/  _ \|    __)|  |  \/  ___/  |/  _ \ /    \
    /    Y    \  \  \___|  | \(  <_> )     \ |  |  /\___ \|  (  <_> )   |  \
    \____|__  /__|\___  >__|   \____/\___  / |____//____  >__|\____/|___|  /
            \/        \/                 \/             \/               \/
 * */
console.log('HELLO WORLD, This is Microfusion');

// eslint-disable-next-line no-console
console.log(`       
   _____  .__                   ___________           .__               
  /     \\ |__| ___________  ____\\_   _____/_ __  _____|__| ____   ____   
 /  \\ /  \\|  |/ ___\\_  __ \\/  _ \\|    __)|  |  \\/  ___/  |/  _ \\ /    \\  
/    Y    \\  \\  \\___|  | \\(  <_> )     \\ |  |  /\\___ \\|  (  <_> )   |  \\ 
\\____|__  /__|\\___  >__|   \\____/\\___  / |____//____  >__|\\____/|___|  / 
        \\/        \\/                 \\/             \\/               \\/  

`);

const usage = '\nUsage: microfusion';
// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const TEMPLATES_PATHS = {
  CONTAINER: `${__dirname}/../microfrontends-template/container_boilerplate`,
  MICROFRONTEND: `${__dirname}/../microfrontends-template/microfrontend_boilerplate`,
};

const replaceInFile = async (filePath, replaceExpression, newExpression) => {
  console.log('reade file: ', filePath);

  const originalContent = await fs.readFile(filePath, { encoding: 'utf-8' });
  console.log(originalContent);
  const updatedContent = originalContent.replace(replaceExpression, newExpression);
  console.log(updatedContent);
  return fs.writeFile(
    filePath,
    updatedContent,
    'utf-8',
    (errorWritingFile) => {
      if (errorWritingFile) {
        console.log(errorWritingFile);
      }
    },
  );
};

const camelize = (str) => str.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase());

const createBasicContainerStructure = async (projectName) => {
  const newFolderPath = `./${projectName}/mf_container_${projectName}`;
  // 1. Create directory and Copy template
  await fs.cp(TEMPLATES_PATHS.CONTAINER, newFolderPath, { recursive: true }, () => console.error('[ERROR] - Could not create the project'));
  // 2. Edit an replace project names
  // 2.1 replace package.json
  console.log('[MICROFUSION - INFO]', 'Update Package.json');
  replaceInFile(`${newFolderPath}/package.json`, '[container]', `Container${camelize(projectName)}`);
  // 2.2 replace webpack config
  replaceInFile(`${newFolderPath}/webpack.config.js`, '[container]', `Container${camelize(projectName)}`);
  // 2.3 replace index
  // 2.4 Replace bootstrap
  // 3. Install dependencies in container project
  shell.exec('echo ...[MICROFUSION - INFO] running npm install inside container...');
  shell.exec(`npm --prefix ${newFolderPath} install`);
};

const createBasicMicrofrontendStructure = async (projectName, microfrontendName) => {
  const newMicrofrontendFolderPath = `./${projectName}/mf_${projectName}_${microfrontendName}`;
  // 1. Create directory
  // fs.mkdir(newMicrofrontendFolderPath, { recursive: true });
  // 2. Copy template files
  await fs.cp(TEMPLATES_PATHS.CONTAINER, newMicrofrontendFolderPath, { recursive: true }, () => console.error('[ERROR] - Could not create the project'));
  // 3. Edit and replace project names

  // 4. Install dependencies in microfrontend project
  shell.exec('echo ...[MICROFUSION - INFO] running npm install inside microfrontend...');
  shell.exec(`npm --prefix ${newMicrofrontendFolderPath} install`);
};

const generateProject = async (argv) => {
  console.log('[MICROFUSION - INFO]', 'Generate microfrontends');

  console.log({ __dirname });
  const { project_name: projectName } = argv;
  console.log('args', projectName);
  // create project directory
  fs.mkdir(projectName);
  await createBasicContainerStructure(projectName);
  // await createBasicMicrofrontendStructure(projectName, 'microfrontend_01');
  // await createBasicMicrofrontendStructure(projectName, 'microfrontend_02');
};

const COMMANDS = {
  GENERATE: generateProject,
  ADD_MICROFRONTEND: () => {
    console.log('Add microfrontends');
  },
  ADD_SHARED_DEPENDENCY: () => {
    console.log('Add shared dependency');
  },
  RUN_PROJECT: () => {
    console.log('Run project');
  },
  PUBLISH_PROJECT: () => {
    console.log('Publish project');
  },
};

const yargsObj = yargs(hideBin(process.argv));

const options = yargsObj
  .usage(usage).command(
    'generate <project_name>',
    'Generate a microfrontends project',
    () => {},
    COMMANDS.GENERATE,
  )
  .option(
    'n',
    {
      alias: 'name',
      describe: 'name',
      type: 'boolean',
    },
  )
  .help(true)
  .argv;

console.log(options);

/*
1- Recibir la opcion y adicionar condicionales segun opcion recibida
2- Escribir archivos de webpack minimos para un proyecto
3- Publicar a npm
4- pedir interactivamente los datos de los nombres del proyecto y de los microfrontends
 * */
