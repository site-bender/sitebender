# PROMPT.md - Math Parser Library Instructions

## CRITICAL: Read These Files First
1. **`/CLAUDE.md`** - READ THIS COMPLETELY. Contains the prime directive and architectural rules.
2. **`/libraries/maths/README.md`** - Overview of the math parser functionality
3. **`/notes/parsing-math.md`** - Detailed requirements and examples

## Architecture Rules - ABSOLUTELY CRITICAL

### The Prime Directive
> DO NOT ASSUME ANYTHING. DO NOT TAKE SHORTCUTS. DO NOT GUESS.

### One Function Per File Rule (MOST COMMON MISTAKE)
**CRITICAL**: Every function MUST be in its own file following this EXACT pattern:
- ONE function per file, exported as `default`
- File is ALWAYS named `index.ts` (or `index.tsx` for components)
- Function name goes on the FOLDER, not the file
- Example: `libraries/maths/src/tokenizer/index.ts` exports the `tokenize` function

### NEVER DO THIS (Common Violations):
```typescript
// ❌ WRONG - Multiple functions in one file
export function helper1() { }
export function helper2() { }
export default function main() { }

// ❌ WRONG - Class with methods
export default class Parser {
  parse() { }
  parseExpression() { }
}

// ❌ WRONG - Inline helper functions
export default function parse() {
  const helper = () => { } // NO! Extract to subfolder
  // ...
}
```

### ALWAYS DO THIS:
```typescript
// ✅ CORRECT - One function per file
// File: parse/index.ts
export default function parse() { /* ... */ }

// ✅ CORRECT - Helper in nested folder
// File: parse/createParserContext/index.ts
export default function createParserContext() { /* ... */ }
```

### Folder Hierarchy Rules
- Helper functions go in NESTED folders inside their parent
- Nesting at the LOWEST branching node where ALL uses occur
- If `f1` is only used by `f2`, structure is: `f2/f1/index.ts`
- Shared functions stay at appropriate shared level

## Math Parser Overview

### Purpose
Parse mathematical formula strings like `"(a / b) + (c / d)"` into @sitebender/engine configuration objects.

### Key Components
1. **Tokenizer** (`src/tokenizer/index.ts`) - Lexical analysis
2. **Parser** (`src/parser/index.ts`) - Builds AST using Pratt parser
3. **Compiler** (`src/compiler/index.ts`) - Transforms AST to engine configs
4. **Main Entry** (`src/parseFormula/index.ts`) - Orchestrates pipeline

### Parser Structure (After Refactoring)
```
parser/
├── index.ts                    # Main parser entry
├── parse/
│   ├── index.ts                # Parse function
│   └── createParserContext/    # Helper function (properly nested)
│       └── index.ts
├── parseExpression/
│   └── index.ts
├── parseBinaryExpression/
│   ├── index.ts
│   └── getOperatorFromToken/   # Helper (properly nested)
│       └── index.ts
├── parseUnaryExpression/
│   └── index.ts
└── parsePrimaryExpression/
    ├── index.ts
    └── expect/                  # Helper (properly nested)
        └── index.ts
```

## Common Mistakes to Avoid

### 1. Class-Based Approach
**NEVER** use classes with methods. The parser was initially written as a class - this violates the rules. Always use pure functions.

### 2. Multiple Functions Per File
**NEVER** put multiple functions in one file. Each function gets its own folder with `index.ts`.

### 3. Inline Helper Functions
**NEVER** define helper functions inside other functions. Extract them to nested folders.

### 4. Import Paths
- Libraries use RELATIVE imports only (no aliases)
- Example: `import Add from "../../../engine/src/constructors/operators/Add/index.ts"`

### 5. Type Exports
- Component Props: Named export as `Props` from component file
- Other types: In `types/` folders with `index.ts`
- Import types separately from values

## JSDoc Requirements

Every function needs JSDoc with 5 examples following FP patterns:

```typescript
/**
 * Brief description of what the function does.
 * 
 * @param paramName - Parameter description
 * @returns What the function returns
 * 
 * @example
 * ```typescript
 * // Example 1: Basic usage
 * const result = functionName(args)
 * // Expected output
 * ```
 * 
 * @example
 * ```typescript
 * // Example 2: Edge case
 * ```
 * 
 * // ... 3 more examples
 */
```

## Testing

### Running Tests
```bash
cd libraries/maths
deno test tests/behaviors/formula-parsing/index.ts
deno test tests/behaviors/tokenization/index.ts
deno test tests/behaviors/formula-properties/index.ts
```

### Test Structure
- Behavioral tests in `tests/behaviors/`
- Property-based tests using fast-check
- Coverage target: >90%

## Error Handling
- Use Result/Either types - NEVER throw exceptions
- All errors return `{ ok: false, error: ParseError }`
- Graceful degradation always

## Type System
- Prefer `type` over `interface` (FP style)
- Use `Array<T>` not `T[]`
- All data immutable
- No classes or OOP patterns

## Current State
The math parser has been fully refactored to comply with all architectural rules:
- ✅ No classes - pure functional approach
- ✅ One function per file
- ✅ Proper folder hierarchy with nested helpers
- ✅ Comprehensive JSDoc
- ✅ All tests passing (32 tests, 91.8% coverage)

## Key Files to Review
1. `src/parser/parse/index.ts` - Shows proper helper extraction
2. `src/parser/parse/createParserContext/index.ts` - Extracted helper example
3. `src/compiler/inferNumericType/index.ts` - Another properly extracted helper
4. `tests/behaviors/formula-parsing/index.ts` - Main test suite

## Development Workflow
1. Read CLAUDE.md thoroughly
2. Check existing patterns in similar files
3. Write function in its own folder/index.ts
4. Extract ALL helpers to nested folders
5. Add JSDoc with 5 FP examples
6. Run tests to verify
7. Never assume, always verify

## Red Flags to Watch For
- Any file with more than one function
- Any class definition
- Any inline helper functions
- Missing JSDoc examples
- Import aliases in library code
- Throwing exceptions instead of Result types

Remember: The user values correctness and following rules over speed. Take time to do it right the first time.