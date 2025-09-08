# Scribe AST Migration Brief

## Current Situation

You've just completed a major refactoring of the math property detectors in Scribe (isAssociative, isCommutative, isDistributive, isIdempotent), transforming 562 lines of imperative code into ~100 lines of functional code. However, there's a critical architectural issue: these detectors are using string/regex analysis instead of proper AST parsing.

### What You Did Right

1. **Extracted constants to dedicated folders** - All patterns and magic strings now live in `constants/index.ts`
2. **Created single-purpose helper functions** - Each function does ONE thing, lives in its own folder
3. **Replaced imperative loops** - Used toolkit FP functions (some, reduce, map, filter)
4. **Replaced OOP methods** - Used toolkit equivalents (test, contains, some) instead of .test(), .includes(), .some()
5. **Applied consistent formatting**:
   ```typescript
   // Good - explicit braces
   if (!condition) {
     return false
   }
   
   // Bad - single line
   if (!condition) return false
   ```
6. **Added blank lines before returns in inner functions**
7. **Converted to Scribe comment syntax** - `//++` for descriptions, `//?? [EXAMPLE]` for examples

### The Architectural Problem

The codebase has two parallel detection systems:

**AST-Based (Correct Approach):**
- `detectPurityFromAST(node)` - Analyzes TypeScript AST nodes
- `detectCurryingFromAST(node)` - Properly traverses AST structure
- `detectComplexityFromAST(node, sourceFile)` - Counts actual loops/branches in AST

**String-Based (Current Math Properties - WRONG):**
- `isAssociative(source: string)` - Uses regex patterns
- `isCommutative(source: string)` - Counts string occurrences
- `isDistributive(source: string)` - Pattern matching on strings
- `isIdempotent(source: string)` - String searching

The worst offender is `hasSymmetricParameters` which literally counts how many times parameter names appear as strings instead of analyzing their actual usage in the AST.

## Rules You Must Follow

### From CLAUDE.md (The Law)

1. **One function per file** - No exceptions
2. **Folders are named, files are not** - Always `functionName/index.ts`
3. **No classes, ever** - Functional programming only
4. **No shortcuts** - Do it right or don't do it
5. **Types in types/, Constants in constants/**
6. **Import from toolkit using relative paths in libraries**
7. **Named functions over arrow functions**
8. **The code should read like English**

### Specific Lessons from This Refactor

1. **Don't duplicate extractFunctionName** - We created 4 identical copies. Should have one shared version
2. **Don't duplicate hasAnyPattern** - Same issue, multiple identical implementations
3. **The toolkit is sacred** - Don't touch it, only import from it
4. **Inner functions need names too**:
   ```typescript
   return some(function matchesPattern(pattern: RegExp) {  // Named!
     return test(pattern)(source)
   })(patterns)
   ```

## The Plan: Full AST Migration

### Phase 1: Create AST-Based Infrastructure

Create `/libraries/scribe/src/detectors/detectMathPropertiesFromAST/` with:

```
detectMathPropertiesFromAST/
├── index.ts                           # Main orchestrator
├── types/
│   └── index.ts                      # AST-specific types
├── shared/
│   ├── extractFunctionNameFromAST/   # Shared AST name extractor
│   ├── findBinaryOperators/          # Find +, *, &&, etc. in AST
│   ├── analyzeParameterUsage/        # Track how params are used
│   └── findMethodCalls/              # Find Math.max, etc.
├── isAssociativeFromAST/
│   ├── index.ts
│   └── helpers/
│       ├── hasBinaryAssociativeOp/
│       └── hasAssociativePattern/
├── isCommutativeFromAST/
│   ├── index.ts
│   └── helpers/
│       ├── hasSymmetricParameterUsage/  # PROPER AST analysis
│       └── hasCommutativeOperator/
├── isDistributiveFromAST/
│   ├── index.ts
│   └── helpers/
│       └── hasTernaryDistributivePattern/
└── isIdempotentFromAST/
    ├── index.ts
    └── helpers/
        └── hasIdempotentOperation/
```

### Phase 2: Implement Proper AST Analysis

Instead of:
```typescript
// WRONG - String counting
const param1Count = (source.match(new RegExp(`\\b${param1}\\b`, "g")) || []).length
```

Do:
```typescript
// RIGHT - AST traversal
function analyzeParameterUsage(node: ts.FunctionLikeDeclaration): ParameterUsage {
  const usage = new Map<string, UsageContext[]>()
  
  ts.forEachChild(node.body, function visitNode(child) {
    if (ts.isIdentifier(child)) {
      // Track actual usage in AST
    }
  })
  
  return usage
}
```

### Phase 3: Fake the AST (Temporary)

Since the Parser isn't ready yet, create a temporary bridge:

```typescript
//++ Temporary AST generator until Parser is ready
export default function createFakeAST(source: string): ts.Node {
  const sourceFile = ts.createSourceFile(
    "temp.ts",
    source,
    ts.ScriptTarget.Latest,
    true
  )
  
  // Find the first function declaration
  let functionNode: ts.Node | undefined
  
  ts.forEachChild(sourceFile, function findFunction(node) {
    if (ts.isFunctionDeclaration(node) || 
        ts.isFunctionExpression(node) || 
        ts.isArrowFunction(node)) {
      functionNode = node
    }
  })
  
  return functionNode || sourceFile
}
```

### Phase 4: Update Integration Points

Replace in `generateDocsWithCompiler`:
```typescript
// OLD
isIdempotent: isIdempotent(functionSource),
isCommutative: isCommutative(functionSource),

// NEW
isIdempotent: isIdempotentFromAST(node),
isCommutative: isCommutativeFromAST(node),
```

### Phase 5: Delete String-Based Versions

Once AST versions are working, completely remove the string-based detectors.

## Key AST Patterns to Detect

### Associative
- Binary operators: `ts.SyntaxKind.PlusToken`, `ts.SyntaxKind.AsteriskToken`
- Method calls: `ts.isCallExpression` with `Math.max`, `Math.min`
- Check if `(a op b) op c` === `a op (b op c)` structurally

### Commutative
- Symmetric parameter usage in binary expressions
- Check if parameters appear in same contexts
- `a + b` and `b + a` should have identical AST structure (just swapped)

### Distributive
- Ternary functions with specific patterns
- Look for `a * (b + c)` type structures in AST
- Check for map/reduce patterns

### Idempotent
- Specific method calls: `Math.abs`, `Math.floor`
- Type coercions: `Boolean()`, `String()`
- Check if applying twice has no effect

## Success Criteria

1. **Zero string analysis** - Everything uses AST
2. **Proper parameter tracking** - Real usage analysis, not string counting
3. **Operator detection via SyntaxKind** - Not regex
4. **Maintain functional style** - No classes, one function per file
5. **Keep the English readability** - Main functions should still be 15-20 lines
6. **100% type safety** - Full TypeScript AST types

## Remember

- The Architect is watching
- No shortcuts
- Test everything with `deno task type-check`
- The toolkit has the FP functions you need
- If you find yourself writing a for loop, stop and use toolkit functions
- Every function needs a name, even inner ones
- Constants go in constants folders
- Types go in types folders
- The code should read like plain English

Good luck. Make it right.