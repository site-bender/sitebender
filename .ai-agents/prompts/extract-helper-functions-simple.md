# Extract Helper Functions - Simple Version

## Task
Find anonymous arrow functions and extract them to named helper functions in subfolders.

## What to Look For
```typescript
// FIND THESE PATTERNS:
.map(x => something)
.filter(item => condition) 
.sort((a, b) => comparison)
.reduce((acc, item) => operation)

// Also find internal helper functions that are substantial (>5 lines)
```

## How to Extract
1. **Create subfolder** with camelCase name (e.g., `sortByKey/`)
2. **Create `index.ts`** in subfolder with `export default function sortByKey`
3. **Add import** to original file: `import sortByKey from "./sortByKey/index.ts"`
4. **Replace usage** with function name

## Example
```typescript
// BEFORE:
return entries.sort(([a], [b]) => a.localeCompare(b))

// AFTER:
import sortByKey from "./sortByKey/index.ts"
return entries.sort(sortByKey)

// NEW FILE: sortByKey/index.ts
export default function sortByKey([a]: [string, unknown], [b]: [string, unknown]): number {
    return a.localeCompare(b)
}
```

## Rules
- Only extract if function is >3 lines OR used multiple times
- Keep all TypeScript types intact
- Use relative imports
- Name functions descriptively

## Target
Process all files in the specified folder only.
