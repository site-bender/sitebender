# Organize Code

**Purpose:** Fix ALL code organization and whitespace violations in TypeScript/TSX files following Sitebender's constitutional and formatting rules.

**Usage:**
```bash
/organize-code <path>
```

Where `<path>` can be:
- A single file: `/organize-code libraries/toolsmith/src/array/filter/index.ts`
- A folder (processes all `.ts` and `.tsx` files recursively): `/organize-code libraries/toolsmith/src/array/`
- Current directory: `/organize-code .`

---

## What This Command Does

This command analyzes and fixes the following violations **in priority order**:

### 1. Import Organization (IMPORT_ORDER_001) - Priority 9

**Rule:** Imports must be in this specific order with single blank lines between each group:

1. Type external imports (`import type { ... } from "external"`)
2. Type internal imports (`import type { ... } from "@sitebender/..."`)
3. Named external imports (`import { ... } from "external"`)
4. Const external imports (`import const ... from "external"`)
5. Default external imports (`import X from "external"`)
6. Named internal imports (`import { ... } from "@sitebender/..."`)
7. Const internal imports (`import const ... from "@sitebender/..."`)
8. Default internal imports (`import X from "@sitebender/..."`)

**Why:** Consistent order = instant recognition. Types before values shows structure before implementation.

**Example violation:**
```typescript
// ❌ WRONG - no grouping, random order
import filter from "./index.ts"
import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"
```

**Corrected:**
```typescript
// ✅ CORRECT - grouped by type and source
import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import filter from "./index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isError from "../../monads/result/isError/index.ts"
```

---

### 2. Multiple Blank Lines (PROXIMITY_ONE_BLANK_MAX_001) - Priority 9

**Rule:** NEVER more than one blank line in a row.

**Why:** One blank line is a separator. Two is wasted space.

**Example violation:**
```typescript
// ❌ WRONG - two consecutive blank lines
const result = process(data)


return result
```

**Corrected:**
```typescript
// ✅ CORRECT - single blank line
const result = process(data)

return result
```

---

### 3. Block Edge Spacing (PROXIMITY_NO_BLOCK_EDGES_001) - Priority 8

**Rule:** NO blank lines at the start or end of blocks (function bodies, if statements, loops, etc.)

**Why:** Block boundaries (`{` and `}`) are already visual separators - extra space is redundant.

**Example violation:**
```typescript
// ❌ WRONG - blank lines at block edges
export default function process(data: Data): Result {

	const validated = validate(data)
	if (isError(validated)) {

		return validated

	}

	return ok(data)

}
```

**Corrected:**
```typescript
// ✅ CORRECT - no blank lines at block edges
export default function process(data: Data): Result {
	const validated = validate(data)
	if (isError(validated)) {
		return validated
	}

	return ok(data)
}
```

---

### 4. Multi-line Statement Spacing (PROXIMITY_MULTILINE_SPACING_001) - Priority 8

**Rule:** Blank line above AND below any multi-line statement.

**Why:** Multi-line statements are complex units - they need visual breathing room to be seen as units.

**What counts as multi-line:**
- Object literals spanning multiple lines
- Array literals spanning multiple lines
- Function calls spanning multiple lines
- Ternary expressions spanning multiple lines
- Template literals spanning multiple lines

**Example violation:**
```typescript
// ❌ WRONG - no spacing around multi-line object
const user = { id: 1, name: "Alice" }
const config = {
	apiUrl: "https://api.example.com",
	timeout: 5000,
	retries: 3,
}
const result = process(user, config)
```

**Corrected:**
```typescript
// ✅ CORRECT - blank lines around multi-line object
const user = { id: 1, name: "Alice" }

const config = {
	apiUrl: "https://api.example.com",
	timeout: 5000,
	retries: 3,
}

const result = process(user, config)
```

---

### 5. Statement Type Grouping (PROXIMITY_STATEMENT_TYPES_001) - Priority 8

**Rule:** Group like single-line statements together, then separate groups from different statement types with blank lines.

**Why:** Different statement types = different purposes. Visual separation mirrors logical separation.

**Statement type categories:**
- Variable declarations (`const`, `let` - though `let` violates constitutional rules)
- Function calls
- Return statements
- Control flow (`if`, `switch`, etc.)
- Type declarations

**Example violation:**
```typescript
// ❌ WRONG - mixed statement types without grouping
const user = getUser()
validateUser(user)
const email = user.email
sendEmail(email)
const timestamp = Date.now()
```

**Corrected:**
```typescript
// ✅ CORRECT - grouped by type, separated by blank lines
const user = getUser()
const email = user.email
const timestamp = Date.now()

validateUser(user)
sendEmail(email)
```

---

### 6. Return Statement Spacing (PROXIMITY_RETURN_SPACING_001) - Priority 7

**Rule:** Blank line before return statements (unless it's the only statement in the block).

**Why:** Return is the conclusion - deserves visual emphasis to mark the exit point.

**Example violation:**
```typescript
// ❌ WRONG - return buried in code
export default function calculate(a: number, b: number): number {
	const sum = a + b
	const doubled = sum * 2
	return doubled
}
```

**Corrected:**
```typescript
// ✅ CORRECT - blank line emphasizes return
export default function calculate(a: number, b: number): number {
	const sum = a + b
	const doubled = sum * 2

	return doubled
}
```

**Exception - single return (correct as-is):**
```typescript
// ✅ CORRECT - single statement, no blank needed
export default function identity<T>(value: T): T {
	return value
}
```

---

### 7. Comment Consolidation (Envoy Style)

**Rule:** Consolidate repeated `//++` single-line comments into `/*++ ... */` block comments when they describe the same concept.

**Block comment format:**
- Opening: `/*++`
- Each line: ` + Content` (space, plus sign, space, then content)
- Closing: ` */` (space before the asterisk-slash)

**Why:** Reduces visual noise, groups related explanations.

**Example violation:**
```typescript
// ❌ WRONG - repeated single-line comments
//++ This function validates user input
//++ It checks for required fields
//++ And returns a Result monad
export default function validateUser(input: unknown): Result<ValidationError, User> {
	// implementation
}
```

**Corrected:**
```typescript
// ✅ CORRECT - consolidated block comment with proper format
/*++
 + This function validates user input.
 + It checks for required fields and returns a Result monad.
 */
export default function validateUser(input: unknown): Result<ValidationError, User> {
	// implementation
}
```

---

## Implementation Strategy

### Step 1: Parse the file with TypeScript AST
- Use Deno's built-in TypeScript parser or ts-morph
- Identify all nodes: imports, statements, blocks, returns, comments
- Preserve all formatting that doesn't violate rules

### Step 2: Apply fixes in priority order
1. **Imports:** Sort and group with blank line separators
2. **Blank lines:** Remove duplicate blank lines (max 1)
3. **Block edges:** Remove blank lines at start/end of blocks
4. **Multi-line:** Add blank lines before/after multi-line statements
5. **Statement types:** Add blank lines between different statement type groups
6. **Returns:** Add blank line before return statements
7. **Comments:** Consolidate repeated `//++` comments into blocks

### Step 3: Show diff and ask for confirmation
- Display unified diff showing all changes
- Ask: "Apply these changes? (y/n)"
- Only write file if user confirms "y"

### Step 4: Write corrected file
- Preserve all functionality (no logic changes)
- Run `deno fmt` on the result to ensure consistency
- Report success with count of violations fixed

---

## Safety Guarantees

1. **AST-aware:** Uses TypeScript AST parsing, not regex
2. **Logic-preserving:** Only changes whitespace and import order
3. **Confirmation required:** Shows diff before writing
4. **Dry-run available:** Use `--check` flag to see violations without fixing
5. **Tests preserved:** All tests must pass before/after

---

## Command Flags

- `--check`: Report violations without fixing (dry-run mode)
- `--no-confirm`: Skip confirmation and apply fixes immediately (use with caution)
- `--verbose`: Show detailed reasoning for each fix

---

## Example Run

```bash
$ /organize-code libraries/toolsmith/src/array/filter/index.test.ts

🔍 Analyzing: libraries/toolsmith/src/array/filter/index.test.ts

Found 3 violations:

1. IMPORT_ORDER_001: Missing blank line between external and internal imports (line 3)
2. PROXIMITY_MULTILINE_SPACING_001: Missing blank line after multi-line object (line 15)
3. PROXIMITY_RETURN_SPACING_001: Missing blank line before return (line 42)

Generating fixes...

📝 Proposed changes:

--- a/libraries/toolsmith/src/array/filter/index.test.ts
+++ b/libraries/toolsmith/src/array/filter/index.test.ts
@@ -1,6 +1,7 @@
 import { assertEquals } from "@std/assert"
 import * as fc from "https://esm.sh/fast-check@4.1.1"
+
 import filter from "./index.ts"
 import isOk from "../../monads/result/isOk/index.ts"
@@ -12,6 +13,7 @@
 	timeout: 5000,
 	retries: 3,
 }
+
 const result = process(config)
@@ -39,6 +41,7 @@
 	const validated = validate(input)
+
 	return validated
 }

✅ Apply these changes? (y/n):
```

---

## Notes

- This command does NOT change logic, only formatting and organization
- All tests must pass before and after running this command
- For best results, run `deno fmt` after organizing to ensure consistency
- Consider running on entire folders to achieve codebase-wide compliance

---

## What This Command Does NOT Do

- Does NOT fix constitutional rule violations (loops, mutations, arrow functions, etc.)
  - Use `deno task fp:check` for that
- Does NOT fix naming violations
- Does NOT fix type errors
- Does NOT change any logic or behavior

This command is PURELY about code organization and visual structure.
