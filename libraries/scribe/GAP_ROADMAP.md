# @sitebender/scribe — Reality Gap & Hardening Roadmap

> Purpose: Canonical, code-grounded report of what exists vs. what is claimed, with a phased plan + anti-fabrication safeguards. Use this to review AI output, reject hand-waving, and demand artifact-based proof.

---
## 1. Executive Summary
Scribe **does generate** basic Markdown docs for the *first* function in a file: signature, a crude description (single preceding `//`), heuristic properties (purity, currying, complexity, speculative math traits). Everything else in the README that implies richer automation (multi‑function support, verified mathematical laws, examples from tests, related discovery, comment taxonomy) is **not implemented yet**.

Current value: prototype pipeline proving feasibility, NOT a trustworthy documentation authority.

Primary risks: heuristic false positives, silent omissions (other functions ignored), aspirational README could mislead, no provenance/confidence metadata, no anti-fabrication guardrails.

---
## 2. Implemented vs. Claimed
| Capability | README / Aspirational Claim | Actual Implementation | Risk Level | Action |
|------------|-----------------------------|-----------------------|------------|--------|
| Single-line description | Extracted automatically | YES (only first function, plain `//`) | Low | Expand taxonomy
| Signature extraction | Full TypeScript signature | Partial (regex + crude AST path) | Med | Delegate to parser lib
| Multi-function files | All functions documented | Only first function | High | Iterate exports
| Comment taxonomy (`// //++ //?? //-- //!!`) | Drives docs, examples, tech debt, critical issues | PARTIAL (missing //!!) | High | Add scanner
| Example extraction (comments) | Automatic & validated | NOT IMPLEMENTED | High | Phase 1
| Example extraction (tests) | Harvest from tests | NOT IMPLEMENTED | High | Phase 2
| Mathematical properties | Proven by Prover | Heuristic name/token guesses | High (false claims) | Gate & annotate
| Complexity analysis | AST-based classification | Heuristic loops/keywords | Med | Add metrics + confidence
| Purity detection | Accurate AST analysis | Heuristic + AST path | Med | Add rationale
| Determinism | Independent detection | Tied = purity | Med | Separate logic
| Null handling strategy | Classified | Always "unknown" | Low | Implement scan
| Related functions | Automatic discovery | Empty array | Med | Basic co-occurrence
| HTML / JSON parity | Fully supported | Markdown only (HTML fallback) | Low | Implement templates
| Tech debt extraction | `//--` aggregated | NOT IMPLEMENTED | Med | Add extractor
| Critical issue extraction | `//!!` with categories | NOT IMPLEMENTED | High | Add extractor
| Proof integration | Formal verification | None | High | Defer until Prover ready
| Confidence / rationale | Transparent | None | High | New detector contract
| Integration tests | Behavior-level | Missing (unitish only) | Med | Add golden tests
| Parser delegation | Uses shared parser lib | Direct TypeScript usage | Med | Refactor

---
## 3. Phase Plan
### Phase 1 (Hardening & Honesty)
- Multi-function support (emit doc per export).
- Comment taxonomy scanner (`//` regular, `//++` description, `//??` examples, `//--` tech debt, `//!!` critical issues).
- Critical issue extraction with categories (SECURITY, PERFORMANCE, CORRECTNESS, INCOMPLETE, BREAKING).
- Example extraction (comment examples) + execution validation.
- Detector contract: value, confidence (0–1), rationale[], evidence[].
- Markdown includes confidence & heuristic labels (e.g., `Commutative (heuristic, 0.35)`).
- Golden integration tests (sample inputs → locked outputs).
- Anti-fabrication scripts (test authenticity, doc drift, property claim audit).
- README status table with Implemented / Prototype / Planned columns.

### Phase 2 (Feature Completion)
- AST-only unified detectors (remove regex duplication).
- Determinism & null strategy detectors.
- Related discovery v1 (same folder + shared param shape + name similarity).
- HTML formatter parity; JSON schema version tag.
- Complexity metrics w/ confidence.
- Example harvesting from tests (literal call patterns).

### Phase 3 (Verification & Insight)
- Prover integration (replace heuristics → proofs).
- Law status upgrade: unknown → heuristicTrue → provenTrue / disproven.
- Tech debt report artifact generation (`tech_debt.json`).
- Coverage ignore auditor (reason quality).

### Phase 4 (Ecosystem Integration)
- Replace internal AST parsing with shared parser library.
- Foundry-powered example synthesis fallback.
- Cross-library related linking (toolkit ↔ components).
- CLI batch mode (whole repo docs + summary index).

---
## 4. Detector Result Contract (Target)
```ts
interface DetectorRationale {
  kind: string;          // e.g. "token-match", "name-heuristic", "loop-pattern"
  snippet: string;       // Source excerpt or token
  line?: number;
  weight?: number;       // Contribution to confidence
}

interface DetectorResult<T = boolean> {
  value: T;              // Classification or computed value
  confidence: number;    // 0–1 (heuristics start low)
  rationale: DetectorRationale[]; // Empty rationale => reject claim
  status?: 'heuristic' | 'proven' | 'disproven' | 'unknown';
  notes?: string[];      // Edge-case commentary
}
```

Documentation output should transform:
```
**Properties:** Pure (0.95) | Curried (2 levels, 0.90) | Commutative (heuristic 0.30)
```

---
## 5. Comment Taxonomy Specification (Five-Tier System)
| Marker | Placement | Purpose | Priority | Extraction Rule |
|--------|-----------|---------|----------|------------------|
| `//` | Anywhere | Regular comment | None | Not extracted |
| `//++` | Above function | 1-line intent | Neutral/positive | First contiguous block above declaration (stop on blank/non-comment) |
| `/*++ ... */` | Above | Multi-line intent (rare) | Neutral/positive | Strip decoration, collapse whitespace |
| `//??` | Below function | Help information | Neutral/informative | Format: `//?? [CATEGORY] content` |
| | | Categories: `[EXAMPLES]` (default), `[SETUP]`, `[ADVANCED]`, `[GOTCHAS]`, `[MIGRATION]` | | (case-insensitive) |
| `/*?? ... */` | Below | Multi-line help | Neutral/informative | Each line parsed with category |
| `//--` | Inside function | Tech debt justification | Negative but acceptable | Format: `//-- [CATEGORY] reason` |
| | | Categories: `[WORKAROUND]`, `[LIMITATION]`, `[OPTIMIZATION]`, `[REFACTOR]`, `[COMPATIBILITY]` | | (case-insensitive) |
| `//!!` | Inside function | Critical issue | Critical/urgent - blocks release | Format: `//!! [CATEGORY] Description` |
| `/*!! ... */` | Inside | Multi-line critical | Critical/urgent - blocks release | Extract category and full description |

Validation rules:
- Help examples (`[EXAMPLES]`) must evaluate without throwing (sandboxed) if deterministic.
- Duplicate examples (same code) are de-duplicated.
- Help categories are case-insensitive and optional (defaults to `[EXAMPLES]`).
- Tech debt requires >= 10 chars explanation.
- Critical issues require description (empty = diagnostic error).
- Missing `//++` → doc flagged `MISSING_INTENT`.
- Multiple `//!!` in same function → warning diagnostic.

---
## 6. Anti-Fabrication Safeguards
| Safeguard | Mechanism | Failure Condition |
|-----------|-----------|-------------------|
| Test authenticity audit | Scan test AST for missing assertions / trivial `return true` | Fails CI if any test body lacks an assertion call |
| Property claim audit | Detector must supply rationale entries | Any claimed property with empty rationale |
| Golden output lock | Regenerate docs → diff with committed golden files | Unexpected diff without accompanying code change |
| Coverage gate | 100% or explicit ignore w/ reason regex | Missing reason or coverage < 100% |
| Provenance hash | Embed detector version + git hash in doc footer | Hash mismatch vs regeneration |
| Example executor | Run extracted examples; compare expected outputs | Example mismatch → doc generation fails |
| Commit template enforcement | Hook validates required sections (Motivation / Changes / Tests / Coverage Delta) | Template violation |

---
## 7. Immediate Action Items (Phase 1 Start)
- [ ] Implement comment taxonomy scanner.
- [ ] Add multi-function enumeration (collect exported names).
- [ ] Create integration test fixture file with: multiple functions, currying, recursion, heuristically misleading names.
- [ ] Add golden Markdown snapshots.
- [ ] Introduce detector result wrapper (shim before refactor).
- [ ] Implement test authenticity audit script (added: `scripts/audit-tests`).
- [ ] Add README status matrix.
- [ ] Add documentation footer with provenance (detector versions & timestamp).
- [ ] Add CI script to diff regenerated docs vs golden.

---
## 8. Heuristic Property Integrity
Current heuristics (high false positive risk):
- Name/token based math properties (commutative, associative, distributive, idempotent).
Mitigation until Prover:
1. Downgrade output label: `Commutative? (heuristic)`.
2. Require min confidence threshold (≥0.6) to display without question mark.
3. Provide `why:` bullet list under a collapsible section (HTML mode) or footnotes (Markdown).

---
## 9. Complexity Confidence Model (Planned)
Metrics to compute:
| Metric | Meaning |
|--------|---------|
| loopDepthMax | Nesting depth of iterative constructs |
| loopCount | Total loops / array-iteration calls |
| recursionCount | Self calls count |
| sortCalls | Presence of `.sort` |
| dividePattern | Occurrence of halving / bitshifts |

Confidence heuristic (example):
```
if (binarySearchPattern && dividePattern) => O(log n), confidence 0.85
else if (loopDepthMax === 2) => O(n²), confidence 0.75
else if (loopDepthMax === 0 && !recursion) => O(1), confidence 0.90
```

---
## 10. Related Function Discovery (v1)
Ranking signals (weighted):
- Same directory (0.3)
- Shared parameter count & types (0.2)
- Name stem overlap (0.3) (`add`, `adder`, `addition`)
- Shared imported helper usage (0.2)
Score threshold: ≥0.45 to include.

---
## 11. Tech Debt Extraction Format
`tech_debt.json` (aggregated):
```json
{
  "generatedAt": "2025-09-07T12:34:56Z",
  "files": [
    {
      "file": "src/detectors/detectPurity/index.ts",
      "entries": [
        { "line": 42, "marker": "//--", "reason": "Using heuristic fallback for assignment parsing" }
      ]
    }
  ]
}
```

---
## 12. README Status Table (Template)
| Feature | Status | Notes |
|---------|--------|-------|
| Signature extraction | Implemented (basic) | Regex + partial AST |
| Multi-function docs | Planned | Phase 1 |
| Comment taxonomy | Planned | Phase 1 |
| Examples (comments) | Planned | Phase 1 |
| Examples (tests) | Planned | Phase 2 |
| Math property proofs | Planned | Needs Prover |
| Complexity (confidence) | Planned | Phase 2 |
| Related discovery | Planned | Phase 2 |
| Null handling | Planned | Phase 2 |
| Determinism (separate) | Planned | Phase 2 |
| Tech debt report | Planned | Phase 3 |
| Prover integration | Planned | Phase 3 |

---
## 13. Reviewing AI Contributions Checklist
Before accepting an AI PR / patch:
- [ ] Does every new exported symbol have at least one test referencing it?
- [ ] Did golden docs change? If yes, is there a corresponding code delta & rationale?
- [ ] Any property claims without rationale? Reject.
- [ ] Are examples executable & validated? (Run example harness.)
- [ ] Are new ignores documented with specific reasons?
- [ ] Coverage 100% after changes?
- [ ] Commit message includes Motivation / Behavior / Tests / Coverage.

Reject on ANY failure. Do not negotiate with heuristic terrorists.

---
## 14. Commands (Once Scripts Land)
```bash
# Audit tests for authenticity
deno run --allow-read libraries/scribe/scripts/audit-tests/index.ts

# Regenerate docs (future CLI)
# deno run --allow-read --allow-write libraries/scribe/scripts/generate-all/index.ts

# Check golden differences
# deno task docs:diff
```

---
## 15. Minimal Future Detector Wrapper (Sketch)
```ts
export function wrapDetector(name: string, fn: (src: string) => boolean): (src: string) => DetectorResult<boolean> {
  return (src) => {
    try {
      const value = fn(src)
      return { value, confidence: 0.4, rationale: value ? [{ kind: 'legacy', snippet: name }] : [], status: 'heuristic' }
    } catch (e) {
      return { value: false, confidence: 0, rationale: [{ kind: 'error', snippet: String(e) }], status: 'unknown' }
    }
  }
}
```

---
## 16. Non-Negotiables Going Forward
1. No silent property assertions.
2. No undocumented heuristic decisions.
3. Every feature progression must add tests + golden fixtures.
4. Every omission is explicit (status tables kept current).
5. Provenance + reproducibility > convenience.

---
## 17. Appendix: Why This Exists
This document *stops* AI assistants from bluffing. It converts ambiguity into verifiable contracts. If future contributions deviate, you have a single source of truth to cite.

> Trust is earned by repeatable evidence, not claims.
