const { execFileSync } = require('node:child_process');

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';

if (process.env.VERCEL === '1' && process.env.VERCEL_ENV === 'production') {
  execFileSync(npx, ['prisma', 'migrate', 'deploy'], { stdio: 'inherit' });
}

execFileSync(npx, ['next', 'build'], { stdio: 'inherit' });
