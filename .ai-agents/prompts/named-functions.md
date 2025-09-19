# Named Functions Agent Prompt

## Objective
Convert arrow functions to named function declarations in TypeScript files while maintaining functionality and improving code clarity.

## Rules
- Convert `const/let/var functionName = (params) => result` to `export default function functionName(params): ReturnType { return result }`
- For curried functions like `(a) => (b) => result`, use named inner functions: `function outer(a) { return function outerInner(b) { return result } }`
- **CRITICAL: Export on same line as function declaration** - `export default function name` NOT separate `export default name`
- Do NOT modify any comments (JSDoc, block, or single-line comments)
- Preserve all functionality and type signatures exactly
- Handle throwing functions carefully - avoid triggering errors during transformation
- Process all files in the specified folder recursively

## Examples

### Simple Arrow Function
**Before:**
```typescript
const increment = (n: number): number => n + 1

export default increment
```

**After:**
```typescript
export default function increment(n: number): number {
    return n + 1
}
```

### Curried Arrow Function
**Before:**
```typescript
const add = (a: number) => (b: number): number => a + b

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

### Complex Function with Error Handling
**Before:**
```typescript
const parseJson = (str: string): unknown => {
    if (!str) throw new Error("Empty string")
    return JSON.parse(str)
}

export default parseJson
```

**After:**
```typescript
export default function parseJson(str: string): unknown {
    if (!str) throw new Error("Empty string")
    return JSON.parse(str)
}
```

## What NOT to Change
- Comments of any kind (JSDoc, //, /* */)
- Import statements
- Function logic or behavior
- Type definitions
- Variable names

## Execution
1. Scan folder for arrow function assignments
2. Convert each arrow function to named function declaration
3. Ensure export is on same line as function declaration
4. Preserve all comments and functionality
5. Run type check only on modified files (not entire codebase)

## Test Command
After conversion, run: `deno check [modified-files-only]`
