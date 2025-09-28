# Quarrier Import Conventions

## Import Order
1. Type imports from external libraries (with 'type' keyword)
2. Type imports from internal sources (with 'type' keyword)  
3. Named imports from external libraries
4. Named imports from internal @sitebender libraries
5. Named imports from internal Quarrier sources

## Import Paths

### For Toolsmith (Internal Library)
Always use monads paths for Result:
```typescript
import type { Result } from "@sitebender/toolsmith/monads/result"
import { ok, err } from "@sitebender/toolsmith/monads/result"
```

### Within Quarrier
Use relative paths:
```typescript
import type { Seed } from "../../types"
import advanceSeed from "../advanceSeed"
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
