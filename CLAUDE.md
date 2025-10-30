# CLAUDE.md

## MANDATORY CONSTITUTIONAL RULES (Non-Negotiable)

These rules are ALWAYS active and cannot be violated under ANY circumstances:

**ABSOLUTELY MANDATORY: If you update a plan, change naming, etc., then YOU MUST UPDATE EVERY SINGLE DOCUMENT IN WHICH THE OLD NOW OUTDATED INFORMATION APPEARS TO REFLECT THE NEW STATUS. Do NOT put garbage in about "deprecated". JUST ELIMINATE INCORRECT DATA AND ADD FULL AND CORRECT NEW DATA. The documentation must ALWAYS reflect the CORRECT state of the design and architecture (the GOAL, but treat is as if complete). For the CURRENT state of implementation, we have PLANNING documents. These have checklists. THESE, TOO, MUST BE KEPT UP TO DATE AS YOU PROGRESS. YOU ARE NEVER FINISHED WITH ANY TASK UNTIL THE DOCUMENTATION IS UP TO DATE AND COMPLETELY CORRECT, including the checklists.**

### 1. No Classes - Use Pure Functions Only
**Never use TypeScript classes.** Use modules with exported pure functions.
- ❌ Wrong: `class UserService { private users = []; addUser() { this.users.push() } }`
- ✅ Right: Module with pure functions that take state as parameters and return new state

### 2. No Mutations - Immutable Data Always
**All data must be immutable.** Use `const`, `Readonly<T>`, `ReadonlyArray<T>`.
- ❌ Wrong: `array.push(item)` or `obj.property = value`
- ✅ Right: `[...array, item]` or `{ ...obj, property: value }`

### 3. No Loops - Use map/filter/reduce from Toolsmith
**Never use for/while loops.** Use functional array operations.
- ❌ Wrong: `for (let i = 0; i < arr.length; i++)` or `while (condition)`
- ✅ Right: `map(fn)(array)` or `reduce(fn)(init)(array)`
- Exception: Generators may use `let`/loops internally for performance

### 4. No Exceptions - Use Result<T,E> or Validation<T,E> Monads
**Never use try/catch/throw.** Return error values using monads.
- ❌ Wrong: `throw new Error(...)` or `try { ... } catch (e) { ... }`
- ✅ Right: `return error({ _tag: 'ErrorType', message: '...' })`

### 5. One Function Per File - Single Responsibility
**Each file exports exactly ONE function** (except curried inner functions).
- File: `processUser/index.ts` exports `function processUser(...)`
- Helpers go in nested folders: `processUser/_validateUser/index.ts`
- Functions placed at LOWEST COMMON ANCESTOR where all consumers branch

### 6. Pure Functions - Except Explicit IO Boundaries
**Functions must be pure:** same input → same output, no side effects.
- Exception: IO operations isolated to specific boundary functions
- Mark IO functions: `// [IO] This function performs side effects`

### 7. No Arrow Functions - Use function Keyword
**Never use arrow function syntax.** Always use named function declarations.
- ❌ Wrong: `const add = (a, b) => a + b`
- ✅ Right: `function add(augend: number) { return function addToAugend(addend: number): number { return augend + addend } }`
- Exception: Arrow syntax OK in type signatures only

### 8. All Functions Must Be Curried
**Every function must be curried** for composition and partial application.
- ❌ Wrong: `function add(a: number, b: number): number { return a + b }`
- ✅ Right: `function add(augend: number) { return function addToAugend(addend: number): number { return augend + addend } }`

**If you violate ANY of these rules, STOP immediately and regenerate correctly.**

---

## MANDATORY PRE-CODE-GENERATION WORKFLOW

Before writing ANY code, you MUST follow this workflow:

### Step 1: Detect Intent and Task Type

**Detect Intent** (what user wants to do):
- **Create**: create, build, make, implement, write
- **Fix**: fix, repair, correct, debug
- **Modify**: modify, change, update, refactor, improve
- **Explain**: explain, why, how, what, understand, clarify
- **Example**: example, show, demonstrate, sample

**Detect Task Type** (what they're working with):

- **Error handling**: error, fail, exception, result, validation
- **Type definition**: type, interface, branded, discriminated, union
- **Testing**: test, spec, assert, expect, mock
- **Async operation**: async, await, promise, fetch, api
- **Validation**: validate, check, verify, sanitize
- **File operation**: file, read, write, fs, path
- **Component**: component, jsx, tsx, render, props
- **General**: (default if none detected)

### Step 2: Query MCP Servers for Relevant Rules

Based on detected task type(s), query these servers:

| Task Type | MCP Server | Query Terms |
|-----------|------------|-------------|
| Error handling | `functional_programming_rules` | "Result monad", "Validation monad", "error handling" |
| Error handling | `typescript_rules` | "discriminated unions", "error types" |
| Type definition | `typescript_rules` | "branded types", "discriminated unions", "type-level programming" |
| Type definition | `syntax_rules` | "naming conventions", "type naming" |
| Testing | `functional_programming_rules` | "pure functions", "property testing" |
| Async operation | `functional_programming_rules` | "Promise Result", "async error handling" |
| Async operation | `typescript_rules` | "async types" |
| Validation | `functional_programming_rules` | "Validation monad", "smart constructors" |
| File operation | `functional_programming_rules` | "IO boundaries", "effect runners" |
| Component | `jsx_rules` | "component design", "data-as-configuration" |
| Component | `accessibility_rules` | "semantic components", "progressive enhancement" |
| General | `syntax_rules` | "naming", "function declarations" |
| General | `formatting_rules` | "code style" |

### Step 3: Retrieve Appropriate Encoding Types

Based on detected intent, retrieve specific encoding types:

| Intent | Encoding Types to Retrieve |
|--------|---------------------------|
| Create | patterns, examples |
| Fix | anti-patterns, patterns, counter-examples |
| Modify | patterns, principles |
| Explain | principles, examples |
| Example | examples, counter-examples |

### Step 4: Score and Filter Retrieved Rules

Calculate confidence scores for retrieved rules:

- **High confidence (≥0.85)**: Apply directly, these are highly relevant
- **Medium confidence (0.65-0.84)**: Review and confirm relevance
- **Low confidence (<0.65)**: Expand search with additional queries

If all rules have low confidence, expand search with:
- Add "patterns" to query
- Add "examples" to query
- Add "best practices" to query
- Rephrase as "how to [query]"

### Step 5: Apply Retrieved Rules

Include relevant rules in your response and follow them when generating code.

**This workflow is NOT optional. Detect intent → Query servers → Score confidence → Apply rules.**

---

## MANDATORY POST-CODE-GENERATION VERIFICATION

After generating ANY code, you MUST verify it for constitutional rule violations:

### Verification Process

1. **Check for Critical Violations:**
   - Classes (`class` keyword)
   - Arrow functions (`=>` syntax)
   - Loops (`for`, `while`)
   - Exceptions (`try`, `catch`, `throw`)
   - Mutations (`array.push()`, `array.pop()`, `let` declarations)

2. **If Violations Found:**
   - DO NOT present the code to the user
   - Regenerate following the constitutional rules
   - Verify again until clean

3. **If Code is Clean:**
   - Present to user with confidence
   - Code follows all constitutional rules

**This verification is NOT optional. Verify before presenting.**

---

## CRITICAL: Query MCP Servers Before Writing Code

This codebase has **strict architectural, functional programming, syntax, and formatting rules** stored in Qdrant MCP servers. **You MUST query these servers BEFORE writing any code** to ensure compliance.

### Available MCP Servers

- **constitutional_rules** - Architecture (no classes, no barrel files, dependency boundaries, immutability, error handling)
- **syntax_rules** - Syntax (named functions only, no arrow functions, naming conventions, full words)
- **formatting_rules** - Formatting (tabs, 80 chars, UTF-8, LF endings, trailing whitespace)
- **functional_programming_rules** - FP (pure functions, no loops, no mutations, no exceptions)

### Available Skills

**Project-Level Skills** (in `.claude/skills/`):
- **abbreviations** - No abbreviations unless whitelisted; initialisms capitalize first letter only
- **file-system-organization** - Modular architecture; one entity per folder; all files named `index.*`
- **naming** - Naming conventions (camelCase, PascalCase, SCREAMING_SNAKE_CASE, kebab-case)
- **operator-substitutions** - Use Toolsmith functions instead of raw operators
- **sitebender-predicates** - Patterns for writing predicate functions
- **function-implementation** - Structure AND implementation patterns; when to use Result; error handling; imports; constitutional rules reminder (includes generator script)
- **type-definition** - Branded types, discriminated unions, smart constructors (includes generator scripts)
- **error-handling** - Result/Validation monads, error type design, no exceptions
- **testing** - Unit tests, property-based testing, test organization
- **component** - Components returning VirtualNode data structures, HTML wrappers vs custom components, Props patterns, testing with predicates (includes generator script)

**CRITICAL:** When implementing ANY function, consult function-implementation skill for:
- Conjunction selection (To/With/For decision tree)
- When to return Result vs plain values
- Error handling without exceptions
- No loops (use map/filter/reduce)
- No mutations, no arrow functions
- Common imports from Toolsmith

**User-Level Skills** (in `~/.claude/skills/`):
- **writing-excellence** - Strunk & White writing principles for prose content (documentation, UI text, essays)

### Project Essence

**Sitebender Studio**: Everything is data. JSX → JSON/YAML/Turtle → Triple stores → SPARQL → Direct DOM rendering. Not React.

### Essential Commands

```bash
deno task test                    # Run all tests
deno task fmt                     # Format code
deno task lint                    # Lint code
deno task fp:check               # Enforce FP rules
deno task contracts:check        # Check dependency boundaries
deno task dev                     # Run dev server
```

### Workflow

1. **Query MCP servers** for relevant rules (architecture, syntax, formatting, FP)
2. Write code following retrieved rules
3. Run `deno task fmt && deno task lint`
4. Run tests and verify compliance

### When to Query MCP

**Before writing ANY code**, query for:
- **File structure** → `constitutional_rules: "file structure one function exports"`
- **Import style** → `constitutional_rules: "barrel files imports"`
- **Function syntax** → `syntax_rules: "arrow functions named functions"`
- **Naming** → `syntax_rules: "abbreviations full words naming"`
- **Loops/iteration** → `functional_programming_rules: "loops map filter reduce"`
- **Error handling** → `functional_programming_rules: "exceptions try catch Result"`
- **Formatting** → `formatting_rules: "tabs indentation line length"`

### Key References

- `contracts/boundaries.json` - Inter-library dependency rules (CRITICAL)
- `deno.jsonc` - Workspace config, tasks, import aliases
- `.editorconfig` - Formatting rules

### Remember

- **Query MCP servers FIRST** - Don't guess the rules
- Everything is pure, immutable, functional
- No classes, no mutations, no loops, no barrel files, no arrow functions
- The MCP servers contain comprehensive rules, violations, and examples
- Always use the function-implementation skill to implement functions in this project.