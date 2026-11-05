import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { TRANSLATIONS } from '../../lib/i18n/translations';

const pageSource = fs.readFileSync(path.join(process.cwd(), 'src/app/risk-management/page.tsx'), 'utf8');

const officialHosts = new Set([
  'airc.nist.gov',
  'www.nist.gov',
  'nvlpubs.nist.gov',
  'www.tencent.com',
  'static.www.tencent.com',
  'cloud.tencent.com',
  'www.codebuddy.ai',
]);

describe('applied AI risk-management methodology', () => {
  it('keeps the four canonical functions in order with explicit epistemic layers', () => {
    const functions = [...pageSource.matchAll(/data-rmf-function="([a-z]+)"/g)].map((match) => match[1]);
    expect(functions).toEqual(['govern', 'map', 'measure', 'manage']);
    expect(pageSource.match(/data-epistemic-kind="fact"/g)).toHaveLength(5);
    expect(pageSource.match(/data-epistemic-kind="proposal"/g)).toHaveLength(5);
    expect(pageSource.match(/data-epistemic-kind="question"/g)).toHaveLength(4);
  });

  it('uses canonical official sources and safe external-link attributes', () => {
    const hrefs = [...pageSource.matchAll(/href="(https:\/\/[^"#]+)"/g)].map((match) => match[1]!);
    expect(hrefs).toContain('https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10');
    expect(hrefs).toContain('https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf');
    expect(hrefs).toContain('https://www.nist.gov/itl/ai-risk-management-framework');
    expect(hrefs).toContain('https://www.tencent.com/our-actions/social/tencent-responsible-ai-principles/');
    expect(hrefs).toContain('https://www.tencent.com/tencent-hunyuan-officially-releases-hy3-advancing-agent-capabilities-and-deeper-product-integration/');
    expect(hrefs).toContain('https://cloud.tencent.com/document/product/1729/104753');
    expect(hrefs.length).toBeGreaterThanOrEqual(10);

    for (const href of hrefs) expect(officialHosts.has(new URL(href).hostname), href).toBe(true);
    expect(pageSource.match(/<a[^>]+href="https:\/\/[^>]+\{\.\.\.externalLinkProps\}/g)).toHaveLength(hrefs.length);
    expect(pageSource).toContain("rel: 'noreferrer noopener'");
  });

  it('keeps the adoption and effectiveness boundary visible in every interface language', () => {
    const boundary = TRANSLATIONS['rmf.boundary.text'];
    expect(boundary).toBeDefined();
    expect(boundary!.zh).toContain('不声称腾讯已采用');
    expect(boundary!.es).toContain('no afirma que Tencent haya adoptado');
    expect(boundary!.pt).toContain('não afirma que a Tencent adotou');
    expect(pageSource).toContain('currently being revised');
    expect(pageSource).toContain('not evidence that disclosed controls are effective');
    expect(pageSource).toContain('2026-08-07');
  });
});
