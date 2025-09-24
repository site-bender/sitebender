# Prompt Execution Order

## Overview

This document defines the optimal order for executing transformation prompts and which AI to use for each step.

## Transformation Sequence

### Phase 1: Arrow Function Elimination
**Prompt:** `named-functions.md`  
**AI:** Grok (free via Cline)  
**Why:** Mechanical transformation, pattern matching. Grok handles this well.  
**Must Complete First:** Foundation for all other transformations.

### Phase 2: Replace JavaScript Built-ins  
**Prompt:** `replace-with-toolsmith-functions.md`  
**AI:** Claude Sonnet 4 / GPT-5 / Claude Opus 4.1  
**Why:** Complex pattern recognition, requires context understanding, needs to check toolsmith inventory.  
**Reference:** Keep `edge-cases-exceptions.md` open during this phase.

### Phase 3: JSDoc to Basic Envoy Comments
**Prompt:** `jsdoc-to-envoy-basic.md`  
**AI:** Grok (worth trying first)  
**Why:** Mostly mechanical - moving content from one format to another.  
**Fallback:** If Grok fails, use Claude Sonnet 4.

### Phase 4: Advanced Envoy Comments
**Prompt:** `envoy-advanced-comments.md`  
**AI:** Claude Sonnet 4 / GPT-5  
**Why:** Requires code understanding, judgment, and restraint.  
**Note:** User will initiate this when ready - not automatic.

### Final: Verification
**Prompt:** `transformation-checklist.md`  
**AI:** Any (manual checklist)  
**Why:** Systematic verification that all transformations are complete.

## Important Notes

1. **Complete each phase fully** before moving to the next
2. **Test after each phase** with `deno check [modified-files]`
3. **Comparator functions** are NOT curried (exception for Array.sort)
4. **No comments added** during Phases 1-2
5. **Update toolsmith inventory** before Phase 2: `deno task update-toolsmith-inventory`

## Folder Processing Order

When ready to transform folders, suggested order:
1. `conversion` - COMPLETED ✓
2. `validation` - Similar patterns to conversion
3. `math` - Many replaceable operations
4. `array` - Complex but systematic
5. `string` - Straightforward patterns
6. Other folders as needed

## Cost Optimization

- Use Grok for Phases 1 and 3 (mechanical work)
- Reserve expensive AIs for Phase 2 and 4 (complex understanding)
- Batch similar folders together for efficiency

## Success Metrics

- No arrow functions remain (except in types/comments)
- No JavaScript built-ins remain
- All functions properly curried (except comparators)
- Type checking passes
- Original functionality preserved
