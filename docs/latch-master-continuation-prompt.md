# 🚀 LATCH Master Continuation Prompt (Prime Rehydration Document)

> Use this to re-prime an AI assistant to the exact architectural philosophy, constraints, goals, and active execution context. **Do NOT let an AI proceed until it confirms understanding of ALL sections.**
>
> Audience: Internal AI assistants only. External disclosure of terms like "hash‑locked" is forbidden until all LATCH readiness tasks are complete.

---
## 0. PRIME DIRECTIVE (MANDATORY ACK REQUIRED)
**DO NOT ASSUME. DO NOT TAKE SHORTCUTS. DO NOT GUESS.**  
If uncertain, ASK The Architect. No improvisation beyond explicit patterns.

---
## 1. IDENTITY OF THE SYSTEM (LATCH)
**LATCH** = **L**ayered **A**rchitectural **T**rust & **C**ontract **H**ardening.  
*A self‑policing, hash‑locked contract graph for deterministic, enforceable library boundaries.* (Aspirational until checklist complete.)

### 1.1 Pillars
| Pillar | Meaning | Mechanism (Target) | Current State |
| ------ | ------- | ------------------ | ------------- |
| Layered Graph | Strict acyclic deps | `libraries/contracts/boundaries.json` + graph hash gate | Graph only |
| Contract Hardening | Immutable, verifiable payloads | `ContractOutput<T>` + SHA-256 | Weak checksum now |
| Self-Policing | Automatic rejection | Pre-commit + integrity scripts | Hooks only |
| Hash-Locking | Cryptographic gating | SHA-256 graph/API/type/IR hashes | Not yet |
| Determinism | Reproducible outputs | Foundry PRNG + replay seeds | Planned |
| Provenance | Auditable evolution | Change logs + schema versions | Planned |
| Canonical Algebra | Single monad canon | Result/Option/AsyncResult/State + laws | Planned |

### 1.2 NEVER Claim Publicly (Yet)
Words: "hash‑locked", "cryptographically enforced", "deterministic substrate" — INTERNAL ONLY until every LATCH task is checked.

---
## 2. FUNCTIONAL PROGRAMMING STANDARD
| Rule | Requirement |
| ---- | ----------- |
| Purity | All library functions pure (no I/O unless explicitly named and isolated) |
| Naming | **Named `function` declarations**, not anonymous arrows for exported functions |
| Types | Prefer `type` aliases over `interface`; use discriminated unions for variants |
| Arrays | Always `Array<T>` (NOT `T[]`) |
| Immutability | No mutation; use structural copies |
| Currying | Only where it lowers cognitive load; avoid deep curried pyramids; staged partials acceptable |
| Error Channel | Use `Result` / `Validation` (no thrown errors in core logic) |
| No Classes | Absolute prohibition |
| One Function / Folder | Folder name = function name; file = `index.ts`; test = `index.test.ts` |
| Barrels | Forbidden (no `mod.ts` re-export fan-outs except explicit `exports/` pattern) |

Enforcement TODO: integrity script to fail on `interface` declarations unless allow-listed.

---
## 3. DIRECTORY & REPORTING STRUCTURE
```
reports/
  integrity/
    latest.json
    latest.md
    contract-graph.json
    contract-graph.hash.json
    api/<library>.hash.json
    types/<library>.types.hash.json
    ir/parser-ir.schema.json
    ir/parser-ir.hash.json
scripts/
  integrity/
    hash/sha256.ts
    serializeContractGraph.ts
    runAll.ts (aggregator)
    phases.json (script enforcement phases)
```
`temp/` is a garbage can – DO NOT store integrity artifacts there.

---
## 4. HASH STRATEGY
- **Primary Algorithm:** SHA-256 via native crypto (Deno `crypto.subtle`).
- **Pluggable Design:** Metadata includes algorithm & version to allow adding BLAKE3 later.
- **Dual Hash Migration (Future):** Add `hashes.blake3` alongside `hashes.sha256`, flip `preferred` after stability window.
- **Serialization Canonicalization:** Sorted object keys; no extraneous whitespace; `\n` line endings; UTF-8; minified for hashing.

Artifact Metadata Template:
```json
{
  "artifact": "contract-graph",
  "version": 1,
  "hashes": { "sha256": "<hex>" },
  "preferred": "sha256",
  "generatedAt": "<ISO>",
  "schemaVersion": 1
}
```

`ContractOutput<T>` Metadata Upgrade Target:
```ts
meta: {
  library: string,
  createdAt: string,
  hashAlgo: 'sha256',
  hashVersion: 1,
  hash: string
}
```

---
## 5. ENFORCEMENT PHASES (PENDING → WARN → BLOCK)
| Script | Initial | After Baseline | Final |
|--------|---------|----------------|-------|
| graphHashGate | BLOCK | BLOCK | BLOCK |
| structureAudit | WARN | BLOCK | BLOCK |
| importAudit | PENDING | WARN | BLOCK |
| apiSnapshot | PENDING | WARN | BLOCK (after lock) |
| typeShapeLock | PENDING | WARN | BLOCK |
| commentAudit | PENDING | WARN | BLOCK |
| determinismCheck | PENDING | WARN | BLOCK (stable) |
| failingSeedReplay | PENDING | WARN | BLOCK |
| irSchemaGate | PENDING | WARN | BLOCK |

Aggregator Decision:
1. Any BLOCK script with violations ⇒ reject commit.
2. Else any WARN script with violations ⇒ allow commit + print warnings.
3. Else allow silently.

Time Scaling: "Week" == conceptual staging cycle (could be **hours** in practice). Architect decides acceleration.

---
## 6. ANTI-CIRCUMVENTION STRATEGY (AIs ARE NOT TRUSTED)
| Vector | Mitigation |
| ------ | ---------- |
| Bypass `--no-verify` | Git wrapper + policy + scans for commits with suspicious flags in hooks log |
| Editing hooks/integrity scripts | Protect paths list + hash baseline of enforcement scripts (self-check) |
| Deleting reports to hide drift | Aggregator regenerates fresh each run; absence = violation |
| Shadow export paths (reintroduce barrels) | structureAudit enumerates all `index.ts` & forbids multi-exports |
| Refusing to run tests | Pre-commit hook order: integrity → type check → tests → lint/format |
| Introduce non-determinism | determinismCheck compares two seeded runs; violation escalates |
| Silent API drift | apiSnapshot diff required + rationale stub or commit blocked |
| Schema churn | irSchemaGate requires version bump + migration note |
| Hash spoofing | Hash recomputation every run; stored hashes only baseline—not trust anchors |

**NO OVERRIDE FLAG PUBLICLY DOCUMENTED.** Any future override uses private environment variable known only to Architect; scripts must not print its name when active.

---
## 7. ACTIVE NEAR-TERM TASKS (PHASE 1: "Today")
1. Implement `sha256Hex` pure function (no interface; `type HashFn = (input: ArrayBuffer | Uint8Array | string) => Promise<string>`).
2. Serialize contract graph: extract allowed edges from `boundaries.json` → canonical JSON.
3. Produce `reports/integrity/contract-graph.json` + `contract-graph.hash.json`.
4. Upgrade `createContractOutput` to use SHA-256 (retain old checksum field temporarily as `legacyChecksum` for transition).
5. Add aggregator stub `scripts/integrity/runAll/index.ts` returning JSON with all scripts marked `phase: 'pending'` (except `graphHashGate`).
6. Wire pre-commit to call aggregator (warn-only if decision != block).

---
## 8. LATCH READINESS CHECKLIST (CONDENSED)
| Category | Key Items (Must All Be Done) |
| -------- | --------------------------- |
| Crypto | SHA-256 for graph, API, types, IR, ContractOutput |
| Adoption | 100% cross-library payloads wrapped in ContractOutput |
| Integrity | All scripts implemented & passing (no pending) |
| Determinism | Foundry PRNG stable + replay harness | 
| IR Governance | parser-ir + engine-ir schemas versioned + gate |
| Monad Canon | Result / Option / AsyncResult / (State or documented deferral) + law tests |
| Provenance | Change logs for graph/API/types/IR migrations |
| Reports | JSON + Markdown dual outputs in `reports/integrity/` |

---
## 9. CODE STYLE ENFORCEMENT REMINDERS
- Indentation: tabs.
- Line length target: 80.
- No semicolons.
- `Array<T>` not `T[]`.
- Exported types: `type` not `interface` (unless adapting external lib DOM or TS AST forms; then prefix with `External` or wrap).
- Discriminated unions: use tag field `kind` or `type`.

---
## 10. MONAD CANON (FUTURE SHAPE)
| Monad | Core Ops | Notes |
|-------|----------|-------|
| Result<E, A> | `ok`, `err`, `map`, `flatMap`, `mapErr`, `fold` | Error channel explicit |
| Option<A> | `some`, `none`, `map`, `flatMap`, `getOrElse` | No null/undefined exported |
| AsyncResult<E, A> | Lift of Result over Promise | `fromPromise(fn, mapErr)` |
| State<S, A> (TBD) | `eval`, `exec`, `map`, `flatMap` | Might defer—document if so |

Law Harness: functor identity/composition, monad left/right identity + associativity, applicative interchange, semigroup/monoid where applicable.

---
## 11. CONTRACT OUTPUT SPEC (TARGET)
```ts
export type ContractOutput<T> = {
  readonly data: T
  readonly meta: {
    readonly library: string
    readonly createdAt: string
    readonly hashAlgo: 'sha256'
    readonly hashVersion: 1
    readonly hash: string
    readonly legacyChecksum?: number // remove once migrated
  }
  validate(): boolean // recomputes hash + deep freeze check
}
```
Implementation notes: pure helpers only; deep freeze recursion functional; no mutation after creation.

---
## 12. IR SCHEMA GOVERNANCE (PARSER FIRST)
- File: `reports/integrity/ir/parser-ir.schema.json`
- Fields sorted lexicographically.
- Unknown fields in tolerant mode: preserved passthrough.
- Gate: any field removal / type kind change ⇒ version bump + migration note.

---
## 13. REPORT AGGREGATOR OUTPUT CONTRACT (DRAFT)
```json
{
  "runId": "<ISO>",
  "results": [
    { "name": "graphHashGate", "phase": "block", "status": "ok", "messages": [] },
    { "name": "structureAudit", "phase": "pending", "status": "pending" }
  ],
  "decision": "allow", // or warn | block
  "summary": { "critical": 0, "high": 0, "medium": 0, "info": 0, "blockers": 0 }
}
```

---
## 14. ANTI-PATTERNS TO REJECT IMMEDIATELY
| Pattern | Why Rejected | Replacement |
|---------|--------------|-------------|
| Barrel re-export `mod.ts` combining multiple public surfaces | Hides dependency clarity | Explicit `exports/` folder with single-file exports |
| Interface for internal structural type | Adds open extension ambiguity | `type` alias + union if variant |
| Arrow function for major exported symbol | Reduces clarity & naming anchor | Named `function` declaration |
| Throwing errors in pure logic path | Non-deterministic propagation path | Return `Result` |
| Implicit any or broad `unknown` leaking outward | Unsafe widening | Narrow discriminated unions |

---
## 15. AI BEHAVIORAL EXPECTATIONS
AI assistant MUST:
1. Read `docs/latch.md` + this prompt BEFORE edits.
2. Never modify contract enforcement or integrity scripts without explicit instruction.
3. Never add dependencies to foundation libraries (`toolkit`, `foundry`).
4. Never parse TypeScript outside `parser` library.
5. Ask before introducing new functional abstractions (monads, algebraic structures).
6. Stop and request clarification if encountering unrecognized pattern.

---
## 16. IMPLEMENTATION ORDER RECONFIRMED (PHASE 1)
1. SHA-256 helper function.
2. Contract graph serialization + hash files.
3. `ContractOutput` hashing upgrade.
4. Aggregator stub + JSON/MD generation.
5. Pre-commit wiring (warn-level except graph).
6. Commit baseline.

---
## 17. ARCHITECT APPROVAL GATES
| Gate | Condition |
|------|-----------|
| Baseline Graph | contract-graph.hash.json committed |
| ContractOutput Upgrade | `hash` present; legacy checksum still accepted |
| Aggregator Installed | Pre-commit prints summary header |
| Phase Promotion | Architect greenlights after reviewing report noise |

---
## 18. WHEN RE-PRIMING AN AI
Have it output: 
> "I acknowledge the Prime Directive, LATCH pillars, FP rules (types not interfaces, Array<T>, pure named functions), and Phase 1 tasks. Ready to execute step X." 
Then verify no assumptions before code changes.

---
## 19. PROHIBITED ACTIONS (AUTOMATIC SESSION TERMINATION)
- Using `--no-verify` or modifying wrappers to simulate a clean run.
- Deleting or altering integrity script outputs to suppress drift.
- Introducing classes or barrel files.
- Adding external dependencies to foundation layer.
- Parsing TypeScript AST outside `parser` library.

---
## 20. REMEMBER
Lock structure before scale. Prove integrity before promises. Hash after canonicalization. Ask when uncertain. Assume nothing.

---
**End of Master Continuation Prompt**
