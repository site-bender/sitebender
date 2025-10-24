---
name: file-system-organization
description: File and folder organization following modular architecture. Use when creating new functions, components, or organizing code. One entity per folder, index files only, private helpers in subfolders, shared code at lowest common ancestor.
---

# File System Organization and Module Hierarchy

## Core Principle

**Everything travels together. Nothing gets left behind.**

When you move a function to a new location, all its dependencies—tests, helpers, constants, types—move with it. When you delete a function, nothing becomes orphaned. This is modular architecture: self-contained, relocatable, deletable units.

## When to Use This Skill

Use this skill when:
- Creating any new function, component, constant, or type
- Deciding where to place a file
- Organizing helper functions
- Structuring shared code
- Refactoring or moving code
- Any time you're about to create a folder or file

## Fundamental Rules

### Rule 1: One Entity Per Folder

Every function and component gets its own folder. The folder name IS the function/component name. The code lives in `index.ts` (or `index.tsx` for components).

Function folders use camelCase. Component folders use PascalCase.

**Structure:**
```
myFunction/
  index.ts          # export default function myFunction(...) { ... }
  index.test.ts     # tests for myFunction
```

Never create files like `myFunction.ts` in a parent folder. Always use `myFunction/index.ts`.

### Rule 2: All Files Are Named `index`

The only filenames you will ever use:
- `index.ts` - TypeScript code
- `index.tsx` - JSX component
- `index.test.ts` - Tests for .ts file
- `index.test.tsx` - Tests for .tsx file
- `index.css` - Component styles
- `index.js` - Transpiled progressive enhancement (from index.ts in component folders)

Never create files with any other name.

### Rule 3: Private Helpers Go in Subfolders

Helper function used by only one function? Put it in a subfolder with underscore prefix.

**Structure:**
```
myFunction/
  index.ts
  index.test.ts
  _helperFunction/
    index.ts        # export default function _helperFunction(...) { ... }
    index.test.ts
```

**Key points:**
- Underscore prefix on BOTH folder name and function name
- Keep the underscore when importing: `import _helperFunction from "./_helperFunction/index.ts"`
- Move `myFunction` folder → `_helperFunction` goes with it
- Delete `myFunction` folder → `_helperFunction` deleted too

**Private vs Public:**
- Private (underscore): NOT part of library's public API. Internal implementation detail.
- Public (no underscore): Part of library's public API. Users can import it.
- Decision: "Will library users need this function?" Yes = public, No = private.

### Rule 4: Shared Code at Lowest Common Ancestor

Helper used by multiple functions? Place it at the lowest common ancestor folder.

**Structure:**
```
validation/
  _applyPredicate/
    index.ts        # Used by both allPass and anyPass, but private (internal detail)
    index.test.ts
  allPass/
    index.ts        # import _applyPredicate from "../_applyPredicate/index.ts"
    index.test.ts
  anyPass/
    index.ts        # import _applyPredicate from "../_applyPredicate/index.ts"
    index.test.ts
```

The ancestor is as deep as possible while still being a parent/ancestor of ALL consumers.

**Note:** Shared helpers can be private (like `_applyPredicate` above) or public, depending on whether they're part of the library's API.

### Rule 5: NO Utility/Helper/Common Folders

These folder names are FORBIDDEN:
- `utils/`
- `utilities/`
- `helpers/`
- `common/`
- `shared/`
- `lib/`

**Why?** They violate modularity. Use the lowest common ancestor pattern instead.

**Exception:** Truly common utilities are imported from Toolsmith library, not created locally.

### Rule 6: NO Barrel Files

Never create index files that just re-export other modules.

**Description of forbidden pattern:**
An index.ts file in a validation folder that exports allPass and anyPass from their subfolders is a barrel file. This is forbidden.

**Correct approach:**
Always use deep linking. Import from the exact location:

```typescript
import allPass from "@sitebender/toolsmith/validation/allPass/index.ts"
import anyPass from "@sitebender/toolsmith/validation/anyPass/index.ts"
```

We tree-shake aggressively. Deep imports enable this.

## Component Structure

Components follow the same rules but use `.tsx` extension and may include CSS and progressive enhancement:

```
MyComponent/
  index.tsx         # export default function MyComponent(...) { ... }
  index.test.tsx    # Component tests
  index.css         # Component styles (auto-linked from <head>)
  index.ts          # Progressive enhancement TS (transpiles to .js, auto-linked)
```

Component folders use PascalCase names.

## Constants Structure

Constants live in a `constants/` folder alongside the function that uses them:

```
myFunction/
  index.ts
  index.test.ts
  constants/
    index.ts        # export const MAX_ITEMS = 6
```

**Key points:**
- Constants are named exports in SCREAMING_SNAKE_CASE
- NO MAGIC NUMBERS in code—extract to constants
- If used by multiple functions, constants rise to lowest common ancestor
- Can group into subfolders: `constants/limits/index.ts`

**Lowest Common Ancestor for Constants:**
Just like functions, constants used by multiple modules rise to the LCA's `constants/` folder.

```
validation/
  constants/
    index.ts              # export const MAX_PREDICATES = 100 (used by both allPass and anyPass)
  allPass/
    index.ts
    constants/
      index.ts            # Constants used only by allPass
  anyPass/
    index.ts
```

## Types Structure

Types live in a `types/` folder alongside the function that uses them:

```
myFunction/
  index.ts
  index.test.ts
  types/
    index.ts        # export type MyType = { ... }
```

**Exceptions for local types:**

**Function-only types go BELOW the function:**
```typescript
export default function myFunction(data: LocalData): Result<Output, Error> {
  // function body
}

type LocalData = {
  readonly field: string
}
```
(One blank line between closing brace and type)

**Component Props go ABOVE the component:**
```typescript
export type Props = {
  readonly name: string
  readonly count: number
}

export default function MyComponent(props: Props) {
  // component body
}
```
(One blank line between Props and component. Always export Props as named export)

**Key points:**
- Types are named exports in PascalCase
- Shared types in `types/` folder
- Local-only types in the same file
- Can group into subfolders: `types/fp/index.ts`

**Lowest Common Ancestor for Types:**
Just like functions and constants, types used by multiple modules rise to the LCA's `types/` folder.

```
validation/
  types/
    index.ts              # export type Predicate<T> = ... (used by both allPass and anyPass)
  allPass/
    index.ts
  anyPass/
    index.ts
```

## Complete Module Example

```
processUser/
  index.ts
  index.test.ts
  constants/
    index.ts              # export const MAX_NAME_LENGTH = 100
  types/
    index.ts              # export type UserData = { ... }
  _validateUser/
    index.ts
    index.test.ts
    _checkAge/
      index.ts
      index.test.ts
```

**Modularity in action:**
- Move `processUser/` → everything moves
- Delete `processUser/` → no orphans left
- `_validateUser` is private to `processUser` (not in API)
- `_checkAge` is private to `_validateUser`
- Constants and types travel with the module

## Import Patterns

**Deep linking only:**
```typescript
import processUser from "@sitebender/toolsmith/processUser/index.ts"
import type { UserData } from "./types/index.ts"
import { MAX_ITEMS } from "./constants/index.ts"
import _validateUser from "./_validateUser/index.ts"
```

**Important:** Type imports use `type` keyword outside braces. Never mix type and non-type imports on the same line.

**Separate type and non-type imports:**
```typescript
// Types together
import type { UserData, ProcessResult } from "./types/index.ts"

// Non-types together
import processUser from "./processUser/index.ts"
import { MAX_ITEMS } from "./constants/index.ts"
```

**Use aliases when they improve readability and reduce cognitive load:**
```typescript
// Good - reduces repetition, makes intent clearer:
import {
	MAX_ACCOUNT_AGE_DAYS as MAX,
	MIN_ACCOUNT_AGE_DAYS as MIN,
} from "./constants/index.ts"

return betweenInclusive(MIN)(MAX)(days) // Clear and concise

// Also acceptable - renaming default exports:
import { default as contains } from "@sitebender/toolsmith/array/includes/index.ts"

export default contains
```

Avoid aliases that obscure meaning or create ambiguity. The test is: does the alias make the code clearer to read?

## Benefits Summary

1. **Modularity** - Self-contained units, relocatable and deletable
2. **Discoverability** - Everything related is in one place
3. **No Orphans** - Delete a folder, delete everything it needs
4. **Tree Shaking** - Deep imports allow aggressive tree shaking
5. **Clear Dependencies** - Folder structure shows dependency graph
6. **Enforced Encapsulation** - Private helpers clearly marked with underscore

## Examples Directory

Examine all examples in `examples/` directory for complete, correct folder structures demonstrating these patterns.
