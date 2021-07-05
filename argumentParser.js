const packageJson = require("./package.json"); //for version, description and author

const argumentParser = () => {
  const args = process.argv.slice(2);
  let dev = false;
  let install = false;
  if (args.includes("-h") || args.includes("-H")) return showHelp();
  if (args.includes("-v") || args.includes("-V")) return showVersion();
  if (args.includes("-d") || args.includes("-D")) dev = true;
  if (args.includes("-i") || args.includes("-I")) install = true;

  if (!dev && !install) {
    install = true;
  }
  return { dev, install };
};

const showHelp = () => {
  console.log(`Usage: ${packageJson.name} [options]

${packageJson.description}

Options:
  -v, -V  Output the version number
  -i, -I  Generate dependency script (default: false)
  -d, -D  Generate dev dependency script (default: false)
  -h, -H  Display help for command`);
  process.exit();
};
const showVersion = () => {
  console.log(`npm-i-copier : ${packageJson.version}`);
  process.exit();
};

module.exports = { argumentParser };
