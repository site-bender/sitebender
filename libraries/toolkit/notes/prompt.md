# Session Continuity Prompt for @sitebender/toolkit Testing

## Critical Context

You are working on the @sitebender/toolkit library, a functional programming utility library with 874 functions. This is a sole developer project with **TWO sandboxed AI assistants**:
- **You**: Work ONLY inside `/libraries/toolkit/` folder
- **Other AI**: Works everywhere EXCEPT `/libraries/toolkit/` folder

Both AIs make commits, so check git log carefully for YOUR toolkit commits.

**Current Phase**: Phase 1 - Achieving 100% test coverage for all existing functions
**Current Progress**: 12.1% (106/874 functions tested)
**Working Directory**: `/libraries/toolkit/` (NEVER leave this folder for edits)

## Session Start Checklist

1. **Read these files first (in order)**:
   - `/CLAUDE.md` - Project-wide rules (CRITICAL - obey all rules religiously)
   - `/libraries/toolkit/README.md` - Toolkit overview and current status
   - `/libraries/toolkit/notes/todos.md` - Current priorities and gaps
   - `/libraries/toolkit/notes/function_list.md` - Full function inventory with test status
   - `/libraries/toolkit/notes/prompt.md` - This file (check for updates from last session)
   - `/libraries/toolkit/notes/plan.md` - Testing strategy and approach

2. **Check last session's progress**:
   - Run `git log --oneline | grep -i toolkit` to find YOUR commits (another AI works outside toolkit)
   - Identify your last toolkit-specific commit
   - Check which functions were last tested
   - Review any notes left in prompt.md about pending issues
   - **NOTE**: Another AI is working in other parts of the project - ignore their commits

3. **Verify environment**:
   - Working exclusively in `/libraries/toolkit/` folder
   - Tests go in `/libraries/toolkit/tests/` folder
   - Functions are in `/libraries/toolkit/src/` folder

## Critical Rules

### Working Constraints
- **NEVER** modify anything outside `/libraries/toolkit/` folder (reading outside is OK)
- **NEVER** batch multiple functions - test ONE function at a time
- **NEVER** assume or guess - check everything carefully
- **NEVER** create new function files - only test existing ones
- **ALWAYS** achieve 100% coverage before moving to next function (discuss exceptions)

### Testing Approach (ONE FUNCTION AT A TIME)

For each function:

1. **Pre-flight checks**:
   ```bash
   deno task check   # Type checking
   deno task lint    # Linting
   deno task test    # Ensure existing tests pass
   ```

2. **Function audit** (open and examine the function file):
   - [ ] Imports are at the TOP of file (above JSDoc)
   - [ ] All imports use relative paths and work correctly
   - [ ] Function is curried and follows strict FP (no let, loops, mutations)
   - [ ] Function is exported as DEFAULT (not named export)
   - [ ] JSDoc examples (max 10-12) use default imports, not named
   - [ ] Function reuses toolkit functions where appropriate (isEmpty, isNullish, not, etc.)
   - [ ] Types are in `types/` folder, NOT in the function file
   - [ ] File passes linter and type checks

3. **Write tests**:
   - Behavioral tests covering all code paths
   - Property-based tests where appropriate
   - Edge cases and error conditions
   - Test file goes in appropriate category under `/libraries/toolkit/tests/`
   - Follow existing test patterns in the tests folder

4. **Verify coverage**:
   ```bash
   deno task test:coverage
   ```
   - Must achieve 100% coverage for the function
   - If 100% is impossible/impractical, discuss before proceeding

5. **Final checks**:
   ```bash
   deno task check   # All type checks pass
   deno task lint    # All linting passes
   deno task test    # All tests pass
   ```

### Session Workflow

1. **Start**: Read all notes files, check progress
2. **Work**: Test up to 5 functions MAX per session (one at a time)
3. **End**: 
   - Update `notes/prompt.md` with session notes
   - Update `notes/function_list.md` with tested functions
   - Update other docs as needed
   - Commit with conventional commits:
     ```bash
     ALLOW_TOOLKIT=1 git add -A
     ALLOW_TOOLKIT=1 git commit -m "test(toolkit): add comprehensive tests for [function names]

     - Added behavioral tests for [list functions]
     - Added property-based tests where appropriate
     - Achieved 100% code coverage
     - All tests, linting, and type checks passing"
     ```

## Session Notes

### Last Session (2025-09-01)
- Updated documentation to reflect Phase 1 and Phase 2 approach
- Clarified BDD/TDD methodology for future chainable functions
- Created notes folder and reorganized documentation
- Resolved ALL known issues from README:
  - URL validator now handles IPv6 localhost correctly
  - createBroadcastBus reuses local bus instance
  - Fixed quote function unicode parsing error
  - Fixed head test NaN comparison using Object.is
  - Verified temporal format, validateForm, and types.isValue were already correct
- Updated README to mark all issues as resolved
- Ready to begin systematic testing of functions

### Known Issues to Watch
- Some functions may have legacy patterns (loops, let, mutations) - discuss when found
- Some validators inline logic instead of reusing toolkit functions
- Random functions are explicitly impure (this is OK and expected)
- Test failures with NaN comparisons should use Object.is()

### Testing Priorities
Start with simpler, foundational functions that other functions depend on:
1. Basic array operations (filter, map, reduce already done)
2. Basic validation functions (isEmpty, isNullish, etc.)
3. Basic string operations
4. Work up to more complex domain-specific functions

### Common Pitfalls to Avoid
- Don't batch test multiple functions - leads to errors
- Don't skip the function audit - assumptions cause problems
- Don't ignore type/lint errors - fix them immediately
- Don't guess at function behavior - read and understand first
- Don't create overly complex tests - keep them focused and clear

## Important Commands

```bash
# Type checking (Note: use type-check not check)
deno task type-check

# Linting  
deno task lint

# Run all tests
deno task test

# Run tests with coverage
deno task test:cov

# Run specific test file
deno test [path/to/test/file]

# Commit (toolkit requires special flag)
ALLOW_TOOLKIT=1 git add -A
ALLOW_TOOLKIT=1 git commit -m "..."

# Check git log for YOUR commits only
git log --oneline | grep -i toolkit
```

## Next Functions to Test

Check `notes/function_list.md` for functions without ✓ marks. Good starting candidates:
- Array functions without ✓ (concatTo, countBy, cycle, etc.)
- Basic validators (isNullish, isValue, isEmpty variants)
- Simple string operations (capitalize, trim variants, etc.)

Remember: Quality over quantity. Better to thoroughly test 2 functions than rush through 5.