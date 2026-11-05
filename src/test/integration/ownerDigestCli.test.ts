import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function runOwnerDigest(...args: string[]) {
  const result = spawnSync(
    npmCommand,
    ['run', '--silent', 'owner:digest', '--', ...args],
    {
      cwd: process.cwd(),
      encoding: 'utf8',
      env: { ...process.env, NO_COLOR: '1' },
      shell: false,
    },
  );

  if (result.error) throw result.error;
  return result;
}

describe('owner:digest CLI', () => {
  it('prints a revision-bound digest for a valid instrument', () => {
    const result = runOwnerDigest('instrument', 'eu-gdpr');

    expect(result.status).toBe(0);
    expect(result.signal).toBeNull();
    expect(result.stderr).toBe('');
    expect(JSON.parse(result.stdout)).toMatchObject({
      record_id: 'eu-gdpr',
      record_type: 'instrument',
      review_status: 'in_review',
      record_sha256: expect.stringMatching(/^[0-9a-f]{64}$/),
    });
  });

  it('reports a missing record and exits non-zero', () => {
    const result = runOwnerDigest('instrument', 'definitely-not-a-record');

    expect(result.status).toBe(1);
    expect(result.signal).toBeNull();
    expect(result.stdout).toBe('');
    expect(result.stderr).toContain('No instrument record found with id "definitely-not-a-record".');
  });

  it('rejects an invalid record type and exits non-zero', () => {
    const result = runOwnerDigest('invalid-record-type', 'eu-gdpr');

    expect(result.status).toBe(1);
    expect(result.signal).toBeNull();
    expect(result.stdout).toBe('');
    expect(result.stderr).toContain('Usage: npm run owner:digest --');
    expect(result.stderr).toContain('instrument|provision|assessment|changelog|control|control_provision_map');
  });
});
