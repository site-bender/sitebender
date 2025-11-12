# Warden Library - Complete Tutorial

## What It Does

**Warden is an architectural governance tool** that enforces code organization rules through **privacy validation** and **cryptographic contracts**. Think of it as a linter for architectural patterns, not just syntax.

### The Core Problem It Solves

In codebases with strict architectural rules, developers (and especially AI assistants) can accidentally break privacy boundaries by importing functions they shouldn't. Warden prevents this by:

1. **Detecting privacy violations** - catches imports of "private" functions from outside their allowed scope
2. **Cryptographic verification** - uses SHA-256 hashes to ensure architectural contracts haven't been tampered with
3. **Clear enforcement** - provides actionable error messages with suggested fixes

---

## How It Works

### The Underscore Privacy System

Warden uses a **folder-based privacy convention**: any folder starting with underscore (`_`) marks its contents as private.

**Privacy Rules (Only Two):**

- **Public functions** (no underscore) → can be imported from anywhere
- **Private functions** (underscore prefix) → can ONLY be imported from within their parent scope

**That's it. No special cases.**

The **lowest common ancestor (LCA) rule** is automatically enforced: when multiple functions need the same helper, place it at their LCA with a descriptive name + underscore. All consumers will be within that parent scope and can import it.

**Example:**

```
src/
├── enforce/
│   ├── enforce/index.ts          # PUBLIC - anyone can import
│   └── formatReport/index.ts     # PUBLIC - anyone can import
└── privacy/
    ├── validatePrivacy/index.ts  # PUBLIC - anyone can import
    ├── findViolations/index.ts   # PUBLIC - anyone can import
    └── _normalizePath/           # PRIVATE - only privacy/* can import
        └── index.ts              # (LCA for path normalization helpers)
```

**Why `_normalizePath` and not `_shared`?**

- ✅ `_normalizePath` - descriptive, tells you what it does
- ❌ `_shared` - generic, forbidden by architectural rules
- ❌ `_helpers` - generic, forbidden
- ❌ `_utils` - generic, forbidden

**How LCA placement works:**
If both `validatePrivacy/` and `findViolations/` need path normalization, place `_normalizePath/` at `src/privacy/` (their LCA). Both are within `src/privacy/*` so both can import it. The parent scope rule handles this automatically - no special logic needed.

### The Validation Pipeline

Warden validates privacy through a **5-step pipeline**:

1. **Walk directory tree** - finds all TypeScript/TSX files
2. **Parse imports** - uses Arborist to extract import statements from each file
3. **Build import graph** - creates a map of file → imports with resolved paths
4. **Find violations** - checks each import against privacy rules (simple parent scope check)
5. **Format report** - produces human-readable output

### The Cryptographic Hash System

For architectural contracts, Warden uses **deterministic hashing**:

1. **Canonical stringify** - converts data structures to JSON with sorted keys
   - `{ b: 2, a: 1 }` and `{ a: 1, b: 2 }` produce identical strings
2. **SHA-256 hash** - generates 64-character hexadecimal hash
   - Same data → same hash (cryptographic verification)
   - Different data → different hash (tamper detection)

---

## Current Implementation Status

**IMPORTANT**: The README describes the aspirational vision. Here's what **actually works** right now (Phase 2.1):

### ✅ What Works (Production-Ready)

**Phase 1 - Privacy Enforcement** (Complete):

- Build import graphs from TypeScript codebases
- Detect underscore privacy violations
- Validate that `_private/` functions only imported from parent scope
- Format violations as actionable error messages
- Enforce privacy across multiple targets
- Beautiful console reports with metrics
- Fast performance (< 100ms for 25 files, < 2s for full enforcement)
- Self-validating (Warden validates itself with 0 violations)
- 96 tests, 96% pass rate, 0 false positives

**Phase 2.1 - Hash Utilities** (Complete):

- Deterministic JSON serialization (canonical stringify)
- SHA-256 hashing of architectural artifacts
- Ensures equivalent data structures produce identical hashes
- 24 tests, 100% pass rate
- Performance < 100ms for typical data

### ❌ What Doesn't Work Yet

- Contract schema validation (Phase 2.2 - next up)
- Contract generation from code (Phase 2.3)
- Graduated enforcement phases (pending/warn/block) - currently hardcoded to "block" (Phase 3)
- Performance optimization (caching, parallelization) (Phase 4)
- Git hooks and CI/CD integration (Phase 5)
- Comprehensive property-based testing (Phase 6)
- Workflow validation (Future)
- Compliance automation (Future)

---

## Public API

### No Barrel Files Rule

**CRITICAL**: Warden follows the "no barrel files" architectural rule. You **must import directly from the function tree**, not from `mod.ts`.

**Correct:**

```typescript
import type {
	ValidationResult,
	WardenConfig,
} from "@sitebender/warden/src/types/index.ts"

import enforce from "@sitebender/warden/src/enforce/enforce/index.ts"
import formatReport from "@sitebender/warden/src/enforce/formatReport/index.ts"
import validatePrivacy from "@sitebender/warden/src/privacy/validatePrivacy/index.ts"
import hashArtifact from "@sitebender/warden/src/hash/hashArtifact/index.ts"
```

**Incorrect:**

```typescript
import { enforce } from "@sitebender/warden/mod.ts" // ❌ WRONG!
```

### Main Functions

#### `enforce(config: WardenConfig) => Promise<ValidationResult>`

Main orchestrator function - validates privacy rules across multiple targets.

**Example:**

```typescript
import type { WardenConfig } from "@sitebender/warden/src/types/index.ts"

import enforce from "@sitebender/warden/src/enforce/enforce/index.ts"
import formatReport from "@sitebender/warden/src/enforce/formatReport/index.ts"

const config: WardenConfig = {
	targets: ["src/"],
	phase: "block",
}

const result = await enforce(config)
const report = formatReport(result)

console.log(report)
// ✓ Privacy validation passed
//   Files checked: 25
//   Execution time: 32ms
//   Phase: block
```

#### `validatePrivacy(rootPath: string) => Promise<ValidationResult>`

Validate underscore privacy rules for a single directory.

**Example:**

```typescript
import validatePrivacy from "@sitebender/warden/src/privacy/validatePrivacy/index.ts"

const result = await validatePrivacy("src/privacy")
// { success: true, violations: [], filesChecked: 5, executionTime: 50, phase: "block" }
```

#### `hashArtifact(data: unknown) => Promise<string>`

Generate SHA-256 hash of any data structure (deterministic).

**Example:**

```typescript
import hashArtifact from "@sitebender/warden/src/hash/hashArtifact/index.ts"

const hash1 = await hashArtifact({ b: 2, a: 1 })
const hash2 = await hashArtifact({ a: 1, b: 2 })
// hash1 === hash2 (same hash despite different key order)
```

### Core Types

Located in `src/types/index.ts`:

**`WardenConfig`** - Configuration for enforcement:

```typescript
export type WardenConfig = {
	readonly targets: ReadonlyArray<string> // Directories to validate
	readonly phase: EnforcementPhase // "pending" | "warn" | "block"
	readonly privacyRules?: ReadonlyArray<PrivacyRule>
	readonly contractPaths?: ReadonlyArray<string>
	readonly performance?: {
		readonly maxExecutionTime: number
		readonly parallelProcessing: boolean
	}
	readonly reporting?: {
		readonly format: "json" | "markdown" | "console"
		readonly outputPath?: string
	}
}
```

**`ValidationResult`** - Result of validation:

```typescript
export type ValidationResult = {
	readonly success: boolean
	readonly violations: ReadonlyArray<PrivacyViolation>
	readonly filesChecked: number
	readonly executionTime: number // milliseconds
	readonly phase: EnforcementPhase
}
```

**`PrivacyViolation`** - Details about a violation:

```typescript
export type PrivacyViolation = {
	readonly type: "privacy"
	readonly fromFile: string // File that imports
	readonly toFile: string // Private file being imported
	readonly line?: number
	readonly column?: number
	readonly message: string
	readonly suggestedFix?: string
}
```

---

## How to Use It in Other Libraries

### Step 1: Add Warden as a Dependency

In your library's `deno.jsonc`:

```json
{
	"imports": {
		"@sitebender/warden/": "../warden/src/"
	}
}
```

### Step 2: Create Privacy Rules

Organize your code using underscore-prefixed folders for private functions:

```
your-library/
├── src/
│   ├── publicFunction/
│   │   ├── index.ts              # PUBLIC - external API
│   │   └── _validateInput/       # PRIVATE - only publicFunction/* can use
│   │       └── index.ts
│   ├── anotherPublic/
│   │   └── index.ts              # PUBLIC - external API
│   └── _normalizePath/           # PRIVATE - LCA for path helpers
│       └── index.ts              # Both publicFunction/ and anotherPublic/ can use
```

**Key points:**

- Use **descriptive names** (`_validateInput`, `_normalizePath`, `_formatOutput`)
- **Never use generic names** (`_helpers`, `_utils`, `_shared`)
- Place shared private helpers **at the lowest common ancestor** of their consumers
- The parent scope rule automatically allows all descendants to import

### Step 3: Run Validation

**In a test file:**

```typescript
import type { WardenConfig } from "@sitebender/warden/src/types/index.ts"

import { assertEquals } from "jsr:@std/assert"

import enforce from "@sitebender/warden/src/enforce/enforce/index.ts"
import formatReport from "@sitebender/warden/src/enforce/formatReport/index.ts"

Deno.test("library respects privacy boundaries", async () => {
	const config: WardenConfig = {
		targets: ["src/"],
		phase: "block",
	}

	const result = await enforce(config)
	const report = formatReport(result)

	if (!result.success) {
		console.error(report)
	}

	assertEquals(result.success, true, "No privacy violations")
})
```

**In a deno task:**

```json
{
	"tasks": {
		"enforce": "deno run --allow-read src/scripts/enforce.ts"
	}
}
```

### Step 4: Handle Violations

When Warden detects a violation, you'll see:

```
✗ Privacy validation failed
  Violations: 1
  Files checked: 25
  Execution time: 150ms
  Phase: block

Violations:

1. Privacy violation: src/publicFunction/index.ts:5:1
   Cannot import private function src/anotherPublic/_validateInput/index.ts
   Suggested fix: Move _validateInput to lowest common ancestor or make it public
```

---

## Architecture and Implementation

### File Organization

Warden follows its own strict rules:

- **One function per file** - every function in `functionName/index.ts`
- **Private helpers** - underscore folders for internal helpers with **descriptive names**
- **No barrel files** - direct tree imports only
- **Lowest common ancestor** - shared helpers at LCA of consumers

**Structure:**

```
libraries/warden/
├── src/
│   ├── types/              # Type definitions (ONLY file with named exports)
│   ├── enforce/            # Main orchestration
│   │   ├── enforce/        # Main function
│   │   └── formatReport/   # Report formatting
│   ├── privacy/            # Privacy validation
│   │   ├── validatePrivacy/      # Orchestrator
│   │   ├── isPrivateFunction/    # Detect underscore
│   │   ├── isValidImport/        # Check import validity (simple parent scope check)
│   │   ├── getParentScope/       # Extract parent
│   │   ├── findViolations/       # Find all violations
│   │   └── formatViolation/      # Format violation message
│   ├── importGraph/        # Import graph construction
│   │   ├── buildGraph/           # Main builder
│   │   │   └── _walkDirectory/   # PRIVATE helper - descriptive name
│   │   ├── parseImports/         # Parse using Arborist
│   │   └── resolveModulePath/    # Resolve paths
│   └── hash/               # Cryptographic hashing
│       ├── canonicalStringify/   # Deterministic JSON
│       └── hashArtifact/         # SHA-256 hash
├── contracts/
│   └── warden.json         # Warden's own contract
├── mod.ts                  # Explains "no barrel files" rule
├── README.md               # Aspirational vision (the dream)
├── CURRENT_STATE.md        # Reality (what actually works)
└── IMPLEMENTATION_PLAN.md  # Step-by-step roadmap
```

### Privacy Rule Implementation

The privacy validation is **beautifully simple** - just one check:

```typescript
// From isValidImport/index.ts
import isPublicFunction from "../isPublicFunction/index.ts"
import getParentScope from "../getParentScope/index.ts"
import startsWith from "@sitebender/toolsmith/string/startsWith/index.ts"

export default function isValidImport(fromPath: string) {
	return function isValidImportWithFromPath(toPath: string): boolean {
		// If target is public, always valid
		if (isPublicFunction(toPath)) {
			return true
		}

		// Target is private - fromPath must be within the parent scope
		const privateScope = getParentScope(toPath)

		return startsWith(privateScope)(fromPath)
	}
}
```

**That's the entire privacy system.** No special cases. No `_shared` logic. The LCA rule is automatically enforced because:

- If `_normalizePath/` is at `src/privacy/`
- Then `getParentScope("src/privacy/_normalizePath/index.ts")` returns `"src/privacy/"`
- Any file under `src/privacy/*` will `startsWith("src/privacy/")`
- Therefore, all files in that scope can import it

### Constitutional Rules

Warden is built following **strict functional programming rules**:

1. ✅ **No classes** - only pure functions in modules
2. ✅ **No mutations** - all data immutable (`const`, `Readonly<T>`)
3. ✅ **No loops** - use `map`/`filter`/`reduce` from Toolsmith
4. ✅ **No exceptions** - use Result/Validation monads (future)
5. ✅ **One function per file** - single responsibility
6. ✅ **Pure functions** - same input → same output, no side effects
7. ✅ **No arrow functions** - use `function` keyword with named declarations
8. ✅ **All functions curried** - single parameter only

**Example of constitutional compliance:**

```typescript
// ✅ CORRECT: Named function, curried, pure, one function per file
import split from "@sitebender/toolsmith/string/split/index.ts"
import some from "@sitebender/toolsmith/array/some/index.ts"

import _checkSegmentIsPrivate from "./_checkSegmentIsPrivate/index.ts"

export default function isPrivateFunction(filePath: string): boolean {
	const segments = split("/")(filePath)

	return some(_checkSegmentIsPrivate)(segments)
}

// In isPrivateFunction/_checkSegmentIsPrivate/index.ts
import and from "@sitebender/toolsmith/logic/and/index.ts"
import gt from "@sitebender/toolsmith/predicates/gt/index.ts"
import length from "@sitebender/toolsmith/string/length/index.ts"
import startsWith from "@sitebender/toolsmith/string/startsWith/index.ts"

export default function _checkSegmentIsPrivate(segment: string): boolean {
	const startsWithUnderscore = startsWith("_")(segment)
	const longerThanOne = gt(1)(length(segment))

	return and(startsWithUnderscore)(longerThanOne)
}

// ❌ WRONG: Arrow function, multiple parameters, OOP methods, raw operators
export const isValid = (from: string, to: string) => {
	return from.startsWith(to) && from.length > 1
}
```

### Dependencies

**Allowed:**

- `@sitebender/toolsmith` - Functional utilities (map, filter, reduce, hashHex)
- `@sitebender/arborist` - AST parsing for TypeScript

**Forbidden:**

- Direct TypeScript compiler access
- ts-morph
- Any library-to-library dependencies except toolsmith and arborist

---

## Performance

**Current benchmarks** (Phase 2.1):

- Privacy validation on Warden itself (25 files): **< 100ms**
- Complete enforcement with formatting: **< 2s**
- Hash computation: **< 100ms**

**Targets** (Phase 4):

- Full validation suite: **< 5 seconds**
- Privacy validation: **< 1 second**
- Contract generation: **< 2 seconds**
- Zero false positives: **100% accuracy**

---

## Key Takeaways

1. **Warden enforces architectural rules** through privacy validation and cryptographic contracts
2. **Two simple privacy rules**: public (anywhere) vs private (parent scope only)
3. **No generic folder names** - use descriptive names like `_normalizePath`, `_validateSchema`
4. **LCA placement is automatic** - parent scope rule handles shared helpers naturally
5. **Currently operational**: Privacy enforcement + hash utilities (Phases 1 & 2.1)
6. **Next up**: Contract schema validation (Phase 2.2)
7. **No barrel files** - import directly from function tree
8. **Fast and accurate** - < 2s validation, 0% false positives
9. **Self-governing** - Warden validates its own architecture
10. **README = dream, CURRENT_STATE.md = reality** - check both for accuracy
