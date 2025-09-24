# Generate Toolsmith Inventory

Automatically generates a comprehensive inventory of all functions in `libraries/toolsmith/src/vanilla/` for use by AI agents during code transformation. The inventory is output in YAML format to `docs/toolsmith-inventory.yaml`.

## Purpose

This script scans the vanilla toolsmith directory and creates `docs/toolsmith-inventory.yaml` containing:

- Function names and signatures
- Import paths
- Parameter patterns (for detecting replacements)
- Categories based on folder structure

## Usage

```bash
# Generate/update the toolsmith inventory
deno task update-toolsmith-inventory
```

## Output

Creates `docs/toolsmith-inventory.yaml` with structure:

```yaml
category:
  functionName:
    signature: "function signature"
    path: "relative/import/path"
    curried: true/false
```

The script also:

- **Processes functions in parallel batches** for better performance
- **Categorizes files** into:
  - ✅ Successfully processed functions
  - 🔄 Aliased functions (re-exports like `std` → `standardDeviation`)
  - 📝 Type/constant files (skipped as they don't contain functions)
  - ❌ Failed files (actual errors logged to stderr)

This inventory is referenced by the `replace-with-toolsmith-functions.md` prompt to systematically replace ad-hoc implementations with existing toolsmith functions.

## Coding Standards (STRICT FP RULES - NO EXCEPTIONS)

This codebase follows strict functional programming principles. **These rules apply to ALL files, ALL the time, with NO exceptions:**

### File Organization

- **ONE FUNCTION PER FILE** - Each file contains exactly one function, no more, no less
- Function name MUST match folder name in camelCase
- Private/internal functions are prefixed with underscore (e.g., `_extractFunctionInfo`)
- Helper functions go in subfolders at the lowest common ancestor (if only used by one function, nest it inside that function's folder)

### Function Declaration

- **Named functions ONLY** - Never use arrow functions for exports
- All functions MUST be curried when they take multiple parameters
- Export default on the SAME LINE as declaration: `export default function functionName(...)`
- Never use anonymous functions

### Functional Programming Rules

- **NO mutable variables** - No `let`, no mutations, no pushing to arrays
- **NO imperative loops** - No `for`, `while`, `do-while`. Use recursion, `map`, `filter`, `reduce`, etc.
- **NO JavaScript OOP methods** - Don't use `string.split()`, `array.indexOf()`, etc.
- **NO any types** - Never use `any`. Use proper types like `Value` or `Serializable` from toolsmith
- **USE toolsmith functions** - Import from `@sitebender/toolsmith/vanilla/` for all operations
- Pure functions only - no side effects in the logic (console logging for errors is acceptable)

### Constants and Patterns

- **ALL RegExp patterns in constants file** - No inline regex literals
- RegExp constants use descriptive names: `MATCH_*` for matching, `REPLACE_*` for replacement
- Constants in SCREAMING_SNAKE_CASE

### Imports

- Use `@sitebender/toolsmith/vanilla/` for all toolsmith imports (not relative paths)
- Use the `getRelativePath` helper for generating relative imports between local files
- Import types separately using the `type` keyword

### Examples of What NOT to Do

```typescript
// ❌ WRONG - Multiple functions in one file
function helper() { ... }
export default function main() { ... }

// ❌ WRONG - Arrow function
export default const myFunction = () => { ... }

// ❌ WRONG - Mutable variable
let result = []
result.push(item)

// ❌ WRONG - Imperative loop
for (const item of items) { ... }

// ❌ WRONG - OOP method
const parts = filePath.split("/")

// ❌ WRONG - Inline RegExp
content.match(/export\s+default/)
```

### Examples of What TO Do

```typescript
// ✅ CORRECT - One function per file
export default function myFunction(param: string) {
  return function withNextParam(next: number): Result {
    // Pure FP logic here
  };
}

// ✅ CORRECT - Use toolsmith functions
import split from "@sitebender/toolsmith/vanilla/string/split/index.ts";
const parts = split("/")(filePath);

// ✅ CORRECT - RegExp in constants
import { MATCH_EXPORT_DEFAULT } from "../constants/index.ts";
const matches = match(MATCH_EXPORT_DEFAULT)(content);

// ✅ CORRECT - Pure FP with map/filter/reduce
const results = pipe([
  map(processItem),
  filter(isValid),
  reduce(combine)(initialValue),
])(items);
```

### Remember

These rules create clean, composable, testable code. When in doubt:

1. Check if a toolsmith function exists for what you need
2. Create a new helper function in its own file
3. Keep everything pure and immutable
4. Name things clearly and descriptively

**The rules are THE RULES - ALL THE TIME, NOT JUST SOMETIMES**
