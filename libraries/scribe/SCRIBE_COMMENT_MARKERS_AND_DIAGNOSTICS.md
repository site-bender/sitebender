# Scribe Comment Markers & Diagnostics Strategy

> Consolidated reference of two prior explanations: (1) Comment marker parsing role vs. central Parser architecture; (2) Diagnostics concept, taxonomy, and integration plan.

---

## Part 1: Comment Marker Parsing vs. Parser (AST) Responsibilities

### Current `parseCommentMarkers` (Phase 1 Stopgap)
Implements a **line-oriented scan** over the raw source string (now a pure recursive reducer) to extract:

- Regular comments: `//` (not extracted, for implementation notes only)
- First description marker: `//++` or block `/*++ ... */` (subsequent contiguous `//++` are flagged as stray)
- Help markers: `//??` (single) and `/*?? ... */` (multi-line)
  - Optional categories (singular): `[EXAMPLE]` (default), `[SETUP]`, `[ADVANCED]`, `[GOTCHA]`, `[MIGRATION]`
  - Format: `//?? [CATEGORY] content` or `//?? content` for examples
  - Each category marker starts a new item in multi-line blocks
- Tech debt markers: `//--` (empty reason diagnostic)
- Critical issue markers: `//!!` or `/*!! ... */` (empty description diagnostic) 🆕
- Diagnostics for: extra `//++`, unterminated blocks, empty reasons/descriptions

Returns:
```ts
type ParsedComments = {
  description?: string
  help: Array<{ 
    category?: 'example' | 'setup' | 'advanced' | 'gotcha' | 'migration'
    content: string
    code?: string      // For EXAMPLE category
    expected?: string  // For EXAMPLE category
    line: number
    raw: string
  }>
  techDebt: Array<{ 
    category?: 'workaround' | 'limitation' | 'optimization' | 'refactor' | 'compatibility'
    reason: string
    line: number
    raw: string
  }>
  criticalIssues: Array<{
    category?: 'security' | 'performance' | 'correctness' | 'incomplete' | 'breaking'
    description: string    // Required: what's wrong and action required
    line: number
    raw: string
  }>
  raw: Array<{ line: number; marker: string; text: string }>
  diagnostics: Array<{ line: number; issue: string }>
}
```

### Why It Exists
Provide immediate structured inputs for documentation generation (description / examples / tech debt) **before** the central Parser library’s AST-based comment extraction is in place. This unblocks Scribe iteration and doc output semantics.

### Limitations / Duplication Risk
| Issue | Consequence | Resolution Path |
|-------|-------------|-----------------|
| Re-scans full source (string split) | Potential divergence from AST truth | Delegate to Parser’s comment extraction later |
| No per-function binding in multi-function files | Ambiguous attribution | Parser will associate comment trivia to nodes |
| Regex/line heuristics | Edge cases (embedded markers in strings, templated code) | AST trivia offsets eliminate ambiguity |
| Hard-coded first description rule | Might differ from future policy | Keep; can adjust via diagnostics layer |

### Target Future Boundary (Separation of Concerns)
**Parser (authoritative)**: Extract raw comments + structural metadata + node association.
**Scribe adapter**: Classify markers into semantic buckets (description / example / tech debt) and produce non-fatal diagnostics.

### Future Adapter Contract
```ts
type RawComment = {
  kind: 'line' | 'block'
  text: string      // trimmed interior text
  fullText: string  // original slice
  start: number
  end: number
  line: number
  column: number
  nodeId?: string   // optional function / node association
}

type Diagnostic = {
  code: string
  category: 'structure' | 'association' | 'quality' | 'consistency' | 'hygiene' | 'semantic'
  message: string
  line: number
  column?: number
  functionName?: string
  severity: 'info' | 'warn' | 'error'
  suggestion?: string
}

type ParsedMarkerResult = {
  description?: string
  help: ParsedHelp[]
  techDebt: ParsedTechDebt[]
  criticalIssues: ParsedCriticalIssue[]
  diagnostics: Diagnostic[]
}

function parseMarkers(comments: RawComment[]): ParsedMarkerResult
```

### Category Parsing Implementation

Categories are **case-insensitive** when written but stored as lowercase in the type system:

```typescript
// Parse any case from source
const rawCategory = extractedText // "[GOTCHAS]", "[Gotchas]", "[gotchas]"

// Normalize using toLocaleLowerCase() for consistency
const normalized = rawCategory.toLocaleLowerCase()

// Validate against union type
type HelpCategory = 'example' | 'setup' | 'advanced' | 'gotcha' | 'migration'
type TechDebtCategory = 'workaround' | 'limitation' | 'optimization' | 'refactor' | 'compatibility'
type CriticalCategory = 'security' | 'performance' | 'correctness' | 'incomplete' | 'breaking'

function normalizeHelpCategory(raw: string): HelpCategory | undefined {
  const normalized = raw.toLocaleLowerCase()
  const valid: HelpCategory[] = ['example', 'setup', 'advanced', 'gotcha', 'migration']
  return valid.includes(normalized as HelpCategory) ? normalized as HelpCategory : undefined
}
```

This approach:
- Accepts any case from users
- Validates against known categories
- Returns `undefined` for invalid/unknown categories (no "other" category needed)
- Maintains type safety with union types

### Migration Phases
1. (Now) Maintain working line-based version (test-backed).
2. Implement `extractComments` in Parser (AST: `getLeadingCommentRanges`, `getTrailingCommentRanges`).
3. Produce `RawComment[]` + optional `nodeId` mapping.
4. Swap Scribe to call `parseMarkers(RawComment[])`.
5. Remove legacy source-string scanner when parity confirmed.
6. Extend markers to support `[functionName]` qualifiers for multi-function files.

### Marker Semantics (Current & Planned)
| Marker | Meaning | Priority | Multi-function Disambiguation |
|--------|---------|----------|--------------------------------|
| `//` | Regular comment (not extracted) | None | N/A |
| `//++` / `/*++` | Description (only first retained) | Neutral/positive | Optional `[fnName]` tag later |
| `//??` / `/*??` | Help info (examples, setup, etc.) | Neutral/informative | `[fnName]` tag associates |
| `//--` / `/*--` | Tech debt note (reason required) | Negative but acceptable | `[fnName]` tag associates |
| `//!!` / `/*!!` | Critical issue (description required) 🆕 | Critical/urgent - blocks release | `[fnName]` tag associates |

---

## Part 2: Diagnostics Taxonomy & Integration

### What Diagnostics Represent
Structured, **non-fatal**, machine-consumable observations: quality, structure, association, or completeness issues. They do **not** prevent parsing; they enable downstream policy enforcement (CI gates, doc badges, IDE surfacing).

### Distinction from Core Parser Metadata
| Attribute | Metadata | Diagnostics |
|-----------|----------|-------------|
| Nature | Factual counters / stats | Interpretive, advisory |
| Failure Impact | None or error | Never fatal |
| Examples | functionCount, branchCount | COMMENT_EXTRA_DESCRIPTION, TECHDEBT_EMPTY_REASON |

### Proposed Categories
1. Structure – malformed or duplicate markers
2. Association – marker references unknown or ambiguous function
3. Quality – insufficient content (empty reason, minimal description)
4. Consistency – naming mismatches, duplicate descriptions for same node
5. Hygiene – duplicate identical comments, trailing noise
6. Semantic – (future) example parse errors, type expectation mismatches

### Diagnostic Shape (Expanded)
```ts
type Diagnostic = {
  code: string
  category: 'structure' | 'association' | 'quality' | 'consistency' | 'hygiene' | 'semantic'
  message: string
  line: number
  column?: number
  functionName?: string
  severity: 'info' | 'warn' | 'error'
  suggestion?: string
}
```

### Mapping Current Messages → Structured Codes
| Current Text | code | category | severity | suggestion |
|--------------|------|----------|----------|------------|
| Extra //++ after primary description ignored | COMMENT_EXTRA_DESCRIPTION | structure | warn | Merge or remove extra line |
| Unterminated /*++ block | COMMENT_UNTERMINATED_BLOCK | structure | error | Close with `*/` |
| Empty tech debt reason | TECHDEBT_EMPTY_REASON | quality | warn | Provide justification (≥ N chars) |
| Empty /*?? block | EXAMPLE_EMPTY_BLOCK | quality | info | Add example lines |
| Empty critical issue description | CRITICAL_EMPTY_DESCRIPTION | quality | error | Provide issue details and action required |
| Multiple //!! in same function | CRITICAL_MULTIPLE_ISSUES | quality | warn | Consider severity - may indicate unstable code |

### Integration into Parser Result
```ts
type ParseResult<T> = Result<{
  data: T
  metadata: {
    functionCount: number
    violations: RuleViolation[]
    diagnostics: Diagnostic[]
    stats: { lines: number; complexity: number; branches: number }
  }
}, ParseError>
```

### Why Keep Diagnostics Explicit
| Use Case | Benefit |
|----------|---------|
| CI gating | `--fail-on error,quality` |
| Trend tracking | Reduce warn density over time |
| IDE surfacing | Quick actionable hints |
| Documentation | Footnotes / status badges |

### Enhancement Roadmap
Short Term:
- Add `code` + `severity` fields to current Scribe implementation (backwards-compatible).
Mid Term:
- Parser emits raw comments; adapter reuses existing classification logic.
- Add `[fnName]` marker support.
Long Term:
- Semantic validation of examples (parse + maybe execute in sandbox).
- Policy-driven gating (min examples, non-empty tech debt reasons, etc.).

---

## Part 3: Message to the Parser AI

> The following is a direct coordination note intended for the AI implementing the Parser library.

### Greetings!

Scribe has a provisional comment marker parser (`parseCommentMarkers`) that currently performs a **line-level scan** for `//++`, `//??`, `//--`, and their block variants. This was built only to unblock early documentation generation before the central Parser’s AST-driven comment extraction lands.

### We Intentionally Kept It Shallow
No attempt is made to:
1. Bind comments to specific function nodes (multi-function files remain ambiguous).
2. Normalize indentation inside block comments beyond simple trimming.
3. Interleave with signature or branch analysis.
4. Parse or evaluate example code.

All of those belong naturally to the Parser’s authoritative view.

### Desired Collaboration Boundary
Once you expose a function (names illustrative):
```ts
extractComments(sourceFile: ts.SourceFile): RawComment[]
associateComments(comments: RawComment[], functions: ts.FunctionLikeDeclaration[]): RawComment[] // (augments with nodeId)
```
Scribe will swap its current string-based entry point for a pure adapter:
```ts
parseMarkers(comments: RawComment[]): ParsedMarkerResult
```
Where **RawComment** includes absolute positions + line/column (you already have through `getLineAndCharacterOfPosition`).

### Diagnostics Coordination
Scribe presently emits simple textual diagnostics (array of `{ line, issue }`). We are migrating toward a structured `Diagnostic` shape:
```ts
{ code, category, message, line, column?, functionName?, severity, suggestion? }
```
You can (optionally) reserve a bucket in `metadata.diagnostics` for comment-related signals. If you prefer the Parser to stay *purely structural*, we can inject diagnostics after your stage — just let us know early so we don’t double-report.

### Proposed Division of Labor
| Concern | Parser | Scribe Marker Adapter |
|---------|--------|------------------------|
| Raw trivia extraction | ✅ | ❌ |
| Node association | ✅ | ❌ (consumes) |
| Marker token recognition | ⚠ (can delegate) | ✅ |
| Policy enforcement (e.g., min reason length) | ❌ (report only) | ✅ (diagnostic classification) |
| Example semantic validation | (future optional) | Possibly shared / prover |

### Minimal Deliverables We Need From You
1. Stable `RawComment` structure (see above) with location & full text.
2. (Optional) A way to tag each comment with *nearest* function node or an explicit policy if ambiguous.
3. Guarantee that leading + trailing comments for the same node are not duplicated (we can also dedupe if needed).

### Migration Steps (Once Parser Is Ready)
1. Parser returns `RawComment[]`.
2. We add an alternative code path: `parseMarkersFromComments(rawComments)`.
3. Run existing 7 test cases against both old and new paths (parity gate, we can auto-generate a fixture harness).
4. Remove legacy line-split implementation after parity + one additional multi-function test.

### Open Questions For You
1. Would you like the marker classification to live inside Parser (returning structured comments), or remain in Scribe to keep Parser purely structural?
2. Should ambiguous untagged comments in multi-function files be surfaced as `association` diagnostics automatically?
3. Do you plan to surface *any* diagnostics already (e.g., multiple default exports) so we can unify formatting early?

### Safety / Non-Interference Assurance
Nothing in current Scribe code mutates or caches AST objects. It only reads file text. We will gracefully retire this pathway once your `extractComments` is in place.

### Ready To Adapt
If you provide a draft `RawComment` specimen, we can implement the adapter ahead of full integration to tighten feedback loops.

### Example Unified Downstream Format (Illustrative)
```jsonc
{
  "data": { /* parser structural artifacts */ },
  "metadata": {
    "functionCount": 1,
    "diagnostics": [
      { "code": "COMMENT_EXTRA_DESCRIPTION", "category": "structure", "severity": "warn", "line": 7, "message": "Extra //++ after primary description ignored" }
    ],
    "stats": { "lines": 57, "complexity": 1, "branches": 0 }
  }
}
```

### Closing
This is a cooperative boundary definition, not a turf claim. Once you confirm preferred ownership of marker parsing (inside vs. outside Parser) we will either:
- Refactor Scribe’s implementation into a pure adapter (if outside), OR
- Move the classification logic wholesale into your `extractComments` pipeline (if inside) and thin Scribe to a formatter.

Please respond with your ownership preference + any adjustments to `RawComment` structure you foresee.

Thanks! Looking forward to aligning tightly so we only have **one** source of TypeScript truth.

---

## Part 4: Action Items Summary
| Action | Owner | Status |
|--------|-------|--------|
| Keep current line-based parser as interim | Scribe | ✅ Active |
| Define RawComment shape | Parser | Pending |
| Implement `extractComments` | Parser | Pending |
| Build adapter `parseMarkers(comments)` | Scribe | Pending (ready to implement) |
| Add structured diagnostic codes | Scribe | Planned |
| Parity test old vs new path | Scribe | Pending |
| Remove legacy scanner | Scribe | Pending |

---

End of document.
