# Quarrier Import Conventions

## Import Order

1. Type imports from external libraries (with 'type' keyword)
2. Type imports from internal sources (with 'type' keyword)
3. Named imports from external libraries
4. Named imports from internal @sitebender libraries
5. Named imports from internal Quarrier sources

## Import Paths

### For Toolsmith (Internal Library)

Always use direct imports with full paths including index.ts:

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts";
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts";
import err from "@sitebender/toolsmith/monads/result/error/index.ts";
```

### Within Quarrier

Use relative paths with full index.ts:

```typescript
import type { Seed } from "../../types/index.ts";
import advanceSeed from "../advanceSeed/index.ts";
```

### No Barrel Files

Never create or import from barrel files. Always import directly from the specific function file.

## Function Structure

- One function per file in `index.ts`
- Named function with default export on same line
- Helper functions in subfolders below main function
- Types for function in local `types/index.ts` if multiple, or inline if few

## Example File Structure

```
random/
├── createSeed/
│   ├── index.ts          # Main function
│   ├── validateSeed/     # Helper function
│   │   └── index.ts
│   └── types/
│       └── index.ts      # Local types if needed
└── advanceSeed/
    └── index.ts          # Another function
```

## Naming Conventions

- Functions: camelCase
- Types: PascalCase
- Constants: UPPER_SNAKE_CASE
- Folders: camelCase (match function name)
- Private functions/folders: \_camelCase (prefix with underscore)

## Private Functions

Functions that are only used internally within Quarrier and not exposed in the public API should:

- Have folder names prefixed with underscore (e.g., `_nextUint32`)
- Have function names prefixed with underscore in rare cases where clarity is needed
- Be nested under their single caller if only used by one function
