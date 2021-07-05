// Color at the console.
const redColor = (message) => `\x1b[31m${message}\x1b[0m`;
const greenColor = (message) => `\x1b[32m${message}\x1b[0m`;
const yellowColor = (message) => `\x1b[33m${message}\x1b[0m`;

module.exports = { redColor, greenColor, yellowColor };
