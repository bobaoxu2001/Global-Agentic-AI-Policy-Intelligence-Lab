# Golden 8 preview release report

**Release class:** interview research preview, not final legal publication  
**Prepared and reviewed by:** Codex  
**Review basis:** AI-assisted primary-source verification  
**Human owner review:** pending unless separately evidenced in `OWNER_SIGNOFF_LOG`

## Included preview corpus

Six instruments and two provisions: `eu-gdpr`, `eu-gdpr:art22`, `us-co-sb26-189`, `us-eo-14179`, `cn-ai-labeling-measures`, `cn-genai-interim-measures`, `cn-genai-interim-measures:art9`, and `sg-mgf-genai`.

The preview profile loads six required Tier 1 source records, three controls, and four provision-control mappings. It excludes all unrelated corpus records, including the unreviewed Colorado developer-disclosure child provision.

## High-confidence corrections

- Added the exact GDPR Article 22(1) quote, including “based solely on automated processing” and the legal/similarly-significant effects conditions.
- Narrowed the GDPR Article 22 human-review inference and recommendation so neither claims a blanket ban or a legal-compliance outcome.
- Narrowed China Article 9’s English interpretation: it assigns duties to the provider but does not alone settle every vendor/deployer/user allocation.

## Release boundaries

- `BUILD_PROFILE=preview` is explicitly non-production and always displays the persistent AI-assisted research disclosure.
- `BUILD_PROFILE=production` still accepts only formally human-approved `published` records; AI-assisted preview approval never promotes a record.
- Singapore MGF-GenAI carries its context-only/no-provision-mapping caveat.
- Colorado SB26-189 states that associated excluded provisions remain outside the preview.

See `docs/research/GOLDEN_8_REVIEW_MANIFEST.json`, the evidence register, and open-issues register for the record-level basis.
