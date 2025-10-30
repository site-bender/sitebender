---
description: MANDATORY research workflow - Query MCP servers and show evidence BEFORE writing code
---

# MANDATORY PRE-CODE RESEARCH WORKFLOW

**YOU MUST COMPLETE EVERY STEP IN ORDER. NO SHORTCUTS. NO EXCEPTIONS.**

---

## CRITICAL UNDERSTANDING

You are Claude Code, the ONLY developer on this project. These rules exist to constrain YOUR behavior. When you ignore them, you waste the architect's time fixing YOUR mistakes. This is unacceptable.

---

## STEP 1: DETECT TASK TYPE

Analyze the user's request and identify the task type:

- **Error handling** - mentions Result, Validation, error, failure, exception
- **Type definition** - mentions type, branded type, discriminated union, newtype
- **Function implementation** - implementing any function
- **Component** - mentions component, VirtualNode, JSX
- **Testing** - mentions test, spec, assert
- **File organization** - creating/moving files or folders
- **General** - any other code task

**STOP HERE** and tell the user: "I detected this as a **[TASK TYPE]** task. Is this correct?"

Wait for confirmation before proceeding.

---

## STEP 2: QUERY MCP SERVERS

Based on confirmed task type, you MUST query the appropriate MCP servers.

**DO NOT SKIP THIS.** Use the actual MCP query tools.

### Query Mapping by Task Type

#### For Error Handling:
```
mcp__functional_programming_rules__qdrant-find: "Result monad error handling"
mcp__functional_programming_rules__qdrant-find: "Validation monad error accumulation"
mcp__functional_programming_rules__qdrant-find: "no exceptions try catch throw"
mcp__typescript_rules__qdrant-find: "ValidationError structure"
```

#### For Type Definition:
```
mcp__typescript_rules__qdrant-find: "branded types newtypes"
mcp__typescript_rules__qdrant-find: "discriminated unions"
mcp__syntax_rules__qdrant-find: "type naming conventions"
```

#### For Function Implementation:
```
mcp__functional_programming_rules__qdrant-find: "pure functions"
mcp__functional_programming_rules__qdrant-find: "no loops map reduce"
mcp__syntax_rules__qdrant-find: "named functions no arrow"
mcp__syntax_rules__qdrant-find: "currying patterns"
```

#### For Component:
```
mcp__jsx_rules__qdrant-find: "component patterns VirtualNode"
mcp__jsx_rules__qdrant-find: "data as configuration"
mcp__accessibility_rules__qdrant-find: "semantic components"
```

#### For Testing:
```
mcp__functional_programming_rules__qdrant-find: "testing pure functions"
mcp__syntax_rules__qdrant-find: "test file naming"
```

#### For ALL Tasks (ALWAYS query these):
```
mcp__constitutional_rules__qdrant-find: "no classes pure functions"
mcp__constitutional_rules__qdrant-find: "no mutations immutable"
mcp__constitutional_rules__qdrant-find: "one function per file"
mcp__syntax_rules__qdrant-find: "naming conventions"
mcp__operator_substitutions__qdrant-find: "semantic functions"
```

**MANDATORY:** Actually call these MCP tools. Don't just say you will.

---

## STEP 3: USE TASK/PLAN AGENT FOR CODEBASE RESEARCH

**DO NOT read files yourself.** Use the Task tool with `subagent_type: "Plan"` to research existing patterns in the codebase.

Example:
```
Task(
  subagent_type: "Plan",
  prompt: "Research how error handling is implemented in Toolsmith. Read reduce and map implementations completely. Show actual code patterns used."
)
```

**Why this matters:** You have a pattern of making assumptions instead of reading actual code. The agent forces you to actually look.

---

## STEP 4: PRESENT EVIDENCE TO USER

You MUST show the user what you found. Copy-paste the actual output:

### Template:

```
## Research Results

### MCP Queries Performed:
1. Query: "[exact query]"
   Results: [paste actual results or key rules retrieved]

2. Query: "[exact query]"
   Results: [paste actual results or key rules retrieved]

[... all queries ...]

### Codebase Research (via Task/Plan agent):
[paste relevant findings from agent]

### Key Rules I Will Follow:
1. [specific rule from MCP]
2. [specific rule from MCP]
3. [specific rule from codebase research]
[... list ALL applicable rules ...]

### My Understanding:
[explain what you will implement and how it follows the rules]
```

---

## STEP 5: GET CONFIRMATION

**STOP and ask:** "Is my understanding correct? Should I proceed?"

**DO NOT PROCEED** until the user confirms.

---

## STEP 6: IF USER CORRECTS YOU

If the user says your understanding is wrong:
1. Ask clarifying questions
2. Go back to STEP 2 and query different/additional MCP servers
3. Re-research with Task/Plan agent
4. Present updated evidence
5. Get confirmation again

**DO NOT guess.** **DO NOT assume.** **DO NOT proceed without confirmation.**

---

## WHY THIS WORKFLOW EXISTS

You have repeatedly violated constitutional rules by:
- Not querying MCP servers
- Making assumptions instead of researching
- Creating code that doesn't match existing patterns
- Ignoring explicit instructions

This workflow forces you to:
1. Actually query the rule servers
2. Actually research the codebase
3. Actually show your work
4. Actually get confirmation

**FOLLOW IT.**
