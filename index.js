#!/usr/bin/env node

const { program } = require("commander");
const path = require("path");
const fs = require("fs");
const packageJson = require("./package.json");

const redColor = (message) => `\x1b[31m${message}\x1b[0m`;
const greenColor = (message) => `\x1b[32m${message}\x1b[0m`;
const yellowColor = (message) => `\x1b[33m${message}\x1b[0m`;

program
  .version(packageJson.version)
  .description(packageJson.description)
  .option("-i, --install", "Generate dependency script", false)
  .option("-d,--dev", "Generate dev dependency script", false)
  .parse();

let { install, dev } = program.opts();

if (!install && !dev) {
  install = true;
}

const currentPackageJsonPath = path.join(__dirname, "package.json");

if (!fs.existsSync(currentPackageJsonPath)) {
  console.log(
    redColor("No package.json found in current directory. Exiting...")
  );
  process.exit();
}

const currentPackageJson = JSON.parse(
  fs.readFileSync(currentPackageJsonPath, {
    encoding: "utf-8",
  })
);

if (install) {
  if (!currentPackageJson.dependencies) {
    console.log(redColor("No dependencies."));
    process.exit();
  }
  const dependencies = Object.keys(currentPackageJson.dependencies);
  console.log(
    `${yellowColor("Dependency script :")} ${greenColor(
      `npm i ${dependencies.join(" ")}`
    )}`
  );
}

if (dev) {
  if (!currentPackageJson.devDependencies) {
    console.log(redColor("No dev dependencies."));
    process.exit();
  }
  const devDependencies = Object.keys(currentPackageJson.devDependencies);
  console.log(
    `${yellowColor("Dev dependency script :")} ${greenColor(
      `npm i -D ${devDependencies.join(" ")}`
    )}`
  );
}
