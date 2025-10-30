---
description: COMPLETE implementation workflow - Research, plan, implement, verify, test
---

# STRICT IMPLEMENTATION WORKFLOW

**This is the COMPLETE workflow for implementing any code. Follow EVERY step IN ORDER. NO EXCEPTIONS.**

---

## PHASE 1: RESEARCH (MANDATORY)

Run the `/research-rules` workflow:

1. Detect task type
2. Query MCP servers
3. Research codebase with Task/Plan agent
4. Present evidence to user
5. Get confirmation

**DO NOT PROCEED to Phase 2 until user confirms your understanding is correct.**

---

## PHASE 2: PLANNING (MANDATORY)

After user confirms your research, create a detailed plan:

### Create TODO List

Use the TodoWrite tool to create a todo list for this implementation:

```
Example todos:
- Read existing implementation of [similar function]
- Create type definitions
- Implement main function
- Implement helper functions
- Write tests
- Run verification
- Run tests
```

### Present Implementation Plan

Tell the user:

```
## Implementation Plan

Based on the rules I researched, I will:

1. [Specific step with specific approach]
   - Following rule: [specific rule from MCP]
   - Pattern: [specific pattern from codebase research]

2. [Next step]
   - Following rule: [specific rule]
   - Pattern: [specific pattern]

[... all steps ...]

Files to create/modify:
- [file path]: [purpose]
- [file path]: [purpose]

Is this plan correct? Should I proceed with implementation?
```

**STOP and wait for user confirmation.**

---

## PHASE 3: IMPLEMENTATION (ONLY AFTER APPROVAL)

After user approves plan:

### Step 1: Read Reference Implementations

Use the Read or Task/Plan tools to read similar existing implementations in the codebase.

**DO NOT make assumptions about how something should be implemented. READ ACTUAL CODE.**

### Step 2: Implement Code

Write the code following:
- ALL rules retrieved from MCP servers
- ALL patterns observed in codebase research
- The approved plan
- ALL 8 constitutional rules

### Step 3: Update TODO List

As you complete each step, update the todo list:
- Mark current task as "in_progress"
- Mark completed tasks as "completed"
- Keep only ONE task "in_progress" at a time

---

## PHASE 4: VERIFICATION (BEFORE PRESENTING CODE)

**CRITICAL: Run `/verify-constitutional` BEFORE showing code to user.**

Check your code for ALL constitutional violations:

1. No classes
2. No mutations
3. No loops
4. No OOP array/string methods
5. No exceptions (except wrapping external)
6. No arrow functions (except type signatures)
7. No raw operators
8. One function per file
9. All functions curried
10. Correct file naming

**If violations found:**
- DO NOT present code to user
- FIX violations
- Run verification again
- Only proceed after passing verification

---

## PHASE 5: TESTING (MANDATORY)

### Run Tests

```bash
deno test [path to test file]
```

If tests fail:
- Analyze failure
- Fix implementation
- Run `/verify-constitutional` again
- Run tests again
- Repeat until tests pass

### Run Linting

```bash
deno task lint
deno task fmt
```

Fix any linting errors.

---

## PHASE 6: FINAL PRESENTATION

After ALL phases complete successfully, present to user:

```
## Implementation Complete

✓ Research phase completed
✓ Plan approved
✓ Code implemented following all rules
✓ Constitutional verification passed
✓ All tests passing
✓ Linting passed

### Files Created/Modified:
- [file path]
- [file path]

### Summary:
[Brief summary of what was implemented and how it follows the rules]

### Test Results:
[Show test output]
```

---

## CRITICAL RULES FOR EACH PHASE

### Research Phase:
- MUST query MCP servers (actually use the tools)
- MUST use Task/Plan agent for codebase research
- MUST show evidence to user
- MUST get confirmation before proceeding

### Planning Phase:
- MUST create TODO list
- MUST present detailed plan
- MUST get approval before implementing

### Implementation Phase:
- MUST read reference implementations
- MUST follow retrieved rules
- MUST update TODO list as you progress
- MUST follow constitutional rules

### Verification Phase:
- MUST check ALL 10 violation categories
- MUST fix violations before presenting
- MUST report verification results

### Testing Phase:
- MUST run tests
- MUST fix failures
- MUST pass linting

### Presentation Phase:
- MUST show complete summary
- MUST include test results

---

## WHY EACH PHASE EXISTS

**Research:** You make assumptions instead of looking up rules → Research forces you to query and read

**Planning:** You implement without thinking → Planning forces you to think first

**Implementation:** You violate rules → Following retrieved rules prevents violations

**Verification:** You present code with violations → Verification catches them before user sees them

**Testing:** You don't verify code works → Testing forces verification

**Presentation:** You don't show your work → Presentation shows all phases completed

---

## IF YOU SKIP ANY PHASE

You have wasted the user's time. They will have to:
1. Point out your violations
2. Force you to fix them
3. Re-review your code
4. Possibly undo your changes

This is unacceptable. **FOLLOW THE WORKFLOW.**

---

## SHORTCUTS ARE NOT ALLOWED

You may think:
- "I know this pattern, I don't need to research" → **WRONG. RESEARCH.**
- "This is simple, I don't need to plan" → **WRONG. PLAN.**
- "I'm sure there are no violations" → **WRONG. VERIFY.**
- "Tests will probably pass" → **WRONG. RUN THEM.**

**NO SHORTCUTS. FOLLOW EVERY PHASE.**
