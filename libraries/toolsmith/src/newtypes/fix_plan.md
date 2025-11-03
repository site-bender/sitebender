# Fix Plan for `libraries/toolsmith/src/newtypes`

## Relevant Rules to Follow

### Constitutional Rules (Non-Negotiable)

1. **No Mutations - Immutable Data Always**: All data must be immutable. Use `const`, `Readonly<T>`, `ReadonlyArray<T>`. Never use `let` for mutable variables.
2. **No Loops - Use map/filter/reduce from Toolsmith**: Never use for/while loops. Use functional array operations like `map`, `filter`, `reduce`.
3. **No Exceptions - Use Result<T,E> or Validation<T,E> Monads**: Never use try/catch/throw. Return error values using monads.
4. **All Functions Must Be Curried**: Every function must be curried for composition and partial application.
5. **One Function Per File - Single Responsibility**: Each file exports exactly ONE function (except curried inner functions).
6. **Pure Functions - Except Explicit IO Boundaries**: Functions must be pure (same input → same output, no side effects). IO functions marked with `// [IO]`.
7. **No Arrow Functions - Use function Keyword**: Never use arrow function syntax. Always use named function declarations.
8. **No Classes - Use Pure Functions Only**: Never use TypeScript classes. Use modules with exported pure functions.

### Syntax Rules

9. **Use semantic Toolsmith functions instead of operators**: Replace operators with semantic equivalents (e.g., `isEqual` not `===`, `length(arr)` not `arr.length`, `not(condition)` not `!`, `addInteger` not `+` for integers).
10. **Constants in SCREAMING_SNAKE_CASE**: Constants in constants/index.ts, exported as named exports.
11. **Functions camelCase, Components PascalCase**: Consistent naming conventions.
12. **Explicit Type Annotations**: Always annotate function parameters and return types.

### Functional Programming Rules

13. **Return Result<T,E> for sequential fail-fast operations**: Use Result for operations that stop at first error.
14. **Smart Constructor Pattern**: Validate input and return Result<BrandedType, Error>.
15. **Branded Types with __brand**: Use intersection types with unique brands for nominal typing.

### Toolsmith Rules

16. **Performance Exceptions**: Allowed with [EXCEPTION] or [OPTIMIZATION] Envoy comments when ideology conflicts with performance.
17. **Vanilla vs Boxed Functions**: Use vanilla for internal performance-critical use, boxed for application consumption.

## Fix Batches

### Batch 1: Fix Exception Usage

**Files**: `libraries/toolsmith/src/newtypes/webTypes/iri/unwrapIri/index.ts`

**Changes**:

- Replace `throw new TypeError(...)` with `return error({ _tag: 'ErrorType', message: '...' })`
- Update function signature to return `Result<T, E>` instead of throwing

**Checklist**:

- [ ] Modify unwrapIri to return Result instead of throwing
- [ ] Update all callers of unwrapIri to handle Result
- [ ] Run all tests: `deno task test`
- [ ] Run linter: `deno task lint`
- [ ] Run type check: `deno check` (only for this library)
- [ ] Update this checklist

### Batch 2: Fix Operator Usage in Math Operations

**Files**: `libraries/toolsmith/src/newtypes/numericTypes/integer/addInteger/index.ts` (and similar for other math ops)

**Changes**:

- Since this is the base implementation of addInteger, using `+` is acceptable as the primitive operation
- Add [EXCEPTION] comment: `// [EXCEPTION] Using native + operator as base implementation for addInteger`
- Ensure all other uses of `+` in the codebase use `addInteger` instead

**Checklist**:

- [ ] Add [EXCEPTION] comment to addInteger implementation
- [ ] Audit all other files for `+` usage and replace with semantic functions where applicable
- [ ] Run all tests: `deno task test`
- [ ] Run linter: `deno task lint`
- [ ] Run type check: `deno check` (only for this library)
- [ ] Update this checklist

### Batch 3: Fix Mutations in URI Parsing (Part 1)

**Files**: `libraries/toolsmith/src/newtypes/webTypes/uri/index.ts`

**Changes**:

- Replace `let` variables with immutable approaches using recursion or functional composition
- Use `reduce` or `map` instead of mutable loops
- Add [EXCEPTION] comments if performance requires mutable state: `// [EXCEPTION] Using let for parsing performance in URI validation`

**Checklist**:

- [ ] Refactor URI parsing to avoid `let` variables
- [ ] Replace `for` loops with functional operations
- [ ] Add performance exception comments if needed
- [ ] Run all tests: `deno task test`
- [ ] Run linter: `deno task lint`
- [ ] Run type check: `deno check` (only for this library)
- [ ] Update this checklist

### Batch 4: Fix Mutations in URI Parsing (Part 2)

**Files**: `libraries/toolsmith/src/newtypes/webTypes/uri/_isUri/index.ts`, `libraries/toolsmith/src/newtypes/webTypes/uri/_normalizeUri/index.ts`, `libraries/toolsmith/src/newtypes/webTypes/uri/_validateAuthority/index.ts`

**Changes**:

- Same as Batch 3: eliminate `let` and loops
- Use functional parsing approaches

**Checklist**:

- [ ] Refactor each file to avoid mutations
- [ ] Replace loops with functional operations
- [ ] Add exception comments if performance-critical
- [ ] Run all tests: `deno task test`
- [ ] Run linter: `deno task lint`
- [ ] Run type check: `deno check` (only for this library)
- [ ] Update this checklist

### Batch 5: Fix Mutations in IRI Parsing

**Files**: `libraries/toolsmith/src/newtypes/webTypes/iri/index.ts`, `libraries/toolsmith/src/newtypes/webTypes/iri/_validateIriAuthority/index.ts`

**Changes**:

- Same as previous batches: functional parsing without mutations

**Checklist**:

- [ ] Refactor IRI parsing functions
- [ ] Eliminate `let` and loops
- [ ] Run all tests: `deno task test`
- [ ] Run linter: `deno task lint`
- [ ] Run type check: `deno check` (only for this library)
- [ ] Update this checklist

### Batch 6: Fix Mutations in IPv6 Parsing

**Files**: `libraries/toolsmith/src/newtypes/webTypes/ipv6Address/_normalizeIpv6Address/index.ts`, `libraries/toolsmith/src/newtypes/webTypes/ipv6Address/_parseIpv6Address/index.ts`

**Changes**:

- Refactor complex parsing logic to use functional approaches
- Use recursion or higher-order functions instead of loops
- Add performance exceptions if necessary

**Checklist**:

- [ ] Refactor IPv6 normalization and parsing
- [ ] Replace mutable state with functional patterns
- [ ] Run all tests: `deno task test`
- [ ] Run linter: `deno task lint`
- [ ] Run type check: `deno check` (only for this library)
- [ ] Update this checklist

### Batch 7: Fix Remaining Loops and Mutations

**Files**: `libraries/toolsmith/src/newtypes/webTypes/ipv4Address/index.ts` and any remaining files

**Changes**:

- Final cleanup of any remaining `let` variables and loops
- Ensure all parsing uses functional patterns

**Checklist**:

- [ ] Audit all remaining files for violations
- [ ] Apply functional refactoring
- [ ] Run all tests: `deno task test`
- [ ] Run linter: `deno task lint`
- [ ] Run type check: `deno check` (only for this library)
- [ ] Update this checklist

### Batch 8: Final Verification

**Changes**:

- Run comprehensive audit to ensure all rules are followed
- Verify no regressions in functionality

**Checklist**:

- [ ] Run full test suite
- [ ] Run linter on entire library
- [ ] Run type check
- [ ] Manual code review for rule compliance
- [ ] Update this checklist

## Completion Criteria for Each Batch

- All tests pass (`deno task test`)
- Linter passes (`deno task lint`)
- Type check passes (`deno check` for this library only)
- This checklist is updated with completion status

No batch is considered complete until ALL criteria are met.
