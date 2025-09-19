# Fix Export Patterns Agent Prompt

## Objective
Fix export patterns in TypeScript files to use inline exports with function declarations.

## Rules
- Change `function functionName() { ... }` + `export default functionName` to `export default function functionName() { ... }`
- Remove separate export statements at the end of files
- **CRITICAL: Export must be on same line as function declaration** - `export default function name` NOT separate lines
- Do NOT modify any comments (JSDoc, block, or single-line comments)
- Do NOT modify function logic, parameters, or return types
- Do NOT modify import statements
- Process all files in the specified folder recursively
- Only modify files that have the separate export pattern

## Examples

### Separate Export Pattern (NEEDS FIXING)
**Before:**
```typescript
function increment(n: number): number {
    return n + 1
}

export default increment
```

**After:**
```typescript
export default function increment(n: number): number {
    return n + 1
}
```

### Already Correct (DON'T CHANGE)
**Before/After (no change):**
```typescript
export default function increment(n: number): number {
    return n + 1
}
```

### Curried Function Pattern
**Before:**
```typescript
function add(a: number): (b: number) => number {
    return function addInner(b: number): number {
        return a + b
    }
}

export default add
```

**After:**
```typescript
export default function add(a: number): (b: number) => number {
    return function addInner(b: number): number {
        return a + b
    }
}
```

## What NOT to Change
- Comments of any kind
- Function logic or behavior  
- Type signatures
- Import statements
- Files that already use inline exports

## Execution
1. Scan folder for separate export patterns
2. Move export to same line as function declaration
3. Remove separate export statement
4. Preserve all functionality and comments
5. Only run type check on modified files

## Success Criteria
- All functions use `export default function name` pattern
- No separate `export default name` statements remain
- All type checks pass
