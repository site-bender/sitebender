# Complete Rules Reference

This document contains ALL rules from ALL MCP Qdrant collections for the Sitebender/Quartermaster project. These rules are MANDATORY and must be followed when writing code.

**Last Updated:** 2025-10-15

---

## Table of Contents

1. [Constitutional Rules](#constitutional-rules)
2. [Formatting Rules](#formatting-rules)
3. [Functional Programming Rules](#functional-programming-rules)
4. [Syntax Rules](#syntax-rules)
5. [TypeScript Rules](#typescript-rules)
6. [JSX Rules](#jsx-rules)
7. [Toolsmith Rules](#toolsmith-rules)
8. [Accessibility Rules](#accessibility-rules)
9. [Content Rules](#content-rules)
10. [Operator Substitutions](#operator-substitutions)

---

## Constitutional Rules

These are the foundational architectural rules that govern the entire codebase structure.

### ANTI_OOP_001 - No Classes or OOP Patterns

**Priority:** 10 | **Category:** constitutional

**Rule:** ANTI-PATTERN: Using classes and OOP patterns

**Reason:** OOP is the opposite of functional programming. Classes create stateful nightmares

**Consequences:** Classes = mutable state = bugs = unmaintainable code

**Philosophy:** Pure functions only. Composition over inheritance

**Examples:**
- ❌ Anti-pattern: `class UserService { private users = []; addUser() { this.users.push() } }`
- ✅ Correct: Module with pure functions that take state as parameters and return new state

**Applies to:** .ts, .tsx, .js, .jsx

---

### ANTI_ASSUMPTION_001 - No Assumptions

**Priority:** 10 | **Category:** constitutional | **Severity:** 10

**Rule:** ANTI-PATTERN: Making assumptions instead of asking for clarification

**Reason:** Assumptions create messes that take weeks to fix

**Consequences:** Wrong assumptions = broken code = wasted time = lost trust

**Philosophy:** Better to ask 10 questions than make 1 wrong assumption

**Examples:**
- ❌ Anti-pattern: Assuming user wants X and implementing without asking
- ✅ Correct: Ask for clarification when requirements are unclear

**Alternative:** ASK when uncertain. Always

**Applies to:** *

---

### ANTI_NON_CURRIED_001 - All Functions Must Be Curried

**Priority:** 9 | **Category:** constitutional | **Severity:** 9

**Rule:** ANTI-PATTERN: Non-curried functions with multiple parameters

**Reason:** All functions must be curried for composition and partial application

**Consequences:** Multi-parameter functions can't be composed or partially applied

**Philosophy:** Functions are building blocks - they must be composable

**Examples:**
- ❌ Anti-pattern: `function add(a: number, b: number): number { return a + b }`
- ✅ Correct: `function add(augend: number) { return function addToAugend(addend: number): number { return augend + addend } }`

**Alternative:** Curry all functions

**Applies to:** .ts, .tsx, .js, .jsx

---

### ANTI_TYPE_ORGANIZATION_001 - No Type-Based Organization

**Priority:** 10 | **Category:** constitutional

**Rule:** ANTI-PATTERN: Organizing by file type (utilities/, styles/, api/ folders) instead of by feature

**Reason:** Type-based organization breaks co-location and creates hidden dependencies

**Consequences:** Moving or deleting features becomes nightmare - related files scattered across type folders

**Philosophy:** Feature cohesion over type segregation

**Examples:**
- ❌ Anti-pattern: `styles/UserCard.css, components/UserCard.tsx, utils/userHelpers.ts`
- ✅ Correct: `UserCard/index.tsx, UserCard/index.css, UserCard/_helpers/index.ts`

**Applies to:** *

---

### ANTI_MULTIPLE_FUNCTIONS_001 - One Function Per File

**Priority:** 9 | **Category:** constitutional

**Rule:** ANTI-PATTERN: Multiple functions in one file

**Reason:** Violates modularity, creates hidden dependencies, leaves orphan code when refactoring

**Consequences:** Can't delete individual functions cleanly. Related code scattered in same file

**Philosophy:** One function = one file = one purpose

**Examples:**
- ❌ Anti-pattern: `utils.ts with add(), subtract(), multiply() all in one file`
- ✅ Correct: `add/index.ts, subtract/index.ts, multiply/index.ts in separate folders`

**Applies to:** .ts, .tsx, .js, .jsx

---

### FILE_HIERARCHY_001 - Folder Hierarchy Matches Code Hierarchy

**Priority:** 9 | **Category:** constitutional

**Rule:** Folder hierarchy PRECISELY matches code hierarchy. Embrace the folders!

**Reason:** See entire app structure at a glance. Collapse what you don't care about. Related files stay together

**Consequences:** Flat structures or multi-function files create navigation nightmares

**Philosophy:** Folders are free. Use them liberally. They're not going extinct

**Examples:**
- ✅ Correct: `processUser/index.ts, processUser/_validateUser/index.ts, processUser/_normalizeEmail/index.ts`
- ❌ Wrong: `utils.ts with 20 functions inside`

**Applies to:** .ts, .tsx, .js, .jsx

---

### LOWEST_COMMON_ANCESTOR_001 - Place Functions at Lowest Common Ancestor

**Priority:** 10 | **Category:** constitutional

**Rule:** Functions and components placed at LOWEST COMMON ANCESTOR - the lowest node where all consumers branch

**Reason:** Automatic cleanup - delete a feature and all its helpers go with it. No orphan code. Clear ownership

**Consequences:** Functions at wrong level create hidden dependencies and accumulate as tech debt

**Philosophy:** Modular architecture - things that change together live together

**Examples:**
- ✅ Correct: `userAuth/_hashPassword/ (used by login AND register), login/_validateCredentials/ (only login uses)`
- ❌ Wrong: `utils/hashPassword/ (too high if only userAuth uses it)`

**Applies to:** .ts, .tsx, .js, .jsx

---

### FUNC_ONE_PER_FILE_001 - ONE Function Per File

**Priority:** 10 | **Category:** constitutional

**Rule:** ONE function per file, NO EXCEPTIONS except functions part of currying. Helper functions go in nested folders at LOWEST COMMON ANCESTOR

**Reason:** Extreme modularity. Clear dependencies. Automatic cleanup when deleting features

**Consequences:** Multiple functions per file create hidden dependencies and leave orphan code

**Philosophy:** Delete safety - remove a feature and all its helpers disappear with it

**Applies to:** .ts, .tsx, .js, .jsx

---

### COLOCATION_OVER_TYPE_001 - Co-locate Related Files

**Priority:** 10 | **Category:** constitutional

**Rule:** Co-locate all related files: CSS with components, API calls with modules that use them, scripts with components they enhance. Organize by feature, not by file type

**Reason:** Things that change together should live together. Delete safety - remove a feature and everything goes with it

**Consequences:** Type-based folders (styles/, api/, utils/) create hidden dependencies and orphan code

**Philosophy:** Feature-based organization over type-based organization

**Examples:**
- ✅ Correct: `UserCard/index.tsx, UserCard/index.css, UserCard/index.ts (enhancement script)`
- ❌ Wrong: `components/UserCard.tsx, styles/UserCard.css, scripts/userCard.js`

**Anti-patterns:** styles/ folder (except global), api/ folder, utils/ folder, scripts/ folder

**Applies to:** *

---

### PUBSUB_DECOUPLING_001 - Use Pubsub for Decoupling

**Priority:** 9 | **Category:** constitutional

**Rule:** Use pubsub (Operator library) for complete decoupling between modules. Modules should be independently deletable and moveable

**Reason:** Complete module independence. Move or delete modules without breaking dependencies

**Consequences:** Direct coupling creates brittle dependencies that break when refactoring

**Philosophy:** Modules communicate via events, not direct calls

**Examples:**
- ✅ Correct: `emit('user.created', userData); subscribe('user.created', handleNewUser)`
- ❌ Wrong: `userModule.handleNewUser(userData) // direct coupling`

**Applies to:** .ts, .tsx, .js, .jsx

---

## Formatting Rules

These rules govern code formatting and visual consistency.

### CSS_FORMATTING_001 - CSS Property Formatting

**Priority:** 8 | **Category:** formatting

**Rule:** CSS properties ordered alphabetically, multi-line format, blank line between selector groups, space after colon, modern properties preferred with @supports fallbacks

**Reason:** Alphabetical ordering makes properties easy to find, modern properties with fallbacks ensure compatibility

**Consequences:** Random property order increases cognitive load

**Philosophy:** Minimize cognitive load through consistent ordering

**Applies to:** .css

---

### PROXIMITY_STATEMENT_TYPES_001 - Group Like Statement Types

**Priority:** 8 | **Category:** formatting

**Rule:** Group like single-line statements together, then separate groups from different statement types with blank lines

**Reason:** Different statement types = different purposes. Visual separation mirrors logical separation

**Consequences:** Mixed statement types blur logical boundaries

**Philosophy:** PROXIMITY - group like with like, separate unlike

**Applies to:** .ts, .tsx, .js, .jsx

---

### STYLE_TRAILING_WS_001 - Trailing Whitespace

**Priority:** 7 | **Category:** formatting

**Rule:** Trim trailing whitespace in all files EXCEPT Markdown

**Reason:** Trailing whitespace pollutes version control (except Markdown line breaks)

**Consequences:** Unnecessary whitespace creates git diff noise

**Scope:**
- Trim: .ts, .tsx, .js, .jsx, .json, .py, .yml, .yaml
- Preserve: .md

---

### MARKDOWN_FORMATTING_001 - Markdown Structure

**Priority:** 7 | **Category:** formatting

**Rule:** Markdown: use # for headings with blank line below, blank line above lists and preceding paragraphs, prefer inline links [text](url), use ```lang for code fencing with language specification

**Reason:** Consistent markdown structure improves readability, blank lines create logical separation

**Consequences:** Inconsistent markdown formatting reduces comprehension

**Philosophy:** Minimize cognitive load through consistent structure

**Applies to:** .md

---

### STYLE_TRAILING_COMMA_001 - Trailing Commas

**Priority:** 7 | **Category:** formatting

**Rule:** ALWAYS trailing commas in multi-line structures, NEVER in single-line

**Reason:** Easier to add/reorder items, cleaner git diffs

**Consequences:** Missing trailing comma = merge conflicts when adding items

**Applies to:** .ts, .tsx, .js, .jsx, .json

---

### HTML_FORMATTING_001 - HTML Attribute Formatting

**Priority:** 8 | **Category:** formatting

**Rule:** HTML attributes ordered alphabetically, all values quoted with double quotes, self-closing JSX style with space before />, stack attributes if 3+ or exceeds 80 chars with closing > aligned under opening <

**Reason:** Alphabetical ordering makes attributes easy to find, consistent quoting prevents errors

**Consequences:** Random attribute order and inconsistent quoting increases cognitive load

**Philosophy:** Minimize cognitive load through consistent ordering and visibility

**Applies to:** .html, .tsx, .jsx

---

### STYLE_INDENT_001 - Indentation Standards

**Priority:** 9 | **Category:** formatting

**Rule:** Use TABS for indentation in TypeScript, TSX, JavaScript, JSX, and JSON files. Use 2 SPACES for indentation in Markdown, Python, YAML, and TOML files.

**Reason:** TABS let end users determine indentation width (accessibility). 2-SPACE for clarity without deep nesting.

**Consequences:** Mixed indentation causes git diff noise, editor conflicts, and readability issues

**Scope:**
- Tabs: .ts, .tsx, .js, .jsx, .json
- Spaces: .md, .py, .yaml, .yml, .toml

---

### STYLE_LINE_LENGTH_001 - Line Length Limits

**Priority:** 7 | **Category:** formatting

**Rule:** Maximum line length is 80 characters for code files, no limit for Markdown and YAML

**Reason:** 80 chars allows 4 files side-by-side, readable on phones

**Consequences:** Long lines are hard to read and review

**Scope:**
- Max 80: .ts, .tsx, .js, .jsx, .json, .py
- No limit: .md, .yml, .yaml

---

### PROXIMITY_NO_BLOCK_EDGES_001 - No Blank Lines at Block Edges

**Priority:** 8 | **Category:** formatting

**Rule:** NO blank lines at the start or end of blocks

**Reason:** Block boundaries are already visual separators - extra space is redundant

**Consequences:** Wasted vertical space, broken visual grouping

**Philosophy:** PROXIMITY - block contents belong together

**Applies to:** .ts, .tsx, .js, .jsx

---

### IMPORT_ORDER_001 - Import Ordering

**Priority:** 9 | **Category:** formatting

**Rule:** Imports in specific order with single blank lines between each group: 1) type external, 2) type internal, 3) named external, 4) const external, 5) default external, 6) named internal, 7) const internal, 8) default internal

**Reason:** Consistent order = instant recognition. Types before values shows structure before implementation

**Consequences:** Random imports = cognitive load finding dependencies

**Philosophy:** REPETITION - same order everywhere

**Applies to:** .ts, .tsx, .js, .jsx

---

## Functional Programming Rules

These rules enforce functional programming paradigms and patterns.

### FP_COMPOSITION_001 - Function Composition

**Priority:** 9 | **Category:** functional_programming

**Rule:** Build complex operations by composing simple, focused functions. Use pipe for left-to-right composition, compose for right-to-left

**Reason:** Composition enables building sophisticated behavior from simple, well-tested building blocks

**Consequences:** Monolithic functions are hard to test, understand, and reuse

**Philosophy:** Complex behavior emerges from simple function composition

**Examples:**
- ✅ Correct: `pipe(numbers, filter(isEven), map(double), reduce(add, 0))`
- ❌ Wrong: `function processNumbers(nums) { /* complex monolithic implementation */ }`

**Applies to:** .ts, .tsx, .js, .jsx

---

### RULE_FUNDAMENTAL_001 - Write TypeScript Like Haskell

**Priority:** 10 | **Category:** functional_programming

**Rule:** Write TypeScript, to the extent possible, as if you were writing Haskell

**Reason:** Haskell is the most beautiful language ever written. FP is proven better for reduced cognitive load, fewer bugs, and better parallel processing

**Consequences:** Writing imperative/OOP style creates massive technical debt and blocks progress for weeks

**Philosophy:** Functional programming is not opinion - it's mathematically superior

**Applies to:** .ts, .tsx, .js, .jsx

---

### FP_SINGLE_RESPONSIBILITY_001 - Single Responsibility Principle

**Priority:** 10 | **Category:** functional_programming

**Rule:** Single Responsibility Principle applies to modules, components, functions, types, and constants - each does ONE thing (Occam's Razor)

**Reason:** Things that do multiple things are impossible to test, reuse, or understand. Simplicity reduces cognitive load

**Consequences:** Multi-responsibility code becomes tangled spaghetti that breaks when you change anything

**Philosophy:** Do not needlessly complicate things - Occam's Razor in action

**Examples:**
- ✅ Correct: `validateUser() only validates, saveUser() only saves, then compose them`
- ❌ Wrong: `processUser() that validates AND transforms AND saves - too many responsibilities`

**Scope:** modules, components, functions, types, constants

**Applies to:** .ts, .tsx, .js, .jsx

---

### FP_GENERATOR_USAGE_001 - Generator Usage Guidelines

**Priority:** 8 | **Category:** functional_programming

**Rule:** Use generators for streaming data, lazy evaluation, state machines, and custom iteration where memory efficiency matters. Unlike Haskell's default laziness, be selective - use lazy only where it provides real benefits

**Reason:** Generators provide memory-efficient lazy evaluation for large data sets, infinite sequences, and expensive computations

**Consequences:** Eager evaluation can cause memory issues with large data or unnecessary computation

**Philosophy:** Selective laziness - use where it matters, not everywhere like Haskell

**Examples:**
- Good uses: CSV file streaming, API pagination, infinite sequences, search with early termination, file system traversal
- Avoid: Simple transformations, small data sets, debugging-sensitive code

**Context:** Lexing/parsing in formulator, large data processing, infinite mathematical sequences

**Applies to:** .ts, .tsx, .js, .jsx

---

### FP_GENERATOR_EXCEPTIONS_001 - Generator Function Exceptions

**Priority:** 8 | **Category:** functional_programming

**Rule:** Generator functions may use let/loops internally for performance - no Haskell equivalent exists

**Reason:** Generators have no functional equivalent in Haskell. Performance and memory efficiency require imperative implementation

**Consequences:** Forcing functional patterns on generators creates performance bottlenecks and memory issues

**Philosophy:** When language features have no functional equivalent, pragmatic implementation is acceptable

**Examples:**
- ✅ Correct: `function* generateSequence() { let i = 0; while (i < limit) { yield i++ } }`
- Context: Internal let/while acceptable in generators only

**Applies to:** .ts, .tsx, .js, .jsx

---

### FP_PURE_EXCEPT_IO_001 - Pure Functions Except IO

**Priority:** 10 | **Category:** functional_programming

**Rule:** Functions must be pure except for isolated I/O operations - same inputs produce same outputs, no side effects

**Reason:** Purity enables equational reasoning, makes testing trivial, and allows safe memoization and parallelization

**Consequences:** Impure functions create unpredictable behavior and testing nightmares

**Philosophy:** Pure functions are mathematical - predictable and composable

**Exception:** I/O operations isolated to specific boundary functions

**Applies to:** .ts, .tsx, .js, .jsx

---

### FP_EITHER_BRANCHING_001 - Either for Branching Paths

**Priority:** 8 | **Category:** functional_programming

**Rule:** Use Either<L,R> for branching paths (left/right, this/that) with no implication that one is better than the other. Not for error handling

**Reason:** Either represents choice between two valid options, unlike Result which implies success/failure

**Consequences:** Conflating Either with error handling misses its true purpose as a branching construct

**Philosophy:** Either is for paths, Result is for outcomes

**Examples:**
- ✅ Correct: `Either<DatabaseResult, CacheResult> - both are valid data sources`
- ❌ Wrong: `Either<User, Error> - use Result<User, Error> instead`

**Applies to:** .ts, .tsx, .js, .jsx

---

### FP_MONADIC_RETURNS_001 - Monadic Return Types

**Priority:** 10 | **Category:** functional_programming

**Rule:** Return Result<T,E> for sequential fail-fast operations or Validation<T,E> for parallel error accumulation. Prefer these over Maybe<T> for error handling

**Reason:** Result provides fail-fast sequential processing, Validation accumulates all errors for comprehensive feedback

**Consequences:** Using Maybe for errors loses important error information

**Philosophy:** Error handling should be explicit and contextually appropriate

**Examples:**
- Result: `validateUser(data) // stops at first validation error`
- Validation: `validateForm(fields) // collects all field errors`

**Note:** Maybe<T> acceptable for optional values, but usually we expect to handle errors

**Applies to:** .ts, .tsx, .js, .jsx

---

## Syntax Rules

These rules define naming conventions and code syntax patterns.

### CASE_CONVENTIONS_001 - Case Conventions

**Priority:** 10 | **Category:** syntax

**Rule:** Functions are ALWAYS camelCase. Components are ALWAYS PascalCase. Constants are ALWAYS SCREAMING_SNAKE_CASE. JSON keys are ALWAYS camelCase. No exceptions

**Reason:** Consistent casing instantly identifies the type of identifier. Reduces cognitive load

**Consequences:** Mixed casing creates confusion about what's a function vs component vs constant

**Philosophy:** Visual consistency enables instant recognition

**Examples:**
- Functions: `processData, getUserInfo, calculateTotal`
- Components: `UserCard, NavigationMenu, DataTable`
- Constants: `MAX_RETRIES, API_TIMEOUT, DEFAULT_CONFIG`
- JSON keys: `firstName, isActive, accountBalance`

**Applies to:** .ts, .tsx, .js, .jsx, .json

---

### INITIALISM_CASE_001 - Initialism Case Convention

**Priority:** 9 | **Category:** syntax

**Rule:** Initialisms and acronyms use Sentence case: innerHtml not innerHTML, AstNode not ASTNode, parseHtml not parseHTML, getApi not getAPI

**Reason:** Prevents garbage when converting cases: innerHtml → inner-html (clean) vs innerHTML → inner-h-t-m-l (garbage)

**Consequences:** All-caps initialisms create unreadable snake-case and kebab-case conversions

**Philosophy:** Visual consistency and clean case conversion

**Examples:**
- ✅ Correct: `innerHtml, parseXml, getApi, AstNode, DomElement`
- ❌ Wrong: `innerHTML, parseXML, getAPI, ASTNode, DOMElement`

**Applies to:** .ts, .tsx, .js, .jsx

---

### NATURAL_LANGUAGE_NAMING_001 - Natural Language Names

**Priority:** 10 | **Category:** syntax

**Rule:** Names must be readable as natural language. Use complete words and phrases that clearly express intent. Code should read like plain English

**Reason:** Code is read far more often than written, so optimize for reader comprehension over writer convenience

**Consequences:** Cryptic, overly terse, or clever names require mental translation and slow comprehension

**Philosophy:** Natural language coding - code should be self-documenting

**Examples:**
- ✅ Correct: `calculateUserAccountBalance, isUserEmailAddressVerified, sendWelcomeEmailToNewUser`
- ❌ Wrong: `calcUsrBal, isUsrEmailVerif, sndWelcEmail`

**Applies to:** .ts, .tsx, .js, .jsx

---

### NO_ABBREVIATIONS_001 - No Abbreviations

**Priority:** 9 | **Category:** syntax

**Rule:** NO abbreviations except: 1) Initialisms/acronyms (first letters of multiple words), 2) Approved whitelist: min, max, id, src, dest, temp, doc/docs, spec/specs, info, config, auth, demo, sync, async, ms, sec, hr, kb, mb, gb, tb

**Reason:** Abbreviations create cognitive load requiring mental translation. Full words are self-documenting

**Consequences:** Abbreviations create mystery meat code requiring decoding

**Philosophy:** Natural language coding - write code that reads like English

**Whitelist:**
- Mathematical: min, max, id, src, dest, temp
- Documentation: doc, docs, spec, specs, info, config, auth, demo, sync, async
- Units: ms, sec, hr, kb, mb, gb, tb

**Examples:**
- ❌ Wrong: calc, proc, util, impl, btn, msg
- ✅ Right: calculate, process, utility, implementation, button, message

**Applies to:** .ts, .tsx, .js, .jsx

---

### FUNC_DECLARATION_001 - Function Declarations

**Priority:** 10 | **Category:** syntax

**Rule:** NEVER use arrow functions. Always use named function declarations with explicit blocks and return statements

**Reason:** Named functions are traceable in stack traces. 'function' keyword is explicit. Forces explicit returns

**Consequences:** Arrow functions create debugging nightmares and cognitive ambiguity

**Philosophy:** Natural language coding - functions should be named and explicit

**Exceptions:** Test files only - but even there, prefer named functions

**Applies to:** .ts, .tsx, .js, .jsx

---

### TYPE_NAMING_001 - Type Naming and Import

**Priority:** 9 | **Category:** syntax

**Rule:** Types in PascalCase, in types/index.ts files, exported as named exports, imported with 'type' keyword

**Reason:** PascalCase distinguishes types from values. 'type' import prevents runtime inclusion

**Consequences:** Without 'type' keyword, types can bloat bundles

**Philosophy:** Clear distinction between types and runtime values

**Examples:**
- ✅ Correct: `import type { User, Product } from '../types/index.ts'`
- ❌ Wrong: `import { User, Product } from '../types/index.ts'`

**Applies to:** .ts, .tsx

---

### CONSTANTS_ORGANIZATION_001 - Constants Organization

**Priority:** 8 | **Category:** syntax

**Rule:** Constants in SCREAMING_SNAKE_CASE, in constants/index.ts files, exported as named exports. Object keys within constants remain camelCase: COLORS.aquaBlue

**Reason:** SCREAMING_SNAKE_CASE makes constants unmistakable. Centralized location aids discoverability

**Consequences:** Mixed-case constants blend in with variables

**Philosophy:** Constants should be visually distinct and organizationally grouped

**Examples:**
- ✅ Correct: `export const MAX_RETRIES = 3; export const API_CONFIG = { baseUrl: '...' }`
- ❌ Wrong: `export const maxRetries = 3; const apiConfig = { base_url: '...' }`

**Note:** Object/map keys remain camelCase even within constants

**Applies to:** .ts, .tsx, .js, .jsx

---

### TYPE_ARROW_SYNTAX_001 - Arrow Syntax in Type Signatures

**Priority:** 7 | **Category:** syntax

**Rule:** Arrow function syntax OK in type signatures but prefer named type aliases: type Transform = (value: number) => number is better than inline (value: number) => number

**Reason:** Type signatures can use arrow syntax, but named aliases are clearer and more reusable. Naming can be tricky for function types

**Consequences:** Inline function types are harder to read and not reusable

**Philosophy:** Natural language coding - even types should have meaningful names when possible

**Examples:**
- Acceptable: `function process(fn: (a: number) => number): number`
- ✅ Preferred: `type NumberTransform = (value: number) => number; function process(fn: NumberTransform): number`

**Note:** Exception to no-arrow-functions rule - only applies to type signatures, not function implementations

**Applies to:** .ts, .tsx

---

### FUNC_NAMING_001 - Public vs Private Function Naming

**Priority:** 9 | **Category:** syntax

**Rule:** Public functions use camelCase. Private functions prepend underscore: _privateFunction

**Reason:** Underscore immediately signals 'internal only'. Prevents accidental imports

**Consequences:** Without clear public/private distinction, internal APIs get misused creating breaking changes

**Philosophy:** Visual distinction between public interface and internal implementation

**Examples:**
- Public: `processUser, validateEmail, calculateTotal`
- Private: `_hashPassword, _validateCredentials, _parseToken`

**Applies to:** .ts, .tsx, .js, .jsx

---

### SEMANTIC_FUNCTIONS_001 - Semantic Functions Over Operators

**Priority:** 10 | **Category:** syntax

**Rule:** Use semantic Toolsmith functions instead of operators and methods: isEqual not ===, length(arr) not arr.length, isNotEmpty(arr) not arr.length > 0, not(condition) instead of !condition

**Reason:** Code reads like plain English. Toolsmith functions are null-safe and self-documenting

**Consequences:** Operators like === and ! are cryptic and error-prone. Methods like arr.length create dependencies

**Philosophy:** Natural language coding - replace every operator with semantic equivalents

**Examples:**
- ❌ Wrong: ===, !==, >=, arr.length, !condition, arr.length > 0
- ✅ Right: isEqual, isUnequal, gte, length(arr), not(condition), isNotEmpty(arr)

**Applies to:** .ts, .tsx, .js, .jsx

---

## TypeScript Rules

These rules govern TypeScript-specific patterns and type safety.

### TS_TYPE_INTERFACE_001 - Use type, Never interface

**Priority:** 10 | **Category:** type-definitions | **Severity:** blocking

**Rule:** Always use type aliases, never use interface keyword. Interfaces are mutable, support declaration merging, and are designed for OOP patterns with classes. Types are immutable, sealed, and align with functional programming principles.

**Reason:** Interfaces are mutable, support declaration merging, and are designed for OOP patterns. Types align with FP principles of immutability and sealed definitions

**Consequences:** Using interface allows mutation, declaration merging creates hidden dependencies, and encourages OOP patterns that violate our functional architecture

**Philosophy:** Type vs Interface - types are immutable and sealed, interfaces are mutable and extensible. FP requires immutability

**Examples:**
```typescript
// ✅ Correct
type User = {
	readonly id: string;
	readonly name: string;
}

type ApiResponse<T> = {
	readonly data: T;
	readonly status: number;
}

// ❌ Wrong - PROHIBITED
interface User {
	id: string;
	name: string;
}

interface ApiResponse<T> {
	data: T;
	status: number;
}
```

**Exception:** Only use interface with explicit architect permission for specific interop requirements.

**Applies to:** .ts, .tsx

---

### TS_UNK_008 - Never Use TypeScript's unknown Type

**Priority:** 10 | **Category:** type-safety | **Severity:** blocking

**Rule:** NEVER use TypeScript's built-in unknown type - it is prohibited. Always use Toolsmith's PrimitiveValue, Serializable, Value, or Unknown types instead which provide better semantic meaning and type safety.

**Reason:** NEVER use TypeScript's built-in unknown type - it is prohibited. Always use Toolsmith's PrimitiveValue, Serializable, Value, or Unknown types instead which provide better semantic meaning and type safety

**Consequences:** Using unknown violates type safety principles, reduces code clarity, and conflicts with our type system design that knows what types we're working with

**Philosophy:** Toolsmith Type Usage - TypeScript has limited basic types, and the Toolsmith types provide better semantic meaning. We know what our types are, so use PrimitiveValue, Serializable, Value, or Unknown from Toolsmith

**Examples:**
```typescript
// ✅ Correct
import { Value, Serializable, PrimitiveValue, Unknown } from '@sitebender/toolsmith';

function isUser(value: Value): value is User {
  return typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value;
}

function processUnknownData(data: Unknown): Result<User, ValidationError> {
  return isUser(data)
    ? success(data)
    : failure({ _tag: 'ValidationError', message: 'Not a valid user' });
}

// ❌ Anti-pattern - PROHIBITED
function processUnknownData(data: unknown): User {
  return data as User;
}
```

**Applies to:** .ts, .tsx

---

### TS_ANY_007 - Never Use any Type

**Priority:** 10 | **Category:** type-safety | **Severity:** blocking

**Rule:** The any type completely disables TypeScript's type checking, eliminating the benefits of static typing and making code unsafe. Never use any; use unknown for truly unknown types and proper type definitions for known shapes.

**Reason:** The any type completely disables TypeScript's type checking, eliminating the benefits of static typing and making code unsafe

**Consequences:** Using any allows runtime errors that TypeScript could prevent and eliminates intellisense and refactoring safety

**Philosophy:** Any Type Prohibition - never use any; use unknown for truly unknown types and proper type definitions for known shapes

**Example:**
```typescript
function processApiResponse(response: unknown): Result<ProcessedData, ApiError> {
  if (isApiResponse(response)) {
    return success(processValidResponse(response));
  }
  return failure({ _tag: 'ApiError', message: 'Invalid response' });
}
```

**Applies to:** .ts, .tsx

---

### TS_NOM_015 - Nominal Typing Support

**Priority:** 8 | **Category:** nominal-typing | **Severity:** warning

**Rule:** Nominal typing support through branded types and proper type design creates stronger type safety and clearer domain modeling. Combine branded types, smart constructors, and proper abstractions to achieve nominal typing benefits in TypeScript's structural system.

**Reason:** Nominal typing support through branded types and proper type design creates stronger type safety and clearer domain modeling

**Consequences:** Relying only on structural typing allows semantically different types with same structure to be used interchangeably

**Philosophy:** Nominal Typing Support - combine branded types, smart constructors, and proper abstractions to achieve nominal typing benefits in TypeScript's structural system

**Example:**
```typescript
type UserId = string & { readonly __brand: 'UserId' };
type PostId = string & { readonly __brand: 'PostId' };

// These are now nominally different despite same structure
function getUser(id: UserId): Promise<User> { ... }
function getPost(id: PostId): Promise<Post> { ... }
```

**Applies to:** .ts, .tsx

---

### TS_ADV_005 - Type-Level Programming

**Priority:** 8 | **Category:** type-level-programming | **Severity:** warning

**Rule:** Type-level programming encodes constraints and relationships in the type system, providing compile-time guarantees and reducing runtime errors. Leverage mapped types, conditional types, and template literals to encode constraints and computations in the type system.

**Reason:** Type-level programming encodes constraints and relationships in the type system, providing compile-time guarantees and reducing runtime errors

**Consequences:** Runtime-only constraints allow invalid states to compile and fail at runtime, reducing system reliability

**Philosophy:** Type-Level Programming - leverage mapped types, conditional types, and template literals to encode constraints and computations in the type system

**Example:**
```typescript
type NonEmptyArray<T> = readonly [T, ...T[]];
type EventName<T extends string> = `on${Capitalize<T>}`;
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T];
```

**Applies to:** .ts, .tsx

---

### TS_FUN_012 - Function Composition Types

**Priority:** 8 | **Category:** function-composition | **Severity:** warning

**Rule:** Proper function composition types enable type-safe pipeline operations and make complex transformations more readable and maintainable. Design types to support currying, piping, and composition patterns for functional programming.

**Reason:** Proper function composition types enable type-safe pipeline operations and make complex transformations more readable and maintainable

**Consequences:** Improper composition types lead to type errors and make it difficult to build reusable, composable functions

**Philosophy:** Function Composition Types - design types to support currying, piping, and composition patterns for functional programming

**Example:**
```typescript
type Unary<A, B> = (a: A) => B;
type Binary<A, B, C> = (a: A) => (b: B) => C;

function pipe<A, B, C>(f: Unary<A, B>): (g: Unary<B, C>) => Unary<A, C> {
  return function pipeWithF(g: Unary<B, C>): Unary<A, C> {
    return function pipedFunction(a: A): C {
      return g(f(a));
    }
  }
}
```

**Applies to:** .ts, .tsx

---

### TS_ADT_001 - Discriminated Unions for Safe Variants

**Priority:** 10 | **Category:** algebraic-data-types | **Severity:** blocking

**Rule:** Discriminated unions provide type-safe variant types with exhaustive pattern matching, eliminating null/undefined errors and enabling robust error handling. Use tagged unions with _tag field to enable exhaustive pattern matching and type-safe handling of variant types.

**Reason:** Discriminated unions provide type-safe variant types with exhaustive pattern matching, eliminating null/undefined errors and enabling robust error handling

**Consequences:** Using null/undefined or boolean flags leads to runtime errors, non-exhaustive handling, and loss of type safety

**Philosophy:** Discriminated Unions for Safe Variants - tagged unions with _tag field enable exhaustive pattern matching and type-safe handling of variant types

**Example:**
```typescript
type Result<T, E> =
  | { _tag: "success"; value: T }
  | { _tag: "failure"; error: E };

function handleResult<T, E>(result: Result<T, E>): string {
  switch (result._tag) {
    case "success":
      return `Success: ${result.value}`;
    case "failure":
      return `Error: ${result.error}`;
  }
}
```

**Applies to:** .ts, .tsx

---

### TS_GEN_014 - Generic Constraints

**Priority:** 8 | **Category:** generics | **Severity:** warning

**Rule:** Generic constraints ensure type parameters meet specific requirements, providing compile-time safety while maintaining flexibility. Use extends clauses to constrain type parameters and ensure they have required properties or behaviors.

**Reason:** Generic constraints ensure type parameters meet specific requirements, providing compile-time safety while maintaining flexibility

**Consequences:** Unconstrained generics allow invalid type combinations and reduce type safety in generic functions

**Philosophy:** Generic Constraints - use extends clauses to constrain type parameters and ensure they have required properties or behaviors

**Example:**
```typescript
type HasId = { id: string; }

function updateEntity<T extends HasId>(
  entity: Readonly<T>
) {
  return function updateEntityWithEntity(
    updates: Readonly<Partial<Omit<T, 'id'>>>
  ): Readonly<T> {
    return { ...entity, ...updates };
  }
}
```

**Applies to:** .ts, .tsx

---

### TS_BRT_009 - Smart Constructor Pattern

**Priority:** 8 | **Category:** brand-types | **Severity:** warning

**Rule:** Smart constructors validate input and return Result types, ensuring branded types are always valid and providing clear error handling. Validate input and return Result<BrandedType, Error> to ensure branded types are always valid.

**Reason:** Smart constructors validate input and return Result types, ensuring branded types are always valid and providing clear error handling

**Consequences:** Direct casting to branded types skips validation and allows invalid values to be treated as valid

**Philosophy:** Smart Constructor Pattern - validate input and return Result<BrandedType, Error> to ensure branded types are always valid

**Example:**
```typescript
function userId(str: string): Result<UserId, ValidationError> {
  if (isNotEmpty(str) && str.length <= 50 && /^[a-zA-Z0-9_-]+$/.test(str)) {
    return success(str as UserId);
  }
  return failure({
    _tag: 'ValidationError',
    field: 'userId',
    message: 'UserId must be 1-50 alphanumeric characters'
  });
}
```

**Applies to:** .ts, .tsx

---

### TS_TYP_003 - Explicit Type Annotations

**Priority:** 9 | **Category:** type-safety | **Severity:** blocking

**Rule:** Explicit type annotations provide clear contracts, improve code readability, and catch type errors early in development. Always annotate function parameters and return types to create clear, self-documenting contracts.

**Reason:** Explicit type annotations provide clear contracts, improve code readability, and catch type errors early in development

**Consequences:** Relying on type inference for public APIs creates unclear contracts and makes refactoring dangerous

**Philosophy:** Explicit Type Annotations - always annotate function parameters and return types to create clear, self-documenting contracts

**Example:**
```typescript
function processUser(
  user: Readonly<User>,
  options: Readonly<ProcessOptions>
): Result<ProcessedUser, ProcessError> {
  return processUserWithOptions(user, options);
}
```

**Applies to:** .ts, .tsx

---

### TS_ARR_006 - Array<T> Syntax Consistency

**Priority:** 7 | **Category:** array-syntax | **Severity:** advisory

**Rule:** Array<T> syntax is more explicit and consistent with generic type patterns, improving readability especially for complex nested types. Use Array<T> and ReadonlyArray<T> for consistency with generic patterns and clarity with complex types.

**Reason:** Array<T> syntax is more explicit and consistent with generic type patterns, improving readability especially for complex nested types

**Consequences:** T[] syntax becomes unclear with complex types and doesn't consistently follow generic type conventions

**Philosophy:** Array<T> Syntax Consistency - use Array<T> and ReadonlyArray<T> for consistency with generic patterns and clarity with complex types

**Example:**
```typescript
function processUsers(
  users: ReadonlyArray<User>,
  processors: ReadonlyArray<(user: User) => ProcessedUser>
): ReadonlyArray<ProcessedUser> {
  return users.map(processors[0]);
}
```

**Applies to:** .ts, .tsx

---

## JSX Rules

These rules govern JSX/React component patterns and data-as-configuration principles.

### JSX_EVENTS_001 - Event Component Structure

**Priority:** 8 | **Category:** events

**Rule:** Event components must follow the triple pattern (subject-predicate-object) and maintain referential transparency. All events must be serializable.

**Reason:** Ensures event-driven architectures are debuggable, auditable, and can be replayed or analyzed using RDF tools

**Consequences:** Opaque event handling makes debugging impossible and breaks audit trail capabilities

**Philosophy:** Event Component Structure - triple pattern (subject-predicate-object) with referential transparency and serializable events

**Examples:**
```jsx
// ✅ Correct
<Button>
  <Publishes
    event="user:clicked:save-button"
    payload={documentId}
    timestamp="auto"
  />
  Save Document
</Button>

// ❌ Anti-pattern
<Button onClick={() => saveDocument(doc.id)}>
  Save Document
</Button>
```

**Applies to:** .tsx, .jsx

---

### JSX_UNIVERSAL_004 - Cross-Library Integration Patterns

**Priority:** 9 | **Category:** universal

**Rule:** Components from different libraries must integrate seamlessly. Use consistent naming conventions, data formats, and event patterns across all libraries.

**Reason:** Enables complex applications that span multiple domains (authentication + commerce + i18n) while maintaining coherent development experience

**Consequences:** Conflicting integration patterns make cross-library composition fragile and development experience inconsistent

**Philosophy:** Cross-Library Integration Patterns - consistent naming conventions, data formats, and event patterns across all libraries

**Examples:**
```jsx
// ✅ Correct
<LocaleProvider>
  <Authentication>
    <Cart>
      <Product sku="widget-001">
        <Translation key="product.name" />
      </Product>
    </Cart>
  </Authentication>
</LocaleProvider>
```

**Applies to:** .tsx, .jsx

---

### JSX_DEVTOOLS_001 - Multi-Modal Interface Patterns

**Priority:** 7 | **Category:** devtools

**Rule:** Developer tool components must support multiple interaction modes (voice, GUI, CLI, collaborative) with consistent data models across all modes.

**Reason:** Ensures development tooling is accessible and usable across different workflows while maintaining consistent behavior

**Consequences:** Single-mode interfaces exclude users and create inconsistent development experiences across different workflows

**Philosophy:** Multi-Modal Interface Patterns - multiple interaction modes (voice, GUI, CLI, collaborative) with consistent data models across all modes

**Examples:**
```jsx
// ✅ Correct
<QuartermasterInterface>
  <VoiceGuidedSetup>
    <AiAssistant provider="claude" fallback="text" />
    <ConversationalConfig accessible={true} />
  </VoiceGuidedSetup>
  <GuiWizard fallback="voice" />
  <CliInterface scriptable={true} />
</QuartermasterInterface>
```

**Applies to:** .tsx, .jsx

---

### JSX_SECURITY_001 - Authentication Provider Patterns

**Priority:** 9 | **Category:** security

**Rule:** Authentication components must support multiple providers, graceful fallbacks, and clear success/failure states. Avoid hardcoding secrets in components.

**Reason:** Ensures secure and flexible authentication while maintaining user experience across different authentication scenarios

**Consequences:** Insecure authentication patterns expose secrets and provide poor fallback experience

**Philosophy:** Authentication Provider Patterns - multiple providers, graceful fallbacks, and clear success/failure states without hardcoded secrets

**Examples:**
```jsx
// ✅ Correct
<Authentication>
  <OAuthTwo
    provider="github"
    clientIdFrom="env:GITHUB_CLIENT_ID"
    scopes={["read:user"]}
  />
  <WebAuthn fallback />
  <OnFailure><Redirect to="/login" /></OnFailure>
</Authentication>
```

**Applies to:** .tsx, .jsx

---

### JSX_UNIVERSAL_001 - Data-as-Configuration Principle

**Priority:** 10 | **Category:** universal

**Rule:** Components must be configured through declarative data structures rather than imperative code. All component behavior should be derivable from props and composition patterns.

**Reason:** Ensures all components can be serialized, stored as RDF triples, and reconstructed deterministically. Enables the core Studio principle that 'everything is data.'

**Consequences:** Components become tightly coupled to imperative behavior and cannot be serialized or stored as data structures

**Philosophy:** Data-as-Configuration Principle - components configured through declarative data structures rather than imperative code

**Examples:**
```jsx
// ✅ Correct
<Authentication>
  <OAuthTwo provider="github" scopes={["read:user"]} />
</Authentication>

// ❌ Anti-pattern
<Authentication onMount={() => setupOAuth("github")} />
```

**Applies to:** .tsx, .jsx

---

### JSX_GOVERNANCE_003 - Compliance Framework Integration

**Priority:** 9 | **Category:** governance

**Rule:** Compliance validation components must support multiple regulatory frameworks with specific technical and procedural requirements. Use standard compliance identifiers and requirements.

**Reason:** Ensures workflows meet regulatory requirements across different jurisdictions while providing automated compliance verification

**Consequences:** Generic compliance checking fails to meet specific regulatory requirements and makes automated verification impossible

**Philosophy:** Compliance Framework Integration - multiple regulatory frameworks with specific technical and procedural requirements using standard compliance identifiers

**Examples:**
```jsx
// ✅ Correct
<ComplianceValidation>
  <RegulatoryFrameworks>
    <Gpdr>
      <DataProcessingLawfulness>
        <ConsentManagement required={true} />
        <DataMinimization enforced={true} />
      </DataProcessingLawfulness>
    </Gpdr>
  </RegulatoryFrameworks>
</ComplianceValidation>
```

**Applies to:** .tsx, .jsx

---

### JSX_EVENTS_003 - Workflow Orchestration Patterns

**Priority:** 8 | **Category:** events

**Rule:** Event-driven workflows must be composable and recoverable. Use explicit state machines for complex orchestration patterns.

**Reason:** Ensures complex business processes are reliable, auditable, and can recover gracefully from failures

**Consequences:** Implicit workflow coupling makes business processes brittle and impossible to debug or recover

**Philosophy:** Workflow Orchestration Patterns - composable and recoverable event-driven workflows with explicit state machines

**Examples:**
```jsx
// ✅ Correct
<Workflow name="order-processing">
  <On event="order:created">
    <TriggerWorkflow name="validate-payment" />
  </On>
  <On event="payment:confirmed">
    <Pipe>
      <TriggerWorkflow name="reserve-inventory" />
      <TriggerWorkflow name="send-confirmation" />
    </Pipe>
  </On>
</Workflow>
```

**Applies to:** .tsx, .jsx

---

### JSX_GOVERNANCE_004 - Real-Time Monitoring Patterns

**Priority:** 9 | **Category:** governance

**Rule:** Workflow monitoring components must provide real-time violation detection, automatic response capabilities, and comprehensive audit trails. Support both critical and warning level violations with appropriate responses.

**Reason:** Ensures workflow governance is enforced continuously and violations are detected and responded to immediately

**Consequences:** Basic monitoring without response capabilities allows violations to persist and cause system damage

**Philosophy:** Real-Time Monitoring Patterns - real-time violation detection, automatic response capabilities, and comprehensive audit trails with appropriate violation responses

**Applies to:** .tsx, .jsx

---

### JSX_STATE_001 - State Machine Component Design

**Priority:** 8 | **Category:** state

**Rule:** State machine components must define explicit states, transitions, and guards. All state changes must be deterministic and auditable.

**Reason:** Ensures application state is predictable, debuggable, and can be visualized or restored from audit logs

**Consequences:** Implicit state management makes application behavior unpredictable and impossible to debug or audit

**Philosophy:** State Machine Component Design - explicit states, transitions, and guards with deterministic and auditable state changes

**Examples:**
```jsx
// ✅ Correct
<StateMachine name="document-lifecycle">
  <State name="draft">
    <Transition
      on="publish"
      to="published"
      guard={hasRequiredFields}
    />
  </State>
  <State name="published">
    <Transition on="archive" to="archived" />
  </State>
</StateMachine>
```

**Applies to:** .tsx, .jsx

---

### JSX_EVENTS_002 - Transport Layer Configuration

**Priority:** 8 | **Category:** events

**Rule:** Event components must specify transport mechanisms, retry policies, and failure handling. Support both local and distributed event delivery.

**Reason:** Ensures reliable event delivery across different deployment scenarios while maintaining performance and consistency

**Consequences:** Implicit transport assumptions cause events to fail in different deployment environments

**Philosophy:** Transport Layer Configuration - explicit transport mechanisms, retry policies, and failure handling for reliable event delivery

**Examples:**
```jsx
// ✅ Correct
<Channel id="user-actions" transport="websocket" scope="session">
  <RetryPolicy attempts={3} backoff="exponential" />
  <Persistence strategy="memory" maxEvents={1000} />
</Channel>
```

**Applies to:** .tsx, .jsx

---

## Toolsmith Rules

These rules govern the Toolsmith library's internal implementation and performance optimizations.

### TOOLSMITH_PERF_002 - Exception Documentation Standards

**Priority:** 9 | **Category:** toolsmith | **Scope:** documentation

**Rule:** All performance exceptions in Toolsmith library must be documented using specific Envoy comment formats. Use [EXCEPTION] for breaking functional programming principles due to performance needs, and [OPTIMIZATION] for performance-focused implementations that maintain functional patterns.

**Format:** `// [EXCEPTION] Reason: specific justification` or `// [OPTIMIZATION] Reason: performance technique`

**Required fields:**
1. Clear rationale for the exception
2. Performance benefit being achieved
3. Scope limitation (internal only)
4. Alternative approaches considered

**Examples:**
- `// [EXCEPTION] Reason: Using mutable array.push() for O(1) vs O(n) functional concat`
- `// [OPTIMIZATION] Reason: Direct property access instead of lens traversal for hot path`

---

### TOOLSMITH_PERF_005 - Performance vs Ideology Trade-offs

**Priority:** 9 | **Category:** performance | **Scope:** internal_utilities

**Rule:** In Toolsmith library development, performance considerations override strict functional programming ideology when justified and documented.

**Performance wins in these scenarios:**
1. Hot path operations where functional approaches create measurable overhead
2. Memory-intensive operations where immutable patterns cause excessive allocation
3. Iteration-heavy algorithms where functional composition creates call stack issues
4. Type system boundaries where monadic wrapping adds significant runtime cost

**Decision criteria:** Profile first, measure impact, document rationale, contain scope to internal utilities only.

**Comment format:** `[PERFORMANCE_OVER_IDEOLOGY]` with benchmark data or clear performance reasoning

**Note:** Application-level code maintains strict functional patterns - these exceptions apply only to internal Toolsmith utilities.

---

### TOOLSMITH_PERF_001 - Performance Exception Permissions

**Priority:** 8 | **Category:** toolsmith | **Scope:** internal_utilities

**Rule:** Array.push() and loops are permitted in Toolsmith library functions when performance is critical.

**Internal utility functions may use imperative patterns for optimization:**
1. .push() operations on newly created arrays for building results
2. for/while loops in performance-critical sections
3. let bindings for iteration variables in generators

**ONLY allowed in internal Toolsmith utilities, not in application-level code.**

**All exceptions must be documented with [EXCEPTION] or [OPTIMIZATION] Envoy comments explaining the performance rationale.**

**Example:** `// [EXCEPTION] Using .push() for O(1) amortized performance in hot path`

---

### TOOLSMITH_PERF_004 - Generator Function Development Permissions

**Priority:** 7 | **Category:** toolsmith | **Scope:** generator_functions

**Rule:** Generator functions in Toolsmith library are granted special exceptions to functional programming constraints due to their unique nature and lack of Haskell equivalent.

**Permitted patterns in generators:**
1. let bindings for iteration state management
2. while/for loops for iteration control
3. Mutable counters and accumulators within generator scope
4. Imperative yield logic for performance-critical streaming operations

**Rationale:** Generators provide lazy evaluation and memory efficiency impossible with pure functional approaches in TypeScript.

**All imperative patterns must be contained within the generator function scope and documented with [GENERATOR_EXCEPTION] comments.**

**Examples:**
```typescript
function* range(start, end) {
  // [GENERATOR_EXCEPTION] Let binding for iteration
  let current = start;
  while (current <= end) yield current++;
}
```

---

### TOOLSMITH_PERF_006 - Math Type Implementation Guidelines

**Priority:** 8 | **Category:** toolsmith | **Scope:** math_types

**Rule:** Toolsmith library implements four math types (integer, bigint, float, precision) with same function names but different internal optimization paths for maximum performance.

**Implementation patterns:**
1. Type-specific optimizations allowed with [MATH_TYPE_OPTIMIZATION] comments
2. Direct numeric operations for integer/float types bypass generic number handling
3. BigInt-specific algorithms may use different computational approaches
4. Precision types may employ specialized decimal arithmetic libraries

**Path structure:** /math/integer/, /math/bigint/, /math/float/, /math/precision/ with identical function signatures but optimized implementations.

**Performance exceptions permitted:** native arithmetic operators, type-specific algorithms, optimized comparison functions.

**All type-specific optimizations must document performance benefit and maintain mathematical correctness across all four type implementations.**

**Examples:**
- `// [MATH_TYPE_OPTIMIZATION] Integer: Direct + operator vs generic add() for 10x performance`
- `// [MATH_TYPE_OPTIMIZATION] Precision: Using decimal.js library for accurate floating point math`

---

## Accessibility Rules

These rules ensure components are accessible to all users.

### A11Y_REQUIRED_PROPS_001 - Accessibility as Required Props

**Priority:** 10 | **Category:** accessibility

**Rule:** Make accessibility required props non-optional. Build accessibility INTO components so end users cannot skip it

**Reason:** Accessibility should be impossible to forget or skip. Required props ensure proper content

**Consequences:** Optional accessibility props get skipped, creating inaccessible interfaces

**Philosophy:** BUILD-IN accessibility so end users can't mess it up

**Examples:**
- ✅ Correct: `label: string (required), helpText?: string (optional)`
- ❌ Wrong: `label?: string (optional - allows unlabeled fields)`

**Applies to:** .tsx, .jsx

---

### A11Y_COLOR_INDEPENDENCE_001 - Color Independence Requirements

**Priority:** 9 | **Category:** accessibility

**Rule:** Information must be available without color dependency. Requires Architect approval for visual design decisions. Support color-blind users with high contrast integration through CSS theming system

**Reason:** Color-blind users and high contrast mode users cannot rely on color alone for information. Visual design affects accessibility standards

**Consequences:** Color-only information excludes users with color blindness or contrast sensitivity

**Philosophy:** Information must be perceivable through multiple channels, not just color

**Design integration:** Requires Architect approval for visual design decisions - AIs handle semantics, humans handle visual design

**Technical implementation:** CSS custom properties for theming, @supports queries for high contrast modes

**Examples:**
- ✅ Correct: Error state: red border + icon + error text message
- ❌ Wrong: Error state: only red border color
- CSS integration: Uses CSS custom properties for theme-aware color schemes

**Applies to:** .tsx, .jsx, .css

---

### A11Y_SCREEN_READER_001 - Screen Reader Support

**Priority:** 10 | **Category:** accessibility

**Rule:** Non-visual user support through semantic markup, live regions for dynamic content, and sufficient context provision. Screen reader navigation via Pagewright's semantic components with HTML-first approach

**Reason:** Screen reader users need semantic structure and context to understand and navigate interfaces effectively

**Consequences:** Poor semantic markup and missing context make interfaces unusable for screen reader users

**Philosophy:** Progressive enhancement - semantic HTML works with screen readers, enhanced with live regions

**Technical implementation:** Live regions for dynamic content updates, proper heading hierarchy, descriptive labels

**Examples:**
- Live regions: `aria-live='polite' for form validation messages, 'assertive' for urgent updates`
- Semantic navigation: Proper heading hierarchy (h1, h2, h3) for screen reader navigation

**Applies to:** .tsx, .jsx

---

### A11Y_PLAIN_LANGUAGE_001 - Plain Language Content

**Priority:** 9 | **Category:** accessibility

**Rule:** Use plain language content with Linguist library. Apply Strunk & White principles: clear, concise, descriptive labels and help text

**Reason:** Clear language reduces cognitive load for all users, especially those with cognitive disabilities

**Consequences:** Complex or jargon-heavy content excludes users and creates confusion

**Philosophy:** Communication should be clear and accessible to everyone

**Examples:**
- ✅ Good: Email address, Phone number, Choose your preferred contact method
- ❌ Bad: E-mail addr, Ph. #, Select optimal communication vector

**Applies to:** .tsx, .jsx

---

### A11Y_ARIA_GUIDELINES_001 - ARIA Usage Guidelines

**Priority:** 10 | **Category:** accessibility

**Rule:** NO ARIA is better than BAD ARIA. Use ARIA only when Pagewright's built-in semantic components are insufficient. End users never see ARIA directly - AI component builders use ARIA internally but hide complexity from end users through semantic props mapping

**Reason:** End users never see ARIA directly. Incorrect ARIA makes accessibility worse than no ARIA. Pagewright's semantic components handle most accessibility automatically

**Consequences:** Bad ARIA confuses screen readers and breaks accessibility more than missing ARIA

**Philosophy:** NO ARIA better than BAD ARIA - Pagewright semantics first, ARIA only when insufficient

**Integration:** AI component builders use ARIA internally but map to semantic props like 'use' instead of 'role'

**Examples:**
- ✅ Correct: Use semantic Pagewright components with built-in accessibility
- When ARIA needed: Live regions for dynamic content, custom controls where no semantic Pagewright equivalent exists
- Hide from users: Map ARIA attributes to semantic props - 'use' instead of 'role', 'purpose' instead of 'aria-label'

**Applies to:** .tsx, .jsx

---

### A11Y_MINIMAL_ARIA_001 - Minimal ARIA Usage

**Priority:** 10 | **Category:** accessibility

**Rule:** NO ARIA is better than BAD ARIA. Use ARIA only when Pagewright's semantic components are insufficient. End users should never see ARIA attributes

**Reason:** Incorrect ARIA makes accessibility worse than no ARIA. Pagewright semantics handle most cases automatically

**Consequences:** Bad ARIA confuses screen readers and breaks accessibility

**Philosophy:** Semantic HTML first, ARIA only when absolutely necessary

**Examples:**
- ✅ Correct: Use semantic components with built-in accessibility
- When ARIA needed: Live regions, custom controls where no semantic equivalent exists
- Hide from users: Map ARIA to semantic props like 'use' instead of 'role'

**Applies to:** .tsx, .jsx

---

### A11Y_CSS_SUPPORTS_001 - CSS Progressive Enhancement

**Priority:** 8 | **Category:** accessibility

**Rule:** Progressive CSS enhancement using feature detection. Use @supports queries over browser detection with legacy-first approach. Base styles work everywhere, enhancements layer on top

**Reason:** @supports queries ensure graceful degradation and progressive enhancement. Legacy browsers get working base styles

**Consequences:** Browser detection breaks and excludes users. Missing fallbacks create inaccessible interfaces on older technology

**Philosophy:** Base styles work everywhere, enhancements layer on top through feature detection

**Technical implementation:** @supports queries for CSS features, legacy-first CSS with fallbacks, CSS custom properties

**Examples:**
- ✅ Correct: `@supports (display: grid) { .layout { display: grid; } } /* fallback: display: block */`
- ❌ Wrong: `if (browser === 'Chrome') { /* grid styles */ }`

**Applies to:** .css, .tsx, .jsx

---

### A11Y_KEYBOARD_NAVIGATION_001 - Keyboard Navigation

**Priority:** 10 | **Category:** accessibility

**Rule:** Component-level keyboard navigation integration with tab order, focus management, and visible focus indicators. Navigation handled automatically by Pagewright components with logical keyboard flow

**Reason:** Keyboard-only users must be able to navigate and operate all interface elements. Focus management prevents users from getting trapped

**Consequences:** Poor keyboard navigation excludes users who cannot use pointing devices

**Philosophy:** Logical keyboard flow through forms and interfaces, handled automatically by components

**Technical implementation:** Tab order management, focus indicators, escape key handling, arrow key navigation

**Examples:**
- Tab order: Sequential tab through form fields, skip links for main content
- Focus management: Modal dialogs trap focus, focus returns to trigger element on close
- Visible focus: High contrast focus indicators, not just browser defaults

**Applies to:** .tsx, .jsx

---

### A11Y_SEMANTIC_COMPONENTS_001 - Semantic Components Only

**Priority:** 10 | **Category:** accessibility

**Rule:** Use semantic Pagewright components exclusively, never raw HTML elements. End users work in plain English semantics, not HTML widgets

**Reason:** Pagewright enforces accessibility automatically. Raw HTML bypasses built-in protections

**Consequences:** Raw HTML elements lose accessibility guards, semantic meaning, and type safety

**Philosophy:** BUILD-IN accessibility so end users can't mess it up

**Context:**
- Libraries: pagewright
- Usage: component_development

**Examples:**
- ✅ Correct: PhoneNumberField, EmailAddressField, ChooseOneField
- ❌ Wrong: `<input type="tel">`, `<input type="email">`, `<select>`

**Applies to:** .tsx, .jsx

---

### A11Y_ARCHITECT_APPROVAL_001 - Architect Approval for Visual Design

**Priority:** 8 | **Category:** accessibility

**Rule:** Get Architect approval for visual design decisions. AIs focus on semantics and structure, not colors, fonts, or visual styling

**Reason:** Visual design affects accessibility (contrast, readability). Design decisions should be intentional, not AI-generated

**Consequences:** AI-chosen colors and fonts may violate accessibility standards or brand guidelines

**Philosophy:** Separate concerns - AIs handle semantics, humans handle visual design

**Examples:**
- AI responsibility: Component structure, ARIA, semantic meaning
- Architect responsibility: Color schemes, typography, visual hierarchy

**Applies to:** .tsx, .jsx, .css

---

## Content Rules

These rules govern written content following Strunk & White principles.

### PLAIN_LANGUAGE_LEVEL_001 - 8th Grade Reading Level

**Priority:** 9 | **Category:** content

**Rule:** Write at 8th grade reading level maximum for Sitebender content. Use simple sentences and common words unless technical precision requires complexity

**Reason:** 8th grade level ensures accessibility for most readers while maintaining precision

**Consequences:** Complex language excludes users and increases cognitive load

**Philosophy:** Universal understanding through clear communication

**Examples:**
- ❌ Complex: Utilize this functionality to accomplish your objective
- ✅ Clear: Use this feature to reach your goal

**Context:** Sitebender targets designers, hobbyists, and laypersons - not enterprise developers

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_TENSE_CONSISTENCY_001 - Verb Tense Consistency

**Priority:** 8 | **Category:** content

**Rule:** Maintain verb tense consistency throughout passages. Once you establish a tense for describing events or procedures, maintain that tense throughout the section unless there's a clear logical reason to shift.

**Reason:** Consistent verb tense creates smooth reading flow and prevents confusion about when actions occur. In technical documentation, tense shifts can make procedures unclear.

**Consequences:** Inconsistent tense creates jarring reading experiences and can confuse users about the sequence or timing of actions, especially in instructional content.

**Philosophy:** Consistent grammatical patterns allow readers to focus on content meaning rather than being distracted by structural inconsistencies.

**Examples:**
- ❌ Incorrect: First, open the file. Then you will save it. Next, we closed the application.
- ✅ Correct: First, open the file. Then save it. Next, close the application.

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_OMIT_NEEDLESS_001 - Omit Needless Words

**Priority:** 10 | **Category:** content

**Rule:** Omit needless words. Delete phrases like 'the fact that', 'in order to', 'for the purpose of'

**Reason:** Every word should earn its place. Extra words dilute meaning and waste reader's time

**Consequences:** Verbose writing obscures meaning and tests reader patience

**Philosophy:** Clarity through economy - no gratuitous words

**Examples:**
- ❌ Verbose: The fact that she was late is due to the reason that traffic was bad
- ✅ Clear: She was late because of traffic

**Applies to:** component_text, documentation, essays, user_interface

---

### AUDIENCE_AWARENESS_001 - Know Your Audience

**Priority:** 10 | **Category:** content

**Rule:** Know your audience and write for them. Ask 'Who is the intended audience?' if unclear. Generally Sitebender users are not developers - avoid technical jargon unless clearly addressing experts

**Reason:** Content must match audience knowledge and needs. Technical language excludes non-technical users

**Consequences:** Wrong audience level creates confusion, exclusion, or condescension

**Philosophy:** Write for the reader, not the writer

**Examples:**
- ❌ Technical: Configure the RESTful API endpoint parameters
- ✅ User-friendly: Set up your connection settings

**Default audience:** Sitebender end users (designers, hobbyists, laypersons) not enterprise developers

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_SENTENCE_VARIETY_001 - Sentence Structure Variety

**Priority:** 8 | **Category:** content

**Rule:** Avoid succession of loose sentences. Vary sentence structure. Connect related ideas with subordination and coordination

**Reason:** Monotonous sentence patterns create boring, choppy prose. Variety creates flow and emphasizes relationships

**Consequences:** All simple sentences create choppy, elementary writing style

**Philosophy:** Sentence structure should support meaning and create readable rhythm

**Examples:**
- ❌ Choppy: The user clicked submit. The form validated. The data was saved. A confirmation appeared.
- ✅ Varied: When the user clicked submit, the form validated and saved the data, then displayed a confirmation.

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_DASH_HYPHEN_001 - Dash and Hyphen Usage

**Priority:** 7 | **Category:** content

**Rule:** Distinguish between dash and hyphen usage. Use em dashes (—) for parenthetical breaks, interruptions, or to set off explanatory material. Use hyphens (-) for compound words, prefixes, and line breaks. En dashes (–) are for ranges and connections between equal elements.

**Reason:** Proper dash and hyphen usage creates clear visual distinctions between different types of breaks and connections, improving readability and professional appearance.

**Consequences:** Incorrect dash/hyphen usage creates visual inconsistency and can confuse readers about the relationship between ideas. Overuse of hyphens where dashes belong weakens the prose.

**Philosophy:** Different punctuation marks serve specific semantic purposes—using them correctly helps readers understand the precise relationship between concepts.

**Examples:**
- ❌ Incorrect: The API - which handles authentication - was updated
- ✅ Correct: The API—which handles authentication—was updated

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_AVOID_QUALIFIERS_001 - Avoid Qualifiers

**Priority:** 9 | **Category:** content

**Rule:** Avoid qualifiers like 'rather', 'very', 'pretty', 'quite'. Use definite language or choose stronger words

**Reason:** Qualifiers weaken statements and add vagueness. Strong words stand alone

**Consequences:** Qualifiers make writing tentative and unconvincing

**Philosophy:** Confidence in expression - say what you mean clearly

**Examples:**
- ❌ Qualified: rather difficult, very important, pretty good, quite sure
- ✅ Definite: difficult, crucial, excellent, certain

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_QUOTATION_MARKS_001 - Quotation Mark Placement

**Priority:** 8 | **Category:** content

**Rule:** Place quotation marks correctly with periods and commas. In American English, periods and commas always go inside quotation marks, regardless of whether they are part of the quoted material.

**Reason:** Consistent quotation mark placement follows established American English conventions and maintains professional appearance in documentation and user interfaces.

**Consequences:** Incorrect quotation mark placement appears unprofessional and can confuse readers about what is being quoted. In technical documentation, this inconsistency undermines credibility.

**Philosophy:** Typographical conventions serve as shared standards that allow readers to focus on content rather than being distracted by formatting inconsistencies.

**Examples:**
- ❌ Incorrect: He said "Hello world". The function is called "getData".
- ✅ Correct: He said "Hello world." The function is called "getData."

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_AVOID_AND_OR_001 - Avoid 'and/or'

**Priority:** 8 | **Category:** content

**Rule:** Avoid 'and/or' constructions. Instead of using 'and/or', choose either 'and' or 'or' based on the intended meaning, or rewrite the sentence to be clearer.

**Reason:** The 'and/or' construction is imprecise and forces readers to interpret multiple possible meanings simultaneously, reducing clarity in professional communication.

**Consequences:** Using 'and/or' creates ambiguity about whether options are exclusive, inclusive, or both. This can lead to misunderstandings, especially in technical specifications or user instructions.

**Philosophy:** Clear writing makes definitive statements about relationships between concepts rather than forcing readers to interpret multiple possibilities.

**Examples:**
- ❌ Vague: Users can edit and/or delete records
- ✅ Concrete: Users can edit or delete records

**Applies to:** component_text, documentation, essays, user_interface

---

### STRUNK_SERIAL_COMMA_001 - Serial Comma

**Priority:** 8 | **Category:** content

**Rule:** Use serial comma before 'and' in series: 'A, B, and C' not 'A, B and C'

**Reason:** Serial comma prevents ambiguity and misreading. Eliminates confusion about grouping

**Consequences:** Missing serial comma can create unintended associations or unclear meaning

**Philosophy:** Clarity over brevity - one character prevents misunderstanding

**Examples:**
- ❌ Unclear: I invited my parents, Einstein and Tesla (sounds like parents ARE Einstein and Tesla)
- ✅ Clear: I invited my parents, Einstein, and Tesla (three separate parties)

**Applies to:** component_text, documentation, essays, user_interface

---

## Operator Substitutions

These rules define semantic function replacements for operators.

### SUBSTITUTE_OR_001 - Use or() Instead of ||

**Priority:** 9 | **Category:** operator_substitution

**Replaces:** `||`

**Substitute:** `or`

**Reason:** or reads like English and handles null/undefined safely

**Import:** `@sitebender/toolsmith/validation/or/index.ts`

**Examples:**
- ❌ Wrong: `const value = input || defaultValue`
- ✅ Right: `const value = or(input)(defaultValue)`

**Applies to:** .ts, .tsx, .js, .jsx

---

### SUBSTITUTE_AND_001 - Use and() Instead of &&

**Priority:** 9 | **Category:** operator_substitution

**Replaces:** `&&`

**Substitute:** `and`

**Reason:** and reads like English and handles null/undefined safely

**Import:** `@sitebender/toolsmith/validation/and/index.ts`

**Examples:**
- ❌ Wrong: `if (isValid && isComplete)`
- ✅ Right: `if (and(isValid)(isComplete))`

**Applies to:** .ts, .tsx, .js, .jsx

---

### SUBSTITUTE_MULTIPLY_001 - Use multiply() Instead of *

**Priority:** 9 | **Category:** operator_substitution

**Replaces:** `*`

**Substitute:** `multiply`

**Data type:** varies (integer/bigint/float/precision)

**Reason:** multiply function is semantic, composable, and type-specific

**Import paths:**
- Integer: `@sitebender/toolsmith/math/integer/multiply/index.ts`
- Bigint: `@sitebender/toolsmith/math/bigint/multiply/index.ts`
- Float: `@sitebender/toolsmith/math/float/multiply/index.ts`
- Precision: `@sitebender/toolsmith/math/precision/multiply/index.ts`

**Examples:**
- ❌ Wrong: `const product = a * b`
- ✅ Right: `const product = multiply(a)(b)`

**Applies to:** .ts, .tsx, .js, .jsx

---

### SUBSTITUTE_NOT_001 - Use not() Instead of !

**Priority:** 10 | **Category:** operator_substitution

**Replaces:** `!`

**Substitute:** `not`

**Reason:** ! is easy to miss visually. not() is explicit and reads like English

**Import:** `@sitebender/toolsmith/validation/not/index.ts`

**Examples:**
- ❌ Wrong: `if (!isValid)`
- ✅ Right: `if (not(isValid))`

**Applies to:** .ts, .tsx, .js, .jsx

---

### SUBSTITUTE_SUBTRACT_001 - Use subtract() Instead of -

**Priority:** 9 | **Category:** operator_substitution

**Replaces:** `-`

**Substitute:** `subtract`

**Data type:** varies (integer/bigint/float/precision)

**Reason:** subtract function is semantic, composable, and type-specific

**Import paths:**
- Integer: `@sitebender/toolsmith/math/integer/subtract/index.ts`
- Bigint: `@sitebender/toolsmith/math/bigint/subtract/index.ts`
- Float: `@sitebender/toolsmith/math/float/subtract/index.ts`
- Precision: `@sitebender/toolsmith/math/precision/subtract/index.ts`

**Examples:**
- ❌ Wrong: `const difference = a - b`
- ✅ Right: `const difference = subtract(b)(a)`

**Applies to:** .ts, .tsx, .js, .jsx

---

### SUBSTITUTE_ADD_INTEGER_CORRECTED_001 - Use add() for Integers Instead of +

**Priority:** 9 | **Category:** operator_substitution

**Replaces:** `+`

**Substitute:** `add`

**Data type:** integer

**Reason:** add function handles integer math correctly and is composable

**Import:** `@sitebender/toolsmith/math/integer/add/index.ts`

**Examples:**
- ❌ Wrong: `const result = a + b`
- ✅ Right: `import add from '@sitebender/toolsmith/math/integer/add/index.ts'; const result = add(a)(b)`

**Context:** Use for integer math operations

**Note:** All math functions named 'add' - path determines type

**Applies to:** .ts, .tsx, .js, .jsx

---

### SUBSTITUTE_GT_001 - Use gt() Instead of >

**Priority:** 9 | **Category:** operator_substitution

**Replaces:** `>`

**Substitute:** `gt` (greaterThan)

**Reason:** gt reads like English and is null-safe

**Import:** `@sitebender/toolsmith/validation/gt/index.ts`

**Examples:**
- ❌ Wrong: `if (score > 100)`
- ✅ Right: `if (gt(100)(score))`

**Applies to:** .ts, .tsx, .js, .jsx

---

### SUBSTITUTE_NOT_STRICT_EQUAL_001 - Use isUnequal() Instead of !==

**Priority:** 10 | **Category:** operator_substitution

**Replaces:** `!==`

**Substitute:** `isUnequal`

**Reason:** isUnequal is semantic, null-safe, and reads like English

**Import:** `@sitebender/toolsmith/validation/isUnequal/index.ts`

**Examples:**
- ❌ Wrong: `if (a !== b)`
- ✅ Right: `if (isUnequal(a)(b))`

**Applies to:** .ts, .tsx, .js, .jsx

---

### SUBSTITUTE_STRICT_EQUAL_001 - Use isEqual() Instead of ===

**Priority:** 10 | **Category:** operator_substitution

**Replaces:** `===`

**Substitute:** `isEqual`

**Reason:** isEqual is semantic, null-safe, and reads like English

**Import:** `@sitebender/toolsmith/validation/isEqual/index.ts`

**Examples:**
- ❌ Wrong: `if (a === b)`
- ✅ Right: `if (isEqual(a)(b))`

**Applies to:** .ts, .tsx, .js, .jsx

---

## Summary

This document contains **ALL** rules from **ALL** 10 MCP Qdrant collections. These rules are MANDATORY and must be followed when writing code for the Sitebender/Quartermaster project.

**Total Collections:** 10
- Constitutional Rules (10 rules)
- Formatting Rules (10 rules)
- Functional Programming Rules (10 rules)
- Syntax Rules (10 rules)
- TypeScript Rules (11 rules)
- JSX Rules (10 rules)
- Toolsmith Rules (6 rules)
- Accessibility Rules (10 rules)
- Content Rules (10 rules)
- Operator Substitutions (10 rules)

**Last Updated:** 2025-10-15
