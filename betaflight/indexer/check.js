'use strict';

const path = require('path');
const child = require('child_process').fork(path.join(__dirname, 'indexer.js'), ["nosave"]);
child.on('exit', (code) => {
    process.exitCode = code;
});
