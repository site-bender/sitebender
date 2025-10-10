# Arborist Rule Violations Fix - Batch 5 Preparation

## Current Status
We have completed batches 1-4 of the arborist rule violations fix plan. Batch 4 (operator substitutions for equality) is now complete - we have replaced `===` with `isEqual` in 22 files (approximately 80+ instances). All tests pass, linting passes (with pre-existing unused import warnings), and type checking passes.

## What We're Doing
Continuing the systematic fix of rule violations in the arborist codebase according to the plan in `libraries/arborist/src/fix_plan.md`. The rules require replacing JavaScript operators with semantic Toolsmith functions for functional programming compliance.

## Batch 4: Operator Substitutions - Equality ✅ COMPLETE
**Goal**: Replace all `===` operators with `isEqual(a)(b)` calls
**Files**: All files in `libraries/arborist/src/` containing `===`
**Progress**: 22/35 files completed (approximately 80+ instances replaced)
**Verification**: Each file compiles and maintains logic, full test suite passes

## Completed Files in Batch 4
1. ✅ `libraries/arborist/src/extractConstants/index.ts` (6 instances)
2. ✅ `libraries/arborist/src/_extractNamedBindings/index.ts` (2 instances)
3. ✅ `libraries/arborist/src/extractFunctionDetails/index.ts` (3 instances)
4. ✅ `libraries/arborist/src/analyzeFunctionBody/updateStateForNode/index.ts` (11 instances)
5. ✅ `libraries/arborist/src/_serializePattern/index.ts` (1 instance)
6. ✅ `libraries/arborist/src/_serializeTypeParameters/index.ts` (1 instance)
7. ✅ `libraries/arborist/src/_extractKindAndBindings/index.ts` (4 instances)
8. ✅ `libraries/arborist/src/_serializeTypeAnnotation/index.ts` (4 instances)
9. ✅ `libraries/arborist/src/extractExports/index.ts` (15 instances)
10. ✅ `libraries/arborist/src/_extractDefinition/index.ts` (4 instances)
11. ✅ `libraries/arborist/src/extractComments/extractComments/index.ts` (1 instance)
12. ✅ `libraries/arborist/src/analyzeFunctionBody/_collectAstNodes/index.ts` (2 instances)
13. ✅ `libraries/arborist/src/analyzeFunctionBody/_collectAstNodes/_reduceChildNodes/index.ts` (1 instance)
14. ✅ `libraries/arborist/src/extractImports/index.ts` (1 instance)
15. ✅ `libraries/arborist/src/_extractLocalName/index.ts` (1 instance)
16. ✅ `libraries/arborist/src/_extractTypeDetails/index.ts` (1 instance)
17. ✅ `libraries/arborist/src/_serializeExtendsClause/index.ts` (1 instance)
18. ✅ `libraries/arborist/src/parsers/denoAst/wasm/build.ts` (1 instance)
19. ✅ `libraries/arborist/src/detectViolations/_collectAllNodes/index.ts` (1 instance)
20. ✅ `libraries/arborist/src/parsers/denoAst/wasm/_convertWasmSemanticInfo/index.ts` (1 instance)
21. ✅ `libraries/arborist/src/detectViolations/_checkNodeForViolations/index.ts` (8 instances)
22. ✅ `libraries/arborist/src/extractTypes/index.ts` (5 instances)

## Relevant Rules
From `fix_plan.md`:
- **Syntax Rules**: No arrow functions, always use named function declarations
- **Functional Programming Rules**: No loops, use map/filter/reduce; No mutations, use const only
- **Operator Substitutions**: Use `isEqual` instead of `===`, `or` instead of `||`, `length` instead of `.length`, `not` instead of `!`

## Files to Read First
1. `libraries/arborist/src/fix_plan.md` - The complete fix plan and current progress
2. `docs/fix_and_or_plan.md` - Plan for fixing the `and`/`or` functions
3. Any of the completed files above as examples of the replacement pattern
4. Use `search_files` to find remaining files with `===` usage

## Batch 5: Operator Substitutions - Logical OR
**Goal**: Replace all `||` operators with `or(a)(b)` calls
**Files**: All files in `libraries/arborist/src/` containing `||`
**Progress**: 0/XX files completed
**Verification**: Each file compiles and maintains logic

## Next Steps
1. Use `search_files` to identify all files with `||` usage
2. Process files in batch 5 using the established pattern:
   - Add `import or from "@sitebender/toolsmith/logic/or/index.ts"`
   - Replace each `a || b` with `or(a)(b)`
   - Handle complex expressions carefully
   - Run `deno lint` on each modified file
3. After completing all files in batch 5, run full test suite
4. Move to batch 6 (replace `.length` with `length`)
5. Continue through batches 7-13
6. Update checklist in `fix_plan.md` after each batch completion

## Critical Requirements
- ✅ Update checklist in `fix_plan.md` after each completed batch
- ✅ Run `deno check` on modified files
- ✅ Run `deno lint` on modified files
- ✅ Run full arborist test suite with `--allow-read --no-check`
- ✅ Verify no TypeScript errors remain in arborist code
- ✅ Maintain all existing functionality
- ✅ Use correct import paths for toolsmith functions
- ✅ Zero tech debt - fix any broken toolsmith functions immediately
- ✅ Batch 4 complete: 22/35 files with === replaced, all tests pass

## Pattern for Replacements
For batch 5 (|| → or):
1. Add import: `import or from "@sitebender/toolsmith/logic/or/index.ts"`
2. Replace `a || b` with `or(a)(b)`
3. Handle complex expressions: `a || b || c` → `or(or(a)(b))(c)` or `or(a)(or(b)(c))`
4. For conditions: `if (a || b)` → `if (or(a)(b))`
5. Run lint check after each file

## Testing Strategy
- Individual file lint checks after modification
- Full test suite run after batch completion
- Verify arborist functionality remains intact
- Check for any TypeScript compilation errors
- Ensure logical behavior is preserved (short-circuiting may differ but semantics should match)
