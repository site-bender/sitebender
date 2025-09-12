# LATCH: Layered Architectural Trust & Contract Hardening

> Tagline (internal, aspirational): **“A self‑policing, hash‑locked contract graph for deterministic, enforceable library boundaries.”**  
> Status: NOT YET MARKETABLE (do **not** externally advertise until every unchecked box below is complete and validated).

## 1. Purpose
LATCH names the architectural system that:
- Models libraries as a **DAG of allowed dependencies** (contract graph) enforced automatically.
- Wraps all inter-library payloads in **cryptographically verifiable, immutable contract outputs**.
- Maintains **deterministic, reproducible state** via hashing (graph + exported API + public types + IR schemas).
- Continuously **self-polices** through integrity scripts and gating hooks (no manual trust, no silent drift).

## 2. Core Pillars
| Pillar | What It Means | Mechanism (Target) | Present Status |
| ------ | ------------- | ------------------ | -------------- |
| Layered Graph | Strict acyclic library dependency model | `boundaries.json` + graph hash gate | Partial (graph defined, no hash gate) |
| Contract Hardening | Immutable, validated boundary payloads | `ContractOutput<T>` + cryptographic hash + validation | Partial (freeze + weak checksum) |
| Self-Policing | Automated rejection of violations & drift | Pre-commit + integrity scripts + CI | Partial (hooks exist; scripts missing) |
| Hash-Locking | Canonical hashes gate architectural & API change | SHA-256 (or BLAKE3) across graph, APIs, types, IR | Not implemented |
| Determinism | Same inputs → same artifacts (Foundry, Parser, Prover) | PRNG seeds + snapshot hashes + replay | Partial (PRNG design listed) |
| Provenance | Traceable evolution of contracts & IR schemas | Change log + versioned schemas + migration notes | Not implemented |
| Canonical Algebra | Single, law-verified monad set to prevent divergence | Result/Option/AsyncResult/State + laws | Planned |

## 3. Truth-in-Tagline Gap Analysis
| Term | Claim | Currently True? | Required to Legitimize |
| ---- | ----- | --------------- | ----------------------- |
| Self‑Policing | System rejects violations automatically | Partially | Finish all integrity & reporting gates |
| Hash‑Locked | Cryptographic graph & surface hashes gate change | No | Implement SHA-256 hashing layers + gating |
| Contract Graph | Layered dependency DAG acts as enforceable contract | Yes | Add canonical serialization + hash |
| Deterministic | Re-running yields identical outputs | Partially | Determinism harness + replay artifacts |
| Enforceable Boundaries | Violations blocked before merge | Partially | Real pattern scanner + CI enforcement |

## 4. Completion Checklist (All Must Be Checked Before External Use)
### 4.1 Cryptographic Foundations
- [ ] Replace ad-hoc checksum in `createContractOutput` with SHA-256 (or BLAKE3) async hash.
- [ ] Add canonical contract graph serializer (sorted libraries + edges) → `contracts/graph.json`.
- [ ] Compute & persist `contracts/graph.hash` (SHA-256 hex) on update.
- [ ] Gate commits: graph hash change requires strategy change log entry.
- [ ] Implement API surface hash per library (export list normalized) → `api-{library}.hash`.
- [ ] Implement public type shape hash per library → `types-{library}.hash`.
- [ ] Implement IR schema hash (Parser, later Engine) with version bump rule.

### 4.2 Contract Output Adoption
- [ ] Inventory all current inter-library data flows (list file + function origins).
- [ ] Wrap every cross-library payload in `ContractOutput<T>` with metadata + hash.
- [ ] Add `validate()` calls at ingress points (consumer libraries) with fail-fast logging.
- [ ] Provide `docs/contracts/examples.md` with minimal usage & anti-pattern examples.
- [ ] Add audit script: fails if any cross-library import returns raw structures.

### 4.3 Integrity & Drift Scripts (under `scripts/integrity/`)
- [ ] `structureAudit` – one function/folder; no barrels.
- [ ] `importAudit` – grouping/order; forbid barrels & illegal upward imports.
- [ ] `commentAudit` – Envoy markers syntax + ledger of `//!!` & `//--`.
- [ ] `apiSnapshot` – stable export list diff + hash.
- [ ] `typeShapeLock` – stable public type schema hash.
- [ ] `determinismCheck` – Foundry PRNG & arbitraries double-run equality.
- [ ] `failingSeedReplay` – stored failing seeds reproduce identical counterexample.
- [ ] `graphHashGate` – contract graph hash change requires rationale.
- [ ] `irSchemaGate` – parser/engine IR schema diff requires version bump + migration note.
- [ ] Aggregator script `integrityReport` producing JSON + markdown summary.

### 4.4 Schema Governance
- [ ] Author `parser-ir.schema.json` (v1) with canonical field ordering.
- [ ] Add tolerant vs strict parsing mode invariants documented & enforced.
- [ ] Golden fixture corpus + snapshot diff gate.
- [ ] Migration template (`docs/ir-migrations/README.md`).
- [ ] Engine IR schema (when Engine resumes) `engine-ir.schema.json`.

### 4.5 Reporting & Enforcement
- [ ] Pre-commit hook integration for each script (fast-fail, parallelizable where safe).
- [ ] CI pipeline (GH Action) runs full integrity suite (including slower determinism tests).
- [ ] Upload integrity JSON artifacts (for future Envoy ingestion).
- [ ] Block merges on any critical severity violation.
- [ ] Severity taxonomy documented (`docs/integrity/severity.md`).

### 4.6 Monad Canon Hardening
- [ ] Canonical Result implementation (sync).
- [ ] Option (Maybe) implementation.
- [ ] AsyncResult (Promise-aware) with `fromPromise` / `toPromise` interop.
- [ ] State monad (minimal, law-tested) or deferred decision (documented).
- [ ] Law harness: Functor, Applicative, Monad, (Semi)Group/Monoid where relevant.
- [ ] No duplicate/variant monads outside toolkit (audit check).

### 4.7 Documentation & Provenance
- [ ] Add LATCH section reference inside `strategy.md` pointing to this file.
- [ ] Create `docs/latch-change-log.md` tracking graph/type/API hash changes & rationale.
- [ ] Add marketing-ready summary (public phrasing) in separate file once all complete.
- [ ] Internal FAQ (`docs/latch-faq.md`) covering design trade-offs & extension pattern.
- [ ] Diagram: contract graph (ASCII + optional PNG) auto-generated.

### 4.8 Governance & Exit Criteria
- [ ] All above tasks checked & verified.
- [ ] Final integrity run: zero warnings, zero unchecked TODOs.
- [ ] Architect sign-off recorded (signed line in change log).
- [ ] Tag repository pre-publicization: `latch-ready-v1`.

## 5. Implementation Order (Recommended)
1. Graph serialization + SHA-256 hashing (establish base contract digest).
2. Cryptographic upgrade of `ContractOutput`.
3. Structure + import audits (fast, high leverage early noise reduction).
4. API & type shape hashing (locks surfaces prior to broad build-out).
5. Parser IR schema + gate.
6. Determinism & replay harness (Foundry baseline) feeding Prover.
7. Remaining integrity scripts + aggregator.
8. Monad canon hardening + law harness (before broad consumption).
9. Documentation round + provenance logs.

## 6. Canonical Graph Serialization (Spec Draft)
```jsonc
{
  "version": 1,
  "libraries": [
    // lexicographically sorted
    "components", "engine", "envoy", "foundry", "mesh", "parser", "prover", "toolkit"
  ],
  "edges": [
    // sorted by `from`, then `to`
    { "from": "toolkit", "to": "foundry" },
    { "from": "toolkit", "to": "parser" },
    { "from": "toolkit", "to": "envoy" },
    { "from": "toolkit", "to": "prover" },
    { "from": "toolkit", "to": "maths" },
    { "from": "toolkit", "to": "engine" },
    { "from": "toolkit", "to": "components" },
    { "from": "toolkit", "to": "mesh" },
    // ... (continue for each allowed dependency explicitly)
  ]
}
```
Hash = SHA-256 of the **minified** JSON (UTF-8). No trailing newline. Line endings normalized to `\n`.

## 7. Comparable Prior Art (Why LATCH Is Distinct)
| System | Similarity | Difference |
| ------ | ---------- | ---------- |
| Bazel / Buck (hermetic builds) | Reproducible dependency graph | Focus on build steps, not runtime contract hashing or IR schema governance |
| Nix / Guix | Content-addressed immutability | Broader package environment; LATCH is intra-repo architectural governance |
| TUF / Sigstore | Cryptographic integrity/provenance | LATCH governs internal library boundaries & IR evolution, not distribution security |
| ESLint / TypeScript / API Extractor | Linting / type surface control | LATCH composes them + cryptographic graph + replay determinism layer |
| Go Module Graph / Cargo | Dependency DAG enforcement | LATCH adds immutable contract outputs + integrity script gating + IR schema versioning |

No widely adopted system brands this exact composite (library DAG + cryptographically locked contracts + IR schema governance + monad canon law harness) under a unified, self-policing umbrella.

## 8. Risks & Mitigations
| Risk | Impact | Mitigation |
| ---- | ------ | ---------- |
| Overhead / friction | Slower iteration early | Stage scripts (fast checks first), parallelize in CI |
| False positives in audits | Developer fatigue | Deterministic ordering + allow-list escapes with rationale |
| Hash churn noise | Review fatigue | Require rationale section; group related changes; tooling diff helpers |
| Under-adoption of `ContractOutput` | Incomplete guarantees | Audit script + failing gate until coverage 100% |
| Cryptographic cost | Minor perf cost | Hash only stable artifacts; cache on unchanged trees |

## 9. Public vs Internal Language
| Internal (Now) | External (Later) |
| -------------- | ---------------- |
| Self‑policing hash‑locked contract graph | Cryptographically enforced library architecture |
| Contract hardening | Verified immutable interfaces |
| Monad canon | Unified functional core primitives |
| Integrity scripts | Automated architectural assurance tooling |

## 10. Exit Statement Template (to be filled when ready)
```
LATCH v1 Ready (DATE)
Graph Hash: <hash>
APIs Locked: <count libraries>
Type Shapes Locked: <count>
IR Schemas: parser v<ver>, engine v<ver>
Determinism Harness: pass
All Integrity Scripts: pass
Architect Sign-off: <signature or initials>
```

## 11. Immediate Next Suggested Micro-Step
(If resuming toward LATCH) → Implement canonical graph serializer + hash (Task 4.1 #2-3) to provide the first immutable anchor.

---
**Do not claim “hash‑locked” publicly until every unchecked item above is complete.**

“Every architectural drift you prevent early saves an order of magnitude of toil later.” – Internal Maxim
