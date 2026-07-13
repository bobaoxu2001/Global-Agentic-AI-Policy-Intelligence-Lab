import { spawnSync } from 'node:child_process';

const vercelEnvironment = process.env.VERCEL_ENV;
const profile = process.env.BUILD_PROFILE;
const expectedProfile = vercelEnvironment === 'preview' ? 'preview' : vercelEnvironment === 'production' ? 'production' : null;
if (!expectedProfile) throw new Error('build:vercel is fail-closed: VERCEL_ENV must be preview or production. Use explicit local build scripts outside Vercel.');
if (profile !== expectedProfile) throw new Error(`VERCEL_ENV=${vercelEnvironment} requires BUILD_PROFILE=${expectedProfile}; received ${profile ?? 'undefined'}.`);
const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', `build:${expectedProfile}`], { stdio: 'inherit', env: process.env });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
