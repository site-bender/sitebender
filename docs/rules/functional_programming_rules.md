# Functional Programming Rules

## All data structures must be immutable

- **Description**: All data structures must be immutable. Use const, ReadonlyArray<T>, Readonly<T>. Use freeze/deepFreeze via Toolsmith for runtime immutability
- **Rule ID**: FP_IMMUTABILITY_001
- **Category**: functional_programming
- **Priority**: 10
- **Reason**: Immutability eliminates entire classes of bugs related to unexpected state changes, makes code easier to reason about
- **Consequences**: Mutable state creates race conditions, debugging nightmares, and lost data
- **Philosophy**: Data flows through transformations, it doesn't mutate
- **Examples**:
  - Correct: const newArr = [...oldArr, newItem]; const frozen = freeze(obj)
  - Wrong: arr.push(newItem); obj.property = newValue
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Application libraries must use Toolsmith boxed functions

- **Description**: Application libraries must use Toolsmith boxed functions and return monads
- **Rule ID**: FP_APPLICATION_USE_BOXED_001
- **Category**: functional_programming
- **Priority**: 10
- **Reason**: Boxed functions provide monadic error handling and composability for application code
- **Consequences**: Using vanilla functions in applications loses error accumulation and monadic composition
- **Philosophy**: Application code should be monadic, Toolsmith internals can be optimized
- **Context**:
  - Libraries:
    1. pagewright
    2. architect
    3. operator
    4. custodian
  - Usage: application_development
- **Examples**:
  - Correct: import validateEmail from '@sitebender/toolsmith/boxed/validation/validateEmail/index.ts'
  - Wrong: import validateEmail from '@sitebender/toolsmith/vanilla/validation/validateEmail/index.ts'
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Return Result<T,E> or Validation<T,E>

- **Description**: Return Result<T,E> for sequential fail-fast operations or Validation<T,E> for parallel error accumulation. Prefer these over Maybe<T> for error handling
- **Rule ID**: FP_MONADIC_RETURNS_001
- **Category**: functional_programming
- **Priority**: 10
- **Reason**: Result provides fail-fast sequential processing, Validation accumulates all errors for comprehensive feedback
- **Consequences**: Using Maybe for errors loses important error information
- **Philosophy**: Error handling should be explicit and contextually appropriate
- **Examples**:
  - Result: validateUser(data) // stops at first validation error
  - Validation: validateForm(fields) // collects all field errors
- **Note**: Maybe<T> acceptable for optional values, but usually we expect to handle errors
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Toolsmith may use performance exceptions

- **Description**: Toolsmith may use performance exceptions with [EXCEPTION] or [OPTIMIZATION] Envoy comments when ideology conflicts with performance requirements
- **Rule ID**: FP_TOOLSMITH_EXCEPTIONS_001
- **Category**: functional_programming
- **Priority**: 9
- **Reason**: Toolsmith is the foundation library - performance optimizations justify pragmatic exceptions to pure FP rules
- **Consequences**: Performance bottlenecks in Toolsmith affect all dependent libraries
- **Philosophy**: Pragmatic performance over ideological purity when building foundations
- **Context**:
  - Libraries:
    1. toolsmith
  - Usage: performance_critical
- **Examples**:
  - Exception: //++ [EXCEPTION] Using .push() on new array for performance
  - Optimization: //++ [OPTIMIZATION] Loop approved for O(n) vs O(n²) functional approach
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Build complex operations by composing simple functions

- **Description**: Build complex operations by composing simple, focused functions. Use pipe for left-to-right composition, compose for right-to-left
- **Rule ID**: FP_COMPOSITION_001
- **Category**: functional_programming
- **Priority**: 9
- **Reason**: Composition enables building sophisticated behavior from simple, well-tested building blocks
- **Consequences**: Monolithic functions are hard to test, understand, and reuse
- **Philosophy**: Complex behavior emerges from simple function composition
- **Examples**:
  - Correct: pipe(numbers, filter(isEven), map(double), reduce(add, 0))
  - Wrong: function processNumbers(nums) { /* complex monolithic implementation */ }
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Write TypeScript as if you were writing Haskell

- **Description**: Write TypeScript, to the extent possible, as if you were writing Haskell
- **Rule ID**: RULE_FUNDAMENTAL_001
- **Category**: functional_programming
- **Priority**: 10
- **Reason**: Haskell is the most beautiful language ever written. FP is proven better for reduced cognitive load, fewer bugs, and better parallel processing
- **Consequences**: Writing imperative/OOP style creates massive technical debt and blocks progress for weeks
- **Philosophy**: Functional programming is not opinion - it's mathematically superior
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## NO MAGIC NUMBERS

- **Description**: NO MAGIC NUMBERS. All non-obvious numbers must be named constants with descriptive names in SCREAMING_SNAKE_CASE
- **Rule ID**: FP_NO_MAGIC_NUMBERS_001
- **Category**: functional_programming
- **Priority**: 9
- **Reason**: Magic numbers are meaningless. Named constants explain WHY that value exists
- **Consequences**: Magic numbers create mystery meat code that's impossible to understand or maintain
- **Philosophy**: Every number should have semantic meaning
- **Examples**:
  - Magic Numbers: if (retries > 3) { ... } setTimeout(callback, 5000)
  - Named Constants: const MAX_RETRIES = 3; const POLLING_INTERVAL_MS = 5000; const ADDITIVE_IDENTITY = 0; const MULTIPLICATIVE_IDENTITY = 1
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Generator functions may use let/loops internally

- **Description**: Generator functions may use let/loops internally for performance - no Haskell equivalent exists
- **Rule ID**: FP_GENERATOR_EXCEPTIONS_001
- **Category**: functional_programming
- **Priority**: 8
- **Reason**: Generators have no functional equivalent in Haskell. Performance and memory efficiency require imperative implementation
- **Consequences**: Forcing functional patterns on generators creates performance bottlenecks and memory issues
- **Philosophy**: When language features have no functional equivalent, pragmatic implementation is acceptable
- **Examples**:
  - Correct: function* generateSequence() { let i = 0; while (i < limit) { yield i++ } }
  - Context: Internal let/while acceptable in generators only
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Single Responsibility Principle

- **Description**: Single Responsibility Principle applies to modules, components, functions, types, and constants - each does ONE thing (Occam's Razor)
- **Rule ID**: FP_SINGLE_RESPONSIBILITY_001
- **Category**: functional_programming
- **Priority**: 10
- **Reason**: Things that do multiple things are impossible to test, reuse, or understand. Simplicity reduces cognitive load
- **Consequences**: Multi-responsibility code becomes tangled spaghetti that breaks when you change anything
- **Philosophy**: Do not needlessly complicate things - Occam's Razor in action
- **Examples**:
  - Correct: validateUser() only validates, saveUser() only saves, then compose them
  - Wrong: processUser() that validates AND transforms AND saves - too many responsibilities
- **Scope**:
  1. modules
  2. components
  3. functions
  4. types
  5. constants
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Functions must be pure except for isolated I/O operations

- **Description**: Functions must be pure except for isolated I/O operations - same inputs produce same outputs, no side effects
- **Rule ID**: FP_PURE_EXCEPT_IO_001
- **Category**: functional_programming
- **Priority**: 10
- **Reason**: Purity enables equational reasoning, makes testing trivial, and allows safe memoization and parallelization
- **Consequences**: Impure functions create unpredictable behavior and testing nightmares
- **Philosophy**: Pure functions are mathematical - predictable and composable
- **Exception**: I/O operations isolated to specific boundary functions
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Vanilla functions for internal use

- **Description**: Vanilla functions for internal use where inputs are carefully guarded and monadic error handling not needed
- **Rule ID**: FP_VANILLA_INTERNAL_001
- **Category**: functional_programming
- **Priority**: 8
- **Reason**: Vanilla functions are more performant when inputs are guaranteed valid and error collection unnecessary
- **Consequences**: Using boxed functions internally adds unnecessary overhead
- **Philosophy**: Right tool for the right job - vanilla for trusted internal use, boxed for applications
- **Context**:
  - Libraries:
    1. toolsmith
  - Usage: internal_implementation
- **Examples**:
  - Correct: Internal helper that processes validated data can use vanilla functions
  - Wrong: Public API should always use boxed functions
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Use Either<L,R> for branching paths

- **Description**: Use Either<L,R> for branching paths (left/right, this/that) with no implication that one is better than the other. Not for error handling
- **Rule ID**: FP_EITHER_BRANCHING_001
- **Category**: functional_programming
- **Priority**: 8
- **Reason**: Either represents choice between two valid options, unlike Result which implies success/failure
- **Consequences**: Conflating Either with error handling misses its true purpose as a branching construct
- **Philosophy**: Either is for paths, Result is for outcomes
- **Examples**:
  - Correct: Either<DatabaseResult, CacheResult> - both are valid data sources
  - Wrong: Either<User, Error> - use Result<User, Error> instead
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx

## Use generators for streaming data

- **Description**: Use generators for streaming data, lazy evaluation, state machines, and custom iteration where memory efficiency matters. Unlike Haskell's default laziness, be selective - use lazy only where it provides real benefits
- **Rule ID**: FP_GENERATOR_USAGE_001
- **Category**: functional_programming
- **Priority**: 8
- **Reason**: Generators provide memory-efficient lazy evaluation for large data sets, infinite sequences, and expensive computations
- **Consequences**: Eager evaluation can cause memory issues with large data or unnecessary computation
- **Philosophy**: Selective laziness - use where it matters, not everywhere like Haskell
- **Examples**:
  - Good Uses: CSV file streaming, API pagination, infinite sequences, search with early termination, file system traversal
  - Avoid: Simple transformations, small data sets, debugging-sensitive code
- **Context**: Lexing/parsing in formulator, large data processing, infinite mathematical sequences
- **Applies To**:
  1. .ts
  2. .tsx
  3. .js
  4. .jsx
