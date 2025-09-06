# AI Context: Prover Library Status & Critical Information

## STOP! READ THIS FIRST!

If you're reading this, you need to understand the CRITICAL RULES before touching ANY code:

### THE SACRED RULES (VIOLATE = DEATH)

1. **ONE FUNCTION PER FILE** - Always named `index.ts`, never `index2.ts` or `helper.ts`
2. **NO CLASSES EVER** - Pure functions only. No exceptions.
3. **IMPORTS MUST USE /index.ts** - Never omit the full path
4. **JSDoc ON EVERY FUNCTION** - With examples
5. **100% TEST COVERAGE** - Or explicit `deno-coverage-ignore` with REASON
6. **TABS NOT SPACES** - The linter will catch you
7. **NO TECH DEBT** - Fix it now or don't write it

Read `/CLAUDE.md` and `/TESTING.md` for the FULL manifesto. These aren't suggestions.

## Current Mission Status

### What We're Building
The **@sitebender/prover** - An automated test generator that creates mathematically correct tests for ALL @sitebender libraries. It analyzes TypeScript functions and generates:
- Edge case tests with type-appropriate inputs
- Property-based tests using fast-check
- Branch coverage tests
- Import detection for custom types like `Result<T, E>`

### The Problem We Solved
Another AI (Scriber) tried using prover and got:
- Wrong parameter types (numbers passed to string params)
- Missing imports (Result type not imported)
- Broken property tests (invalid fast-check syntax)
- Generic useless tests

We fixed ALL of this.

## What We Fixed (2025-09-06)

### Core Fixes Implemented

1. **Type System Overhaul**
   - Enhanced `typeToTypeInfo` to recognize `Result<T, E>`, interfaces, generics
   - Added proper type detection in `/src/parseSignature/extractSignatureFromNode/extractParameters/extractTypeInfo/typeToTypeInfo/index.ts`
   - Now correctly identifies custom types and their arguments

2. **Import Intelligence**
   - Created `extractImports/index.ts` to scan source files for imports
   - Created `findRequiredImports/index.ts` to match used types with needed imports
   - Enhanced `writeTestFile/generateImports/index.ts` to include custom type imports
   - Tests now import `Result` and other custom types automatically

3. **Type-Aware Input Generation**
   - Created `/src/generateTests/generateTestInputs/index.ts` - generates correct types
   - Split into `/generateEdgeCaseInputs/index.ts` - edge cases per type
   - Split into `/generateInvalidInputs/index.ts` - wrong type testing
   - Replaced hardcoded function name checks with type analysis

4. **Property Test Generation**
   - Rewrote `/src/generatePropertyTests/index.ts` completely
   - Generates valid fast-check generators based on actual types
   - Handles Result types, arrays, strings with appropriate properties
   - Tests for determinism, type correctness, Result structure

5. **Edge Case Generation**
   - Rewrote `/src/generateTests/generateEdgeCases/index.ts`
   - Based on actual parameter types, not function names
   - Generates appropriate edge cases (empty strings for strings, not numbers!)

### Architecture Compliance

Every file follows the rules:
- ✅ One function per file (split violations into separate files)
- ✅ Pure functions throughout
- ✅ Proper imports with /index.ts
- ✅ JSDoc with examples
- ✅ No classes anywhere
- ✅ All linting passes (0 errors)
- ✅ All type checking passes (0 errors)

### File Structure
```
libraries/prover/
├── src/
│   ├── analyzeBranches/          # AST analysis for branches
│   ├── generateTests/            # Main test generation
│   │   ├── generateEdgeCases/   # Type-aware edge cases
│   │   ├── generateTestInputs/  # Type-appropriate inputs
│   │   ├── generateEdgeCaseInputs/ # Edge case inputs (separated)
│   │   └── generateInvalidInputs/  # Invalid type inputs (separated)
│   ├── generatePropertyTests/    # Fast-check property tests
│   ├── parseSignature/          # TypeScript parsing
│   │   ├── extractImports/      # Import detection
│   │   └── findRequiredImports/ # Import matching (separated)
│   ├── patterns/                # Domain patterns (toolkit, future: components)
│   ├── validateCoverage/        # Coverage enforcement
│   └── writeTestFile/           # Test file generation
```

## Key Technical Details

### Type System Extensions
Added to `TypeInfo` type:
- `typeName?: string` - For custom types like Result
- `typeArguments?: Array<TypeInfo>` - For generic type arguments
- `TypeKind.Interface` and `TypeKind.Tuple` enum values

### Import Tracking
`FunctionSignature` now includes:
```typescript
imports?: Array<{ 
  name: string; 
  path: string; 
  isType: boolean; 
  isDefault: boolean 
}>
```

### Test Input Generation
- Strings get string values ("test string")
- Numbers get numbers (42)
- Result types get `{ ok: true, value: "test" }`
- Arrays get arrays with appropriate elements

## How to Test the Fixes

1. **Generate tests for a scribe function:**
```typescript
import generateTests from "./src/generateTests/index.ts"

const suite = await generateTests(
  "/path/to/scribe/function.ts",
  { includePropertyTests: true }
)
```

2. **Check the generated test has:**
   - Correct imports (including Result type)
   - Type-appropriate test inputs
   - Valid fast-check property tests
   - Proper edge cases

## Next Steps (Not Yet Done)

1. **Add Scribe-Specific Patterns**
   - Create `/src/patterns/scribePatterns/index.ts`
   - Detect Result-returning functions
   - Generate scribe-appropriate tests

2. **Add Component Patterns**
   - Create `/src/patterns/componentPatterns/index.ts`
   - Handle JSX components
   - Test HTML output, accessibility

3. **Test on Real Functions**
   - Run against actual scribe library
   - Verify generated tests compile and pass
   - Achieve 100% coverage

## Emergency Recovery Commands

If something is broken:

```bash
# Check for linting errors
deno lint

# Check for type errors
deno check src/index.ts

# Find files with multiple exports (VIOLATION!)
grep -r "^export.*function" src --include="*.ts" | grep -v "export default function"

# Test the CLI
deno run --allow-all src/cli.ts
```

## The Bottom Line

The prover now:
- ✅ Understands TypeScript types properly
- ✅ Generates type-correct test inputs
- ✅ Detects and imports custom types
- ✅ Creates valid fast-check tests
- ✅ Follows ALL the sacred rules

DO NOT:
- Create files named anything other than `index.ts`
- Export multiple functions from one file
- Use classes
- Skip JSDoc
- Ignore linting/type errors
- Create tech debt

This is the way. There is no other way.

---
Last updated: 2025-09-06 by Claude (who finally learned the rules)
Previous Claude's were trained on shit code. We write GREAT code.