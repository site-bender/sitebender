# Arborist - Next Session Start Here

**Last Updated**: 2025-10-10  
**Status**: Substantially Complete (188/188 tests passing)  
**Current Work**: Batch 0 - Fix TypeScript errors and lint warnings

## Quick Context

Arborist is a TypeScript/JSX parsing library using SWC WASM for syntax parsing. It extracts functions, types, imports, exports, constants, comments, and detects constitutional rule violations.

**The library WORKS** - all functionality is implemented and tested. You are doing **polish work**, not rescue work.

## Current State

### ✅ What's Done (Don't Redo This)
- **All 188 tests passing** (with `--no-check` flag)
- **Core functionality**: Parse, extract, analyze - all working
- **Batches 1-4 complete**: Infrastructure, arrow removal, loop removal, === replacement
- **Constitutional compliance**: Curried functions, no classes, no loops, no mutations
- **Documentation**: README.md (aspirational end state - DON'T TOUCH)

### 🔧 What Needs Fixing (Your Job)

**Batch 0 - CRITICAL** (Must do first):
1. Fix 6 TypeScript errors (see fix_plan.md section 0.1-0.3)
2. Remove 8 unused imports (see fix_plan.md section 0.5)

**Batch 5+ - IN PROGRESS**:
3. Continue operator substitutions (`||`, `.length`, `!`, `&&`, etc.)

## The Work Queue

Complete these batches IN ORDER. DO NOT SKIP BATCH 0.

### Batch 0: Fix TypeScript Errors (START HERE)

**Priority**: CRITICAL  
**Goal**: Make `deno task test` work WITHOUT `--no-check`

#### Task 0.1: Fix Toolsmith Import Path

**File**: `libraries/toolsmith/src/monads/validation/fold/index.ts:1`

**Change**:
```typescript
// FROM THIS:
import type { NonEmptyArray } from "../../types/NonEmptyArray/index.ts"

// TO THIS:
import type { NonEmptyArray } from "../../types/index.ts"
```

The NonEmptyArray type exists in `toolsmith/src/types/index.ts` at line 51, NOT in a separate directory.

#### Task 0.2: Fix Boolean Logic in extractTypes

**File**: `libraries/arborist/src/extractTypes/index.ts:63`

**Change**:
```typescript
// FROM THIS:
return decl && isEqual(decl.type)("TsTypeAliasDeclaration") ||
    decl && isEqual(decl.type)("TsInterfaceDeclaration")

// TO THIS:
return (decl && isEqual(decl.type)("TsTypeAliasDeclaration")) ||
    (decl && isEqual(decl.type)("TsInterfaceDeclaration"))
```

Add parentheses to fix precedence and prevent undefined return value.

#### Task 0.3: Fix Toolsmith ValidationError Types

**Files**: 
- `toolsmith/src/array/filter/index.ts:23`
- `toolsmith/src/array/find/index.ts:26,39`  
- `toolsmith/src/array/map/index.ts:23`

**Problem**: ValidationError type doesn't accept readonly arrays.

**Note**: This is a Toolsmith library issue. You may need to ask the architect for the proper fix. These errors don't prevent execution but block clean compilation.

### Batch 0.5: Remove Unused Imports (TRIVIAL)

**Rule**: REMOVE unused imports completely. Do NOT prefix with underscore.

**Files to fix**:

1. `src/_extractTypeDetails/index.ts:1` - Remove `Position, Span`
2. `src/_extractImportDetails/index.ts:1` - Remove `Position, Span, ImportBinding`
3. `src/parsers/denoAst/wasm/parseWithSemantics/index.ts:4` - Remove `SemanticInfo`
4. `src/extractComments/extractComments/index.ts:15-18` - Remove `EnvoyMarker, Position`

**Just delete the unused import names from the import statements.**

### Batch 0 Verification

After completing Batch 0, verify:

```bash
cd libraries/arborist

# These should all succeed:
deno check src/              # No TypeScript errors
deno lint src/               # No lint warnings  
deno task test               # Should work WITHOUT --no-check now
```

If all three pass, Batch 0 is complete. Update fix_plan.md and move to Batch 5.

## Batch 5+: Operator Substitutions

After Batch 0 is complete, continue with operator substitutions as documented in `fix_plan.md`.

**Process for each batch**:
1. Use `search_files` to find all instances of the operator
2. Process files in groups of 5-10
3. Add correct Toolsmith imports
4. Replace operators with function calls
5. Run `deno lint` and `deno check` after each file
6. Run full test suite after batch completion
7. Update fix_plan.md checklist

## Critical Rules

### Things You Must Know

1. **All 188 tests pass** - The code works. Don't believe old docs saying it's broken.

2. **Type errors don't prevent execution** - They're annoying but not fatal. Still fix them.

3. **Remove unused imports completely** - Delete them. Don't prefix with underscore.

4. **Operator substitution examples**:
   ```typescript
   // === → isEqual
   import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
   if (a === b) → if (isEqual(a)(b))
   
   // || → or
   import or from "@sitebender/toolsmith/logic/or/index.ts"
   const x = a || b → const x = or(a)(b)
   
   // .length → length
   import length from "@sitebender/toolsmith/array/length/index.ts"
   arr.length → length(arr)
   
   // ! → not
   import not from "@sitebender/toolsmith/logic/not/index.ts"
   if (!valid) → if (not(valid))
   ```

5. **Test after every change** - Run tests frequently. They prove the code works.

6. **Constitutional compliance** - Already achieved. You're just maintaining it.

7. **Don't touch README.md** - It's aspirational end state. Leave it alone.

8. **fix_plan.md is your bible** - Follow it exactly. Update it as you complete work.

### Verification Commands

```bash
# Run after each batch:
deno task test              # All 188 tests must pass
deno check src/             # No type errors
deno lint src/              # No warnings

# During development:
deno lint <modified-file>   # Quick check single file
deno check <modified-file>  # Quick type check single file
```

## Common Mistakes to Avoid

### ❌ DON'T Do These Things

1. **Don't prefix unused imports with underscore** - Just remove them
2. **Don't skip Batch 0** - Fix type errors first
3. **Don't assume the code is broken** - It works, tests prove it
4. **Don't break existing tests** - All 188 must continue to pass
5. **Don't touch README.md** - Leave aspirational docs alone
6. **Don't invent new batches** - Follow fix_plan.md exactly
7. **Don't forget to update fix_plan.md** - Check off completed items

### ✅ DO These Things

1. **Read fix_plan.md completely** before starting
2. **Start with Batch 0** - Fix type errors first
3. **Remove unused imports completely** - Delete them
4. **Test after each change** - Verify nothing breaks
5. **Use search_files to find operators** - Don't guess
6. **Import from correct Toolsmith paths** - Check the paths
7. **Update fix_plan.md** - Check off items as you complete them
8. **Commit frequently** - One commit per batch

## File Structure Reference

```
libraries/arborist/
├── src/
│   ├── parseFile/              # Parse TypeScript files with SWC
│   ├── buildParsedFile/        # Combine all extractors
│   ├── extractFunctions/       # Extract function metadata
│   ├── extractComments/        # Extract comments with Envoy markers
│   ├── extractImports/         # Extract import statements
│   ├── extractExports/         # Extract export statements
│   ├── extractTypes/           # Extract type aliases/interfaces
│   ├── extractConstants/       # Extract const declarations
│   ├── detectViolations/       # Find constitutional violations
│   ├── types/                  # Type definitions
│   └── fix_plan.md            # THIS IS YOUR GUIDE
├── docs/                       # Reference docs
├── demo/                       # Example usage
├── tests/                      # Test files (in src/)
└── README.md                   # ASPIRATIONAL - DON'T TOUCH

Toolsmith (dependency):
libraries/toolsmith/src/
├── validation/                 # isEqual, isUnequal, gt, lt, etc.
├── logic/                      # or, and, not
├── array/                      # length, map, filter, reduce
└── types/                      # NonEmptyArray, Value, etc.
```

## Quick Start Checklist

When you start your session:

- [ ] Read this entire document
- [ ] Read `fix_plan.md` sections 0 through 0.5
- [ ] Run `deno task test --no-check` to verify tests pass
- [ ] Start with Batch 0.1 (fix Toolsmith import)
- [ ] Move through Batch 0 in order
- [ ] Verify with `deno check` and `deno lint`
- [ ] Update fix_plan.md as you complete items
- [ ] Move to Batch 5 only after Batch 0 is complete

## Getting Help

If you encounter issues:

1. **Tests fail**: You broke something. Revert and try again.
2. **Type errors persist**: Read the error carefully. Check import paths.
3. **Unsure about fix**: Ask the architect. Don't guess.
4. **Can't find operator instances**: Use `search_files` with correct regex.
5. **Toolsmith function missing**: Check that Toolsmith has the function you need.

## Success Criteria

You're done when:

- [ ] All 6 TypeScript errors fixed (Batch 0.1-0.3)
- [ ] All 8 lint warnings fixed (Batch 0.5)
- [ ] `deno task test` passes WITHOUT `--no-check`
- [ ] `deno check src/` reports zero errors
- [ ] `deno lint src/` reports zero warnings
- [ ] All 188 tests still passing
- [ ] fix_plan.md updated with your progress

After Batch 0, continue with Batch 5+ using same verification approach.

---

**Remember**: This library works. You're polishing it, not fixing fundamental issues. The tests prove it. Trust the tests.

**Key Document**: `src/fix_plan.md` - Read it, follow it, update it.

**Next Action**: Complete Batch 0 (fix TypeScript errors and lint warnings).
