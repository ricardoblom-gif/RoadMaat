const { execFileSync } = require('node:child_process');

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';

execFileSync(npx, ['next', 'build'], { stdio: 'inherit' });
