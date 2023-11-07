import { Command } from 'commander';
import { translate } from './translate';
const program = new Command();

program.version('0.0.1')
  .name('fy')//翻译
  .usage('<word>')
  .argument('<word>')
  .action((word) => {
    console.log(word);
    // 翻译函数
    translate(word)
  })
  .parse(process.argv);

// program
//   .option('-d, --debug', 'output extra debugging')
//   .option('-s, --small', 'small pizza size')
//   .option('-p, --pizza-type <type>', 'flavour of pizza');

// program.parse(process.argv);

// const options = program.opts();
// if (options.debug) console.log(options);
// console.log('pizza details:');
// if (options.small) console.log('- small pizza size');
// if (options.pizzaType) console.log(`- ${options.pizzaType}`);