# Scribe AI Prompt - READ THIS FIRST!

## STOP! Before You Write ANY Code

1. **READ CLAUDE.md** - Every single rule. No exceptions.
2. **ONE FUNCTION PER FILE** - Always. Forever. No exceptions.
3. **CHECK THE BOUNDARIES** - Scribe does NOT parse. Parser provides AST nodes.
4. **NO TYPESCRIPT IMPORTS IN DETECTORS** - We receive AST nodes, we don't create them.

## Current Status (as of last session)

### ✅ What We've Done

1. **Deleted bad AST detectors** that imported TypeScript:
   - `detectPurityFromAST` ❌ DELETED
   - `detectCurryingFromAST` ❌ DELETED
   - `detectComplexityFromAST` ❌ DELETED

2. **Fixed comment categories**:
   - Added `PRO` and `CON` to HelpCategory
   - Changed `examples` to `help` (NO backwards compatibility)
   - Categories are UPPERCASE: `EXAMPLE`, `SETUP`, `ADVANCED`, `GOTCHA`, `MIGRATION`, `PRO`, `CON`

3. **Created proper AST infrastructure**:
   - `/detectMathPropertiesFromAST/types/index.ts` - Defines AstNode shapes (NOT interfaces!)
   - `/detectMathPropertiesFromAST/isAssociativeFromAST/` - First proper implementation

4. **Implemented isAssociativeFromAST correctly**:
   ```
   isAssociativeFromAST/
   ├── index.ts (main function - ONE function only)
   ├── constants/index.ts (all constants here)
   ├── hasBinaryAssociativeOperator/
   │   ├── index.ts
   │   └── findInChildren/index.ts
   ├── hasAssociativeMethodCall/index.ts
   └── hasAssociativeFunctionName/index.ts
   ```

### ⚠️ What Still Needs Fixing

1. **generateDocsWithCompiler still imports bad detectors**:
   - Lines 9-10: Still importing deleted detectors
   - Lines 62-64: Still calling deleted functions
   - Need to remove these or create proper replacements

2. **Still need to implement**:
   - `isCommutativeFromAST`
   - `isDistributiveFromAST`
   - `isIdempotentFromAST`
   - `detectPurityFromAST` (properly, no TS imports)
   - `detectCurryingFromAST` (properly, no TS imports)
   - `detectComplexityFromAST` (properly, no TS imports)

## The Sacred Rules (NEVER VIOLATE)

### 1. One Function Per File

```typescript
// ✅ RIGHT: functionName/index.ts
export default function functionName() {}

// ❌ WRONG: Multiple functions
function helper() {}
export default function main() {}
```

### 2. Folder Structure

```
functionName/
├── index.ts              # Main function
├── constants/index.ts    # Constants ONLY here
├── types/index.ts        # Types ONLY here
└── helperName/          # Each helper in own folder
    └── index.ts
```

### 3. No Native Array Methods

```typescript
// ❌ WRONG
array.includes(x)
array.map(fn)
array.filter(fn)

// ✅ RIGHT - Use toolkit
import some from "../../toolkit/src/simple/array/some/index.ts"
import map from "../../toolkit/src/simple/array/map/index.ts"
import contains from "../../toolkit/src/simple/string/contains/index.ts"
```

### 4. Const Only

```typescript
// ❌ WRONG
let x = 5
var y = 10

// ✅ RIGHT
const x = 5
```

### 5. Types Not Interfaces

```typescript
// ❌ WRONG
interface Person {
	name: string
}

// ✅ RIGHT
type Person = { name: string }
```

### 6. Proper Naming

```typescript
// ❌ WRONG
ASTNode, HTMLElement, XMLParser

// ✅ RIGHT
AstNode, HtmlElement, XmlParser
```

### 7. Named Functions (Even Inner Ones)

```typescript
// ✅ RIGHT
some(function checkCondition(x: number) {
	return x > 5
})(array)

// ❌ WRONG
some((x: number) => x > 5)(array)
```

## The Boundary Rules

### What Parser Does

- Parses TypeScript source into AST
- Provides AST nodes to Scribe
- Owns all TypeScript compiler imports

### What Scribe Does

- Receives AST nodes from Parser
- Analyzes node structure
- NEVER imports TypeScript compiler
- NEVER parses source code

### The AST Node Shape

```typescript
type AstNode = {
	kind: number
	pos: number
	end: number
	parent?: AstNode
	getText(): string
	getChildCount(): number
	getChildAt(index: number): AstNode | undefined
	forEachChild<T>(cbNode: (node: AstNode) => T | undefined): T | undefined
}
```

## Common Mistakes to Avoid

1. **Putting multiple functions in one file** - ALWAYS check
2. **Using `let` or `var`** - Only `const`
3. **Using `.includes()`, `.map()`, etc.** - Use toolkit
4. **Importing TypeScript in detectors** - NEVER
5. **Creating interfaces** - Use types
6. **Wrong acronym casing** - `AstNode` not `ASTNode`
7. **Constants inline** - Put in constants/index.ts
8. **Types inline** - Put in types/index.ts
9. **Backwards compatibility** - NO! Change everywhere

## Next Steps

1. Fix `generateDocsWithCompiler` imports
2. Implement remaining AST detectors (one at a time)
3. Test everything works
4. Delete all string-based math property detectors

## Remember

- **Small steps** - One function at a time
- **Verify everything** - Don't assume
- **Follow the rules** - No exceptions
- **Ask when uncertain** - Better safe than sorry

## The Architect Is Watching

Every line of code will be reviewed. Every shortcut will be found. Every violation will be corrected.

Do it right or don't do it at all.
