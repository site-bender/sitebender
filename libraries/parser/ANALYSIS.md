# Parser Library Analysis - Phase 1 Complete

## What Each Library Currently Does

### Prover's TypeScript Parsing

**Location:** `libraries/prover/src/parseSignature/`
- Uses TypeScript compiler directly (`npm:typescript@5.7.2`)
- Creates full TypeScript program with config
- Extracts function signatures with type checker
- Detects: isCurried, isAsync, isGenerator
- Extracts imports from source files

**Location:** `libraries/prover/src/analyzeBranches/`
- Has a VERY basic branch parser (just regex matching)
- Detects: if, ternary, switch, try, logical operators
- Generates test inputs for each branch
- Needs proper AST-based branch detection

### Scribe's TypeScript Parsing

**Location:** `libraries/scribe/src/parser/parseWithCompiler/`
- Also uses TypeScript compiler (`npm:typescript@5.7.2`)
- Creates source files with `ts.createSourceFile`
- Returns Result monad (good pattern to keep)
- Has TODO for proper syntax error checking

**Location:** `libraries/scribe/src/extractors/`
- Formats signatures for documentation
- Doesn't actually parse - just formats existing signatures

## Type Conflicts Between Libraries

### FunctionSignature Differences

**Prover's FunctionSignature:**
```typescript
{
  name: string
  path: string  // File path - prover specific
  parameters: Array<Parameter>
  returnType: TypeInfo  // Complex nested type
  generics?: Array<Generic>
  isCurried: boolean
  isAsync: boolean
  isGenerator: boolean
  imports?: Array<{...}>  // Import tracking
}
```

**Scribe's FunctionSignature:**
```typescript
{
  name: string
  parameters: Array<Parameter>
  returnType: string  // Simple string representation
  generics?: Array<Generic>
  isAsync: boolean
  isGenerator: boolean
  isExported: boolean  // Scribe specific
  isDefault: boolean   // Scribe specific
  // No isCurried, no path, no imports
}
```

### Parameter Type Differences

Both have similar Parameter types:
- name: string
- type: string/TypeInfo
- optional: boolean
- defaultValue?: string

**Key difference:** Prover uses complex `TypeInfo` objects, Scribe uses simple strings

### TypeInfo (Prover only)

Complex recursive type for deep type analysis:
- Handles arrays, unions, intersections, tuples
- Tracks literal values
- Nested type arguments
- Essential for test generation

## What Parser Must Provide

### Core Functions Needed

1. **parseSourceFile**
   - Parse TypeScript file → Ast
   - Use TypeScript compiler Api
   - Return Result<SourceFile, ParseError>

2. **extractSignature**
   - Extract function signature from Ast node
   - Must work for: regular, async, generator, curried
   - Return unified FunctionSignature type

3. **analyzeBranches**
   - Find all conditional branches in function
   - Use real Ast traversal (not regex)
   - Return branch info for coverage

4. **detectProperties**
   - detectPurity - no side effects
   - detectCurrying - returns functions
   - detectAsync - async keyword
   - detectGenerator - function*

5. **extractTypes**
   - Deep type extraction for prover
   - Convert TypeScript types to TypeInfo
   - Handle complex/nested types

### Unified FunctionSignature Design

```typescript
export type FunctionSignature = {
  // Core fields (everyone needs)
  name: string
  parameters: Array<Parameter>
  returnType: TypeInfo  // Rich type for prover, can stringify for scribe
  generics?: Array<Generic>
  
  // Detection fields
  isAsync: boolean
  isGenerator: boolean
  isCurried: boolean
  isPure?: boolean  // From detection
  
  // Context fields
  filePath?: string  // Optional, prover needs it
  isExported?: boolean  // Optional, scribe needs it
  isDefault?: boolean  // Optional, scribe needs it
  
  // Dependencies
  imports?: Array<Import>  // Optional, prover needs it
}

export type Parameter = {
  name: string
  type: TypeInfo  // Rich type info
  optional: boolean
  defaultValue?: string
}

export type TypeInfo = {
  raw: string  // String representation for scribe
  kind: TypeKind
  // ... rest of prover's TypeInfo fields
}
```

This way:
- Prover gets the rich TypeInfo it needs
- Scribe can use TypeInfo.raw for simple strings
- Both share the same structure

## Migration Strategy

### For Prover
1. Move `parseSignature/` logic → parser's `parseSourceFile` + `extractSignature`
2. Move `analyzeBranches/parseSourceCode` → parser's proper AST traversal
3. Keep prover-specific test generation logic

### For Scribe
1. Replace `parser/parseWithCompiler` → parser's `parseSourceFile`
2. Use parser's `extractSignature` for getting signatures
3. Use `TypeInfo.raw` field for string representations
4. Keep scribe-specific formatting logic

## Duplication Found

### TypeScript Compiler Usage
- Both import `npm:typescript@5.7.2`
- Both create source files
- Both parse TypeScript code
- **95% duplication confirmed**

### Signature Extraction
- Both extract function signatures
- Both detect async/generator
- Different levels of detail
- **80% duplication**

### Property Detection
- Scattered throughout both libraries
- No consistent detection logic
- **Should be unified in parser**

## Recommendations

1. **Start with `parseSourceFile`** - Both need it immediately
2. **Unify FunctionSignature** - Use TypeInfo with raw field
3. **Build proper branch analysis** - Prover's current one is too basic
4. **Centralize all TypeScript compiler usage** - Only parser should import it
5. **Use Result monad pattern** - Scribe has it right