# Coding Rules Reference

Quick reference guide for all coding rules organized by collection.

## Constitutional Rules

### Architecture & Structure

**ANTI_OOP_001** - No classes or OOP patterns
- Classes create stateful nightmares; use pure functions only

**FILE_NAMING_INDEX_001** - All code files named index.ts
- Function names go on folders, files always index.ts (except mod.ts)

**FUNC_ONE_PER_FILE_001** - One function per file
- Extreme modularity for clear dependencies and automatic cleanup

**FILE_HIERARCHY_001** - Folder hierarchy matches code hierarchy
- Related files stay together; collapse what you don't need

**LOWEST_COMMON_ANCESTOR_001** - Place functions at lowest common ancestor
- Where all consumers branch; automatic cleanup when deleting

**COLOCATION_OVER_TYPE_001** - Organize by feature, not file type
- CSS with components, not styles/ folder

**ANTI_TYPE_ORGANIZATION_001** - No utilities/, styles/, api/ folders
- Type-based organization breaks co-location

**ANTI_MULTIPLE_FUNCTIONS_001** - No multiple functions in one file
- Violates modularity; creates hidden dependencies

### Imports & Exports

**IMPORT_NO_BARREL_001** - No barrel files ever
- Use aliases for shorter paths, not re-exports

**IMPORT_NO_REEXPORT_001** - No re-exports except function aliases
- Re-exports obscure source and break tree shaking

**IMPORT_DEFAULT_DIRECT_001** - Import as default directly
- Use @sitebender aliases, never relative paths

**FUNC_EXPORT_001** - Export default on same line as declaration
- Single clear export point

### Functions

**ANTI_NON_CURRIED_001** - All functions must be curried
- Multi-parameter functions can't be composed

**PUBSUB_DECOUPLING_001** - Use pubsub for module decoupling
- Modules independently deletable and moveable

**TYPE_PLACEMENT_001** - Single-use types below function (Props above)
- Important code first

**ANTI_ASSUMPTION_001** - Never make assumptions
- Ask for clarification when uncertain

## Syntax Rules

### Naming Conventions

**CASE_CONVENTIONS_001** - Consistent casing
- Functions: camelCase
- Components: PascalCase
- Constants: SCREAMING_SNAKE_CASE
- JSON keys: camelCase

**FUNC_NAMING_001** - Public vs private function names
- Public: camelCase
- Private: _privateFunction (underscore prefix)

**FUNC_CLOSURE_NAMING_001** - Inner function naming
- Name after what they CARRY, not their parameter
- Example: `function add(augend) { return function addToAugend(addend) {...} }`

**NATURAL_LANGUAGE_NAMING_001** - Code reads like English
- Use complete words and phrases

**NO_ABBREVIATIONS_001** - No abbreviations
- Exceptions: min, max, id, src, dest, temp, doc/docs, spec/specs, info, config, auth, demo, sync, async, ms, sec, hr, kb, mb, gb, tb

**INITIALISM_CASE_001** - Sentence case for initialisms
- innerHtml (not innerHTML)
- AstNode (not ASTNode)

### Function Syntax

**FUNC_DECLARATION_001** - Named function declarations only
- Never use arrow functions (except in type signatures)

**TYPE_ARROW_SYNTAX_001** - Arrow syntax OK in types
- Better to create named type aliases
- `type NumberTransform = (value: number) => number`

**SEMANTIC_FUNCTIONS_001** - Use Toolsmith functions over operators
- isEqual not ===
- length(arr) not arr.length
- not(condition) not !condition

### Types

**TYPE_NAMING_001** - Types in PascalCase
- Export as named exports
- Import with 'type' keyword

**CONSTANTS_ORGANIZATION_001** - Constants in SCREAMING_SNAKE_CASE
- In constants/index.ts files
- Object keys remain camelCase

## Formatting Rules

### Indentation & Spacing

**STYLE_INDENT_001** - Tabs vs spaces
- TABS: .ts, .tsx, .js, .jsx, .json
- 2 SPACES: .md, .py, .yaml, .yml, .toml

**STYLE_LINE_LENGTH_001** - 80 character limit
- Code files: 80 chars max
- Markdown/YAML: no limit

**STYLE_OPERATOR_SPACING_001** - Spaces around operators
- `x + y` not `x+y`

**PROXIMITY_MULTILINE_SPACING_001** - Blank lines around multi-line
- Multi-line statements need visual breathing room

**PROXIMITY_STATEMENT_TYPES_001** - Group like statements
- Separate different statement types with blank lines

**PROXIMITY_RETURN_SPACING_001** - Blank line before return
- Return deserves visual emphasis

**PROXIMITY_NO_BLOCK_EDGES_001** - No blank lines at block edges
- Block boundaries already visual separators

**PROXIMITY_ONE_BLANK_MAX_001** - Never more than one blank line
- One separator is enough

### Style Rules

**STYLE_TRAILING_COMMA_001** - Trailing commas in multi-line
- Never in single-line

**STYLE_TRAILING_WS_001** - Trim trailing whitespace
- Except Markdown (for line breaks)

**STYLE_FINAL_NEWLINE_001** - Files end with newline
- POSIX compliance

**STYLE_EOL_001** - LF line endings
- Unix-style only, not CRLF

### Language-Specific

**CSS_FORMATTING_001** - CSS alphabetical properties
- Multi-line format, modern properties with @supports

**HTML_FORMATTING_001** - HTML attributes alphabetical
- Double quotes, stack if 3+ or >80 chars

**MARKDOWN_FORMATTING_001** - Markdown structure
- Blank line below headings, above lists

## Functional Programming Rules

### Core Principles

**RULE_FUNDAMENTAL_001** - Write TypeScript like Haskell
- FP proven better for bugs, cognitive load, parallelism

**FP_PURE_EXCEPT_IO_001** - Pure functions except I/O
- Same inputs → same outputs, no side effects

**FP_IMMUTABILITY_001** - All data immutable
- Use const, ReadonlyArray, Readonly, freeze/deepFreeze

**FP_COMPOSITION_001** - Compose simple functions
- Use pipe/compose for complex operations

**FP_SINGLE_RESPONSIBILITY_001** - One responsibility per unit
- Applies to modules, components, functions, types, constants

### Error Handling

**FP_MONADIC_RETURNS_001** - Return Result or Validation
- Result: fail-fast sequential
- Validation: parallel error accumulation
- Maybe: optional values only

**FP_EITHER_BRANCHING_001** - Either for branching, not errors
- Two valid options, no implication of better
- Use Result for success/failure

### Performance Exceptions

**FP_GENERATOR_EXCEPTIONS_001** - Generators may use let/loops
- No Haskell equivalent; performance justified

**FP_GENERATOR_USAGE_001** - Selective laziness with generators
- Streaming, lazy evaluation, state machines
- Not for simple transforms

**FP_TOOLSMITH_EXCEPTIONS_001** - Toolsmith performance exceptions
- [EXCEPTION] or [OPTIMIZATION] Envoy comments required

**FP_VANILLA_INTERNAL_001** - Vanilla functions for internal use
- When inputs guarded and monads not needed

**FP_APPLICATION_USE_BOXED_001** - Applications use boxed functions
- Monadic error handling and composability

### Other Rules

**FP_NO_MAGIC_NUMBERS_001** - Named constants only
- All non-obvious numbers must be named

## TypeScript Rules

### Type Safety

**TS_ANY_007** - Never use any
- Use unknown or proper type definitions

**TS_UNK_008** - Unknown requires type guards
- Explicit checking before property access

**TS_TYP_003** - Explicit type annotations
- Always annotate parameters and return types

**TS_IMM_004** - Readonly types for immutability
- Use Readonly and ReadonlyArray

### Branded Types

**TS_BRT_002** - Branded types with __brand
- Prevent mixing semantically different values
- `type UserId = string & { readonly __brand: 'UserId' }`

**TS_BRT_009** - Smart constructor pattern
- Validate and return Result&lt;BrandedType, Error&gt;

**TS_BRT_010** - Unsafe constructor naming
- Prefix with 'unsafe' for validation bypass

**TS_BRT_011** - Unwrap function pattern
- Named functions to extract raw values

### Advanced Types

**TS_ADT_001** - Discriminated unions with _tag
- Type-safe variants with exhaustive matching

**TS_ERR_013** - Error type design
- Discriminated unions for error categories

**TS_ADV_005** - Type-level programming
- Mapped types, conditional types, template literals

**TS_NOM_015** - Nominal typing support
- Branded types + smart constructors

**TS_GEN_014** - Generic constraints
- Use extends clauses for requirements

**TS_FUN_012** - Function composition types
- Support currying, piping, composition

**TS_ARR_006** - Array&lt;T&gt; syntax consistency
- More explicit than T[]

## Toolsmith Rules

### Architecture

**TOOLSMITH_PERF_003** - Vanilla vs boxed functions
- Vanilla: internal, null returns, performance
- Boxed: public API, monadic, composable

**TOOLSMITH_PERF_001** - Performance exception permissions
- Array.push(), loops allowed with documentation

**TOOLSMITH_PERF_002** - Exception documentation
- [EXCEPTION] or [OPTIMIZATION] comments required

**TOOLSMITH_PERF_004** - Generator permissions
- let/loops allowed with [GENERATOR_EXCEPTION]

**TOOLSMITH_PERF_005** - Performance vs ideology
- [PERFORMANCE_OVER_IDEOLOGY] with benchmark data

**TOOLSMITH_PERF_006** - Math type implementations
- Four types: integer, bigint, float, precision
- Type-specific optimizations with [MATH_TYPE_OPTIMIZATION]

## Operator Substitutions

### Logical Operators

**SUBSTITUTE_NOT_001** - Use `not()` instead of `!`
- Easy to miss visually; explicit

**SUBSTITUTE_AND_001** - Use `and()` instead of `&&`
- Reads like English; null-safe

**SUBSTITUTE_OR_001** - Use `or()` instead of `||`
- Reads like English; null-safe

### Comparison Operators

**SUBSTITUTE_STRICT_EQUAL_001** - Use `isEqual()` instead of `===`
- Semantic, null-safe

**SUBSTITUTE_NOT_STRICT_EQUAL_001** - Use `isUnequal()` instead of `!==`
- Semantic, null-safe

**SUBSTITUTE_GT_001** - Use `gt()` instead of `>`
- greaterThan, null-safe

**SUBSTITUTE_LT_001** - Use `lt()` instead of `<`
- lessThan, null-safe

**SUBSTITUTE_GTE_001** - Use `gte()` instead of `>=`
- greaterThanOrEqual, null-safe

**SUBSTITUTE_LTE_001** - Use `lte()` instead of `<=`
- lessThanOrEqual, null-safe

### Math Operators

**SUBSTITUTE_ADD_INTEGER_CORRECTED_001** - Use `add()` for integers
- Path: @sitebender/toolsmith/math/integer/add/index.ts

**SUBSTITUTE_ADD_FLOAT_001** - Use `add()` for floats
- Path: @sitebender/toolsmith/math/float/add/index.ts

**SUBSTITUTE_SUBTRACT_001** - Use `subtract()` instead of `-`
- Type-specific paths: integer/bigint/float/precision

**SUBSTITUTE_MULTIPLY_001** - Use `multiply()` instead of `*`
- Type-specific paths: integer/bigint/float/precision

---

## Quick Reference by Priority

### Priority 10 (Blocking)

- No classes (ANTI_OOP_001)
- One function per file (FUNC_ONE_PER_FILE_001)
- No barrel files (IMPORT_NO_BARREL_001)
- All files named index.ts (FILE_NAMING_INDEX_001)
- Named functions only (FUNC_DECLARATION_001)
- Write like Haskell (RULE_FUNDAMENTAL_001)
- Never use any (TS_ANY_007)
- Use not() not ! (SUBSTITUTE_NOT_001)
- Use isEqual() not === (SUBSTITUTE_STRICT_EQUAL_001)

### Priority 9

- All functions curried (ANTI_NON_CURRIED_001)
- Use @sitebender aliases (IMPORT_DEFAULT_DIRECT_001)
- Folder hierarchy matches code (FILE_HIERARCHY_001)
- No abbreviations (NO_ABBREVIATIONS_001)
- Spaces around operators (STYLE_OPERATOR_SPACING_001)
- Pure functions (FP_PURE_EXCEPT_IO_001)
- Immutable data (FP_IMMUTABILITY_001)
- Function composition (FP_COMPOSITION_001)
- Branded types (TS_BRT_002)
- Explicit type annotations (TS_TYP_003)

### Priority 8

- Multiple other important rules across categories

### Priority 7

- Supporting and advisory rules
