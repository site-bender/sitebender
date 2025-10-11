# Arborist - Next Session Start Here

**Last Updated**: 2025-10-10
**Status**: Substantially Complete (188/188 tests passing)
**Current Work**: Batch 6 & 7 Discovery Complete - Ready for implementation

## Quick Context

Arborist is a TypeScript/JSX parsing library using SWC WASM for syntax parsing. It extracts functions, types, imports, exports, constants, comments, and detects constitutional rule violations.

**The library WORKS** - all functionality is implemented and tested. You are doing **polish work**, not rescue work.

## Current State

### ✅ What's Done (Don't Redo This)
- **All 188 tests passing** (with `--no-check` flag)
- **Core functionality**: Parse, extract, analyze - all working
- **Batches 1-4 complete**: Infrastructure, arrow removal, loop removal, === replacement
- **Batch 5 complete**: || operator replacement (6 files, 50 instances)
- **Batch 6 discovery complete**: .length operator found (19 files, 108 instances)
- **Batch 7 discovery complete**: ! operator found (18 files, 23 instances)
- **Constitutional compliance**: Curried functions, no classes, no loops, no mutations
- **Documentation**: README.md (aspirational end state - DON'T TOUCH)

### 🔧 What Needs Fixing (Your Job)

**Batch 6 & 7 - READY FOR IMPLEMENTATION**:
1. Replace `.length` operators with `length()` calls (19 files, 108 instances)
2. Replace `!` operators with `not()` calls (18 files, 23 instances)

**Batch 8+ - PENDING**:
3. Continue with `&&`, `!==`, and comparison operators

## The Work Queue

Complete these batches IN ORDER. DO NOT SKIP BATCH 0.

### Batch 6 & 7: Operator Substitutions (START HERE)

**Priority**: HIGH
**Goal**: Replace `.length` and `!` operators with Toolsmith function calls

#### Batch 6: .length → length()
- **Files**: 19 files, 108 instances
- **Import**: `import length from "@sitebender/toolsmith/array/length/index.ts"`
- **Pattern**: `arr.length` → `length(arr)`
- **Comparisons**: `arr.length > 0` → `gt(0)(length(arr))`

#### Batch 7: ! → not()
- **Files**: 18 files, 23 instances
- **Import**: `import not from "@sitebender/toolsmith/logic/not/index.ts"`
- **Pattern**: `!condition` → `not(condition)`
- **Double negation**: `!!value` → `not(not(value))`

### Implementation Process

1. **Work in groups of 5-10 files** to avoid overwhelming changes
2. **Add Toolsmith imports** at the top of each file
3. **Replace operators** with function calls
4. **Test after each file**: `deno lint <file>` and `deno check <file>`
5. **Run full test suite** after each batch: `deno task test`
6. **Update fix_plan.md** checklists as you complete files

### Verification After Each Batch

```bash
cd libraries/arborist

# These should all succeed:
deno task test               # All 188 tests must pass
deno check src/              # No TypeScript errors
deno lint src/               # No lint warnings
```

If all pass, mark the batch complete in fix_plan.md.

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
- [ ] Read `fix_plan.md` sections 6 and 7
- [ ] Run `deno task test` to verify tests pass
- [ ] Start with Batch 6 (.length replacements)
- [ ] Work in groups of 5-10 files
- [ ] Add Toolsmith imports and replace operators
- [ ] Test after each file and batch
- [ ] Update fix_plan.md as you complete items
- [ ] Move to Batch 7 after Batch 6 is complete

## Getting Help

If you encounter issues:

1. **Tests fail**: You broke something. Revert and try again.
2. **Type errors persist**: Read the error carefully. Check import paths.
3. **Unsure about fix**: Ask the architect. Don't guess.
4. **Can't find operator instances**: Use `search_files` with correct regex.
5. **Toolsmith function missing**: Check that Toolsmith has the function you need.

## Success Criteria

You're done when:

- [ ] Batch 6 complete (.length operators replaced in 19 files)
- [ ] Batch 7 complete (! operators replaced in 18 files)
- [ ] `deno task test` passes (all 188 tests)
- [ ] `deno check src/` reports zero errors
- [ ] `deno lint src/` reports zero warnings
- [ ] All tests still passing
- [ ] fix_plan.md updated with your progress

After Batch 7, continue with Batch 8+ using same verification approach.

---

**Remember**: This library works. You're polishing it, not fixing fundamental issues. The tests prove it. Trust the tests.

**Key Document**: `src/fix_plan.md` - Read it, follow it, update it.

**Next Action**: Complete Batch 6 & 7 (operator substitutions).
