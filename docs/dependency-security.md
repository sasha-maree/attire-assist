# Dependency Security

## Review: 2026-10-12

Updated Next.js and eslint-config-next to 16.3.8.
Applied compatible dependency fixes using npm audit fix.

Validation:
- Lint passed.
- TypeScript checks passed.
- All 20 tests passed.
- Production build passed.
- npm audit --omit=dev reported zero vulnerabilities.

## Remaining finding

The full audit reports five high-severity findings from one
development dependency chain:

eslint-config-next → @next/eslint-plugin-next → fast-glob
→ micromatch → braces

Advisory:
https://github.com/advisories/GHSA-vfj7-8cjw-p6xm

The finding remains unresolved. npm's proposed forced fix would
downgrade eslint-config-next to 14.2.35, mismatching Next.js 16.

Recheck for a compatible upstream fix before deployment and during
future dependency updates. A clean production dependency audit
does not establish that the entire application is secure.