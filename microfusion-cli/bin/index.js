#! /usr/bin/env node
import * as fs from 'node:fs/promises';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

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

const COMMANDS = {
  GENERATE: (argv) => {
    console.log('[MICROFUSION - INFO]', 'Generate microfrontends');
    const { project_name: projectName } = argv;
    console.log('args', projectName);
    fs.mkdir(projectName);
    fs.mkdir(`./${projectName}/mf_microfrontend_01`, { recursive: true });
    fs.mkdir(`./${projectName}/mf_microfrontend_02`, { recursive: true });
  },
  ADD_MICROFRONTENDS: () => {
    console.log('Add microfrontends');
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
