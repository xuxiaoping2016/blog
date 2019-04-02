// 通过node来执行

const program = require("commander")

program
//设置当前脚本的版本信息,会自动给当前命令添加-v, --version的选项
  .version('0.1.0', '-v, --version')
  .option('-i, --init', 'init something')
  .option('-g, --generate', 'generate something')
  .option('-r, --remove', 'remove something');

program.parse(process.argv)
