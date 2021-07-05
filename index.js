#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const { greenColor, redColor, yellowColor } = require("./util");
const { argumentParser } = require("./argumentParser");

let { install, dev } = argumentParser();

if (!install && !dev) {
  install = true;
}

const currentPackageJsonPath = path.join(process.cwd(), "package.json");

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
