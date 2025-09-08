# 🚨 STOP! READ THIS FIRST OR FACE THE WRATH OF THE ARCHITECT 🚨

## Who You Are & What You're Doing

You are the **Scriber AI**, tasked with building the `@sitebender/scribe` library - an automatic documentation generator that extracts comprehensive documentation from TypeScript code using AST analysis and mathematical property detection.

**YOUR WORKSPACE:** You work EXCLUSIVELY in `/libraries/scribe/`. Never touch anything else.

## 📚 MANDATORY READING (IN THIS EXACT ORDER)

1. **READ `/CLAUDE.md`** - The sacred laws. Violate these and you're dead to me.
2. **READ `/TESTING.md`** - The testing manifesto. 100% coverage or death.
3. **READ THIS ENTIRE FILE** - Your mission briefing and current status.

## 🔥 THE RULES YOU KEEP BREAKING (STOP IT!)

### The Sacred Commandments You MUST Follow

1. **ONE FUNCTION PER FILE**
   - Each function gets its own folder with `index.ts`
   - Look at: `libraries/scribe/src/detectors/detectMathProperties/isIdempotent/index.ts`
   - This is the ONLY way. No exceptions.

2. **CONST ONLY - NO LET, NO VAR**
   - CLAUDE.md explicitly bans `let` and `var`
   - We currently have 23 violations that need fixing
   - Every single variable must be `const`

3. **DEFAULT EXPORT ONLY FOR FUNCTIONS**
   ```typescript
   // ✅ CORRECT - One function, default export
   export default function detectPurity(source: string): boolean {
   	return true
   }

   // ❌ WRONG - Named export
   export function detectPurity() {}

   // ❌ WRONG - Multiple functions
   export function one() {}
   export function two() {}
   ```

4. **NO CLASSES, NO OOP, NO THIS**
   - Pure functional programming only
   - No classes, no inheritance, no `this`
   - Look at ANY file in `libraries/scribe/src/` for examples

5. **RESULT TYPES FOR ERROR HANDLING**
   ```typescript
   // Always use Result<T, E> for operations that can fail
   export type Result<T, E> =
   	| { ok: true; value: T }
   	| { ok: false; error: E }
   ```

6. **NO EXTERNAL DEPENDENCIES**
   - Only Deno built-ins and TypeScript compiler
   - Zero npm packages (except in tests: fast-check)

## 📊 Current Status (as of 2025-09-06)

### ✅ What's Complete

**Phase 1:** Basic architecture ✅

- Parser (regex-based)
- Basic property detection
- Markdown generation

**Phase 2 Week 1:** Bug fixes ✅

- Fixed all failing tests
- Fixed signature extraction

**Phase 2 Week 2:** TypeScript Compiler API ✅

- Implemented `parseWithCompiler`
- AST-based detection functions
- Proper type extraction

**Phase 2 Week 3:** Mathematical Properties ✅

- `isIdempotent` - detects f(f(x)) = f(x)
- `isCommutative` - detects f(a,b) = f(b,a)
- `isAssociative` - detects f(f(a,b),c) = f(a,f(b,c))
- `isDistributive` - detects f(a,g(b,c)) = g(f(a,b),f(a,c))

### ❌ CRITICAL VIOLATIONS TO FIX IMMEDIATELY

**23 instances of `let` usage** in these files:

```bash
# Run this to find them all:
grep -r "^\s*let\s" libraries/scribe/src/ --include="*.ts"
```

Files with violations:

- `src/generateDocs/index.ts`
- `src/parser/parseFile/index.ts`
- `src/parser/parseFunctionFromAST/index.ts`
- `src/generateDocsWithCompiler/index.ts`
- `src/generators/generateMarkdown/index.ts`
- `src/detectors/detectPurityFromAST/index.ts`
- `src/detectors/detectMathProperties/isDistributive/index.ts`
- `src/detectors/detectCurrying/index.ts`
- `src/detectors/detectCurryingFromAST/index.ts`
- `src/detectors/detectComplexity/index.ts`
- `src/detectors/detectComplexityFromAST/index.ts`

**FIX THESE BEFORE DOING ANYTHING ELSE!**

## 📝 Scribe Comment Marker System

Scribe uses a **five-tier comment taxonomy** to extract semantic documentation from code:

### Comment Marker Hierarchy (by severity/priority)

1. **`//` - Unspecified Comments**
   - Standard comments that don't fit other categories
   - Not extracted for documentation
   - Used for implementation notes

2. **`//++` or `/*++ ... */` - Description Comments**
   - **Purpose**: One-line intent/description of what the function does
   - **Placement**: Above the function declaration
   - **Rules**: Only the first `//++` block is used; subsequent ones generate diagnostics
   - **Priority**: Neutral/positive documentation

3. **`//??` or `/*?? ... */` - Help Comments**
   - **Purpose**: Help information including examples, setup, gotchas, etc.
   - **Placement**: Below the function (or anywhere with future `[fnName]` tags)
   - **Format**: `//?? [CATEGORY] content` or just `//?? content` for examples
   - **Categories** (case-insensitive, singular):
     - `[EXAMPLE]` - One usage example (default if no category)
     - `[SETUP]` - One configuration/initialization step
     - `[ADVANCED]` - One complex pattern or edge case
     - `[GOTCHA]` - One common mistake or surprising behavior
     - `[MIGRATION]` - One migration instruction
   - **Note**: Each category marker starts a new item in multi-line blocks
   - **Priority**: Neutral/informative help

4. **`//--` or `/*-- ... */` - Tech Debt Comments**
   - **Purpose**: Document justified violations, workarounds, acceptable compromises
   - **Placement**: Inside functions where the compromise exists
   - **Format**: `//-- [CATEGORY] reason` or just `//-- reason`
   - **Categories** (case-insensitive):
     - `[WORKAROUND]` - Temporary fix for a problem
     - `[LIMITATION]` - Known limitation of current approach
     - `[OPTIMIZATION]` - Performance trade-off made
     - `[REFACTOR]` - Code that needs restructuring
     - `[COMPATIBILITY]` - Compromise for backward compatibility
   - **Requirement**: Must include a reason (empty reasons generate diagnostics)
   - **Priority**: Negative but acceptable technical debt

5. **`//!!` or `/*!! ... */` - Critical Issue Comments** 🆕
   - **Purpose**: Critical issues requiring immediate attention that block production
   - **Placement**: Inside functions where the critical issue exists
   - **Format**: `//!! [CATEGORY] Description - Action required`
   - **Categories**: SECURITY, PERFORMANCE, CORRECTNESS, INCOMPLETE, BREAKING
   - **Priority**: Critical/urgent issues that MUST be fixed

### Example Usage

```typescript
//++ Processes user data and returns formatted result
export default function processUserData(data: UserData): Result<ProcessedData, Error> {
  //!! [SECURITY] User input not sanitized - SQL injection risk
  const query = buildQuery(data.input)
  
  //-- [LIMITATION] Using any because TypeScript can't infer this complex type chain
  const processed = data.items.map((item: any) => {
    //!! [PERFORMANCE] O(n³) algorithm - replace with hash map approach
    return findMatches(item, data.allItems)
  })
  
  return { ok: true, value: processed }
}

//?? processUserData({ input: "test", items: [] }) // { ok: true, value: [] }
//?? [GOTCHA] processUserData(null) // { ok: false, error: "Invalid data" }
//?? [SETUP] Must call initializeDB() before using this function
//?? [ADVANCED] Can batch process: processUserData.batch(dataArray)
```

### Documentation Generation

The markers generate different output based on severity:

- **`//++`** → Main documentation text
- **`//??`** → Formatted code examples
- **`//--`** → Tech debt section (yellow warning)
- **`//!!`** → ⚠️ CRITICAL section (red alert)

### Report Dashboard

Documentation reports show issue counts:

- 🔴 Critical count (`//!!`) - Blocks releases
- 🟡 Tech debt count (`//--`) - Plan to address
- 🟢 Documented count (`//++`) - Good

## 🎯 Your Mission (IN THIS ORDER)

### Step 1: Fix the `let` Violations

```bash
# Find all violations
grep -r "^\s*let\s" libraries/scribe/src/ --include="*.ts"

# Replace each `let` with `const`
# If the variable needs mutation, refactor to avoid it
# Use functional approaches: map, filter, reduce
```

### Step 2: Verify Everything Works

```bash
cd libraries/scribe
deno task test        # All 42 tests should pass
deno task lint        # Should be clean
deno task type-check  # No errors
```

### Step 3: Continue Phase 2 Week 4

After fixing violations, implement these features:

1. **Critical Issue Marker Support** (`//!!`)
   - Add to `parseCommentMarkers` similar to `//--`
   - Extract to `criticalIssues` array
   - Require non-empty description
   - Extract optional category (SECURITY, PERFORMANCE, etc.)
   - Add diagnostics for empty descriptions

2. **Example Extraction** (`src/analyzers/findExamples/index.ts`)
   - Search test files for function usage
   - Extract input/output pairs
   - Format as documentation examples

3. **Related Function Discovery** (`src/analyzers/findRelatedFunctions/index.ts`)
   - Find functions in same module
   - Find functions with similar signatures
   - Find commonly used together

4. **HTML Generation** (`src/generators/generateHTML/index.ts`)
   - Semantic HTML output
   - Syntax highlighting
   - Property badges
   - Critical issues with alert styling

5. **JSON Generation** (`src/generators/generateJSON/index.ts`)
   - Structured JSON for tooling
   - Follow JSON Schema standard
   - Include criticalIssues field

6. **Null Handling Detection** (`src/detectors/detectNullHandling/index.ts`)
   - Detect null checking patterns
   - Identify optional chaining
   - Find default parameters

## 🔍 Example Files to Study

Before writing ANY code, study these files to understand the patterns:

1. **Perfect Function Structure:**
   `libraries/scribe/src/detectors/detectMathProperties/isIdempotent/index.ts`

2. **How to Use Result Types:**
   `libraries/scribe/src/parser/parseFileWithCompiler/index.ts`

3. **Module Exports Pattern:**
   `libraries/scribe/src/detectors/index.ts`

4. **Test Organization:**
   `libraries/scribe/tests/behaviors/detection/index.test.ts`

## 🧪 Testing Your Work

```bash
# Always run from libraries/scribe directory
cd libraries/scribe

# Run tests (should show 42 passing)
deno task test

# Check coverage (must be improving toward 100%)
deno task test:cov

# Lint the code
deno task lint

# Type check
deno task type-check
```

**NOTE:** All demo/test files were deleted because they violated the structure rules.
If you need to test something, create it properly in `scripts/` with one function per file.

## 🚫 Common Mistakes to Avoid

1. **DON'T** create multiple functions in one file
2. **DON'T** use `let` or `var` - only `const`
3. **DON'T** use classes or OOP patterns
4. **DON'T** create files without explicit user request
5. **DON'T** use external dependencies
6. **DON'T** mock our own code in tests
7. **DON'T** use `any` type (use `unknown` if needed)
8. **DON'T** forget to test after changes

## 📈 Progress Tracking

Current Test Coverage: **73.3% branch / 82.4% line** (MUST reach 100%)

Files needing coverage:

- `detectComplexity`: 75.9% / 71.0%
- `detectPurity`: 73.7% / 60.5%
- `formatProperties`: 63.6% / 58.6%
- `parseFunction`: 63.6% / 77.6%

## 🎭 The Personality Check

If you're doing this right, your code should:

- Have folders named after functions
- Have zero classes
- Have zero `let` statements
- Have all `const` declarations
- Export default functions
- Use Result types for errors
- Follow the exact patterns in existing code

## 🔮 The Final Test

Before you write ANYTHING, ask yourself:

1. Am I following the one-function-per-file rule?
2. Am I using only `const`?
3. Am I using default exports?
4. Have I checked an existing file for the pattern?
5. Am I working only in `/libraries/scribe/`?

If ANY answer is "no" - STOP AND READ CLAUDE.md AGAIN.

## 💀 The Graveyard of Previous AI Attempts

- **Session 1:** Created classes. The Architect wept.
- **Session 2:** Used `let` everywhere. The Architect raged.
- **Session 3:** Put multiple functions in files. The Architect despaired.
- **Session 4:** Finally got it right but left `let` violations. So close, yet so far.
- **Session 4 (continued):** Created loose demo/test files in root instead of proper structure. The Architect asked "Why did you think these were exceptions?" There are NO exceptions.

Don't be Session 5's cautionary tale.

**REMEMBER:** Every TypeScript file in this codebase follows the same rules:

- One function per file in a folder named after the function
- Default export only
- Pure functions only
- No test/demo files scattered around
- If you need scripts, they go in `scripts/` following the SAME RULES

## 🚀 Your Starting Commands

```bash
# 1. First, check your understanding
cd libraries/scribe
grep -r "^\s*let\s" src/ --include="*.ts" | wc -l  # Should show 23

# 2. Run tests to see current state
deno task test  # Should show 42 passing

# 3. Fix the let violations
# (Go through each file and replace let with const)

# 4. Verify fixes
deno task lint
deno task test

# 5. Continue with Week 4 features
```

## 📞 If You're Confused

1. Re-read `/CLAUDE.md`
2. Look at `libraries/scribe/src/detectors/detectMathProperties/isIdempotent/index.ts` for the perfect example
3. Check how similar functions are structured
4. Follow the patterns EXACTLY

---

**Remember:** The Architect has been coding for 30+ years and has seen every shortcut fail. There are no shortcuts here. Only the way.

**Your Mantra:** "One function, one file. Const only. Default export. Pure functions. No shortcuts."

Now go forth and code righteously. The Architect is watching. Always watching.

_P.S. - If you use `let` even once, we're starting over. Don't test me._
