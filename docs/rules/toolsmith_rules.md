# Toolsmith Rules

## Performance Exception Permissions

- **Description**: TOOLSMITH_PERF_001: Performance Exception Permissions - Array.push() and loops are permitted in Toolsmith library functions when performance is critical. Internal utility functions may use imperative patterns for optimization, specifically: (1) .push() operations on newly created arrays for building results, (2) for/while loops in performance-critical sections, (3) let bindings for iteration variables in generators. These exceptions are ONLY allowed in internal Toolsmith utilities, not in application-level code. All such exceptions must be documented with [EXCEPTION] or [OPTIMIZATION] Envoy comments explaining the performance rationale. Example: `// [EXCEPTION] Using .push() for O(1) amortized performance in hot path`
- **Rule ID**: TOOLSMITH_PERF_001
- **Category**: toolsmith
- **Priority**: 8
- **Scope**: internal_utilities
- **Type**: performance_exception
- **Documentation Required**: true
- **Examples**:
  1. // [EXCEPTION] Using .push() for O(1) amortized performance
  2. // [OPTIMIZATION] Loop-based iteration for hot path performance

## Math Type Implementation Guidelines

- **Description**: TOOLSMITH_PERF_006: Math Type Implementation Guidelines - Toolsmith library implements four math types (integer, bigint, float, precision) with same function names but different internal optimization paths for maximum performance. Implementation patterns: (1) Type-specific optimizations allowed with [MATH_TYPE_OPTIMIZATION] comments, (2) Direct numeric operations for integer/float types bypass generic number handling, (3) BigInt-specific algorithms may use different computational approaches, (4) Precision types may employ specialized decimal arithmetic libraries. Path structure: /math/integer/, /math/bigint/, /math/float/, /math/precision/ with identical function signatures but optimized implementations. Performance exceptions permitted: native arithmetic operators, type-specific algorithms, optimized comparison functions. All type-specific optimizations must document performance benefit and maintain mathematical correctness across all four type implementations.
- **Rule ID**: TOOLSMITH_PERF_006
- **Category**: toolsmith
- **Priority**: 8
- **Scope**: math_types
- **Type**: type_optimization
- **Math Types**:
  1. integer
  2. bigint
  3. float
  4. precision
- **Path Structure**: /math/{type}/
- **Comment Format**: [MATH_TYPE_OPTIMIZATION]
- **Permitted Optimizations**:
  1. native_arithmetic
  2. type_specific_algorithms
  3. optimized_comparisons
- **Requirements**:
  1. performance_benefit
  2. mathematical_correctness
  3. consistent_signatures
- **Examples**:
  1. // [MATH_TYPE_OPTIMIZATION] Integer: Direct + operator vs generic add() for 10x performance
  2. // [MATH_TYPE_OPTIMIZATION] Precision: Using decimal.js library for accurate floating point math

## Vanilla vs Boxed Function Guidelines

- **Description**: TOOLSMITH_PERF_003: Vanilla vs Boxed Function Guidelines - Toolsmith library provides two function variants: vanilla functions for internal performance-critical use, and boxed functions for application consumption. Vanilla functions: (1) Return null for error conditions to avoid Result/Validation overhead, (2) Use direct values and primitive returns for maximum performance, (3) May employ performance exceptions documented with Envoy comments, (4) Located in /vanilla/* paths for internal use only. Boxed functions: (1) Return Result or Validation monads for proper error handling, (2) Compose with other monadic operations safely, (3) Follow strict functional programming patterns, (4) Located in standard paths for public API consumption. Choose vanilla for hot paths and internal utilities, boxed for application-facing APIs and composable operations.
- **Rule ID**: TOOLSMITH_PERF_003
- **Category**: toolsmith
- **Priority**: 8
- **Scope**: function_architecture
- **Type**: api_design
- **Vanilla Characteristics**:
  1. null_returns
  2. primitive_values
  3. performance_exceptions
  4. internal_use
- **Boxed Characteristics**:
  1. monadic_returns
  2. composable
  3. strict_fp
  4. public_api
- **Examples**:
  1. // Vanilla: const add = (a, b) => typeof a !== 'number' ? null : a + b
  2. // Boxed: const add = (a, b) => isNumber(a) && isNumber(b) ? Success(a + b) : Failure('Invalid input')

## Exception Documentation Standards

- **Description**: TOOLSMITH_PERF_002: Exception Documentation Standards - All performance exceptions in Toolsmith library must be documented using specific Envoy comment formats. Use [EXCEPTION] for breaking functional programming principles due to performance needs, and [OPTIMIZATION] for performance-focused implementations that maintain functional patterns. Format: `// [EXCEPTION] Reason: specific justification for breaking FP rules` or `// [OPTIMIZATION] Reason: performance technique being used`. Documentation must include: (1) Clear rationale for the exception, (2) Performance benefit being achieved, (3) Scope limitation (internal only), (4) Alternative approaches considered. These comments enable tracking performance exceptions across the codebase and ensure they remain justified and documented.
- **Rule ID**: TOOLSMITH_PERF_002
- **Category**: toolsmith
- **Priority**: 9
- **Scope**: documentation
- **Type**: exception_documentation
- **Comment Formats**:
  1. [EXCEPTION]
  2. [OPTIMIZATION]
- **Required Fields**:
  1. rationale
  2. performance_benefit
  3. scope
  4. alternatives
- **Examples**:
  1. // [EXCEPTION] Reason: Using mutable array.push() for O(1) vs O(n) functional concat
  2. // [OPTIMIZATION] Reason: Direct property access instead of lens traversal for hot path

## Generator Function Development Permissions

- **Description**: TOOLSMITH_PERF_004: Generator Function Development Permissions - Generator functions in Toolsmith library are granted special exceptions to functional programming constraints due to their unique nature and lack of Haskell equivalent. Permitted patterns in generators: (1) let bindings for iteration state management, (2) while/for loops for iteration control, (3) Mutable counters and accumulators within generator scope, (4) Imperative yield logic for performance-critical streaming operations. Rationale: Generators provide lazy evaluation and memory efficiency impossible with pure functional approaches in TypeScript. All imperative patterns must be contained within the generator function scope and documented with [GENERATOR_EXCEPTION] comments. Generator implementations should still prefer functional approaches where performance allows, but performance wins when justified.
- **Rule ID**: TOOLSMITH_PERF_004
- **Category**: toolsmith
- **Priority**: 7
- **Scope**: generator_functions
- **Type**: generator_exceptions
- **Permitted Patterns**:
  1. let_bindings
  2. loops
  3. mutable_counters
  4. imperative_yield
- **Comment Format**: [GENERATOR_EXCEPTION]
- **Rationale**: no_haskell_equivalent
- **Examples**:
  1. function* range(start, end) { // [GENERATOR_EXCEPTION] Let binding for iteration
  let current = start;
  while (current <= end) yield current++;
}
  2. function* fibonacci() { // [GENERATOR_EXCEPTION] Mutable accumulators for performance
  let [a, b] = [0, 1];
  while (true) { yield a; [a, b] = [b, a + b]; }
}

## Performance vs Ideology Trade-offs

- **Description**: TOOLSMITH_PERF_005: Performance vs Ideology Trade-offs - In Toolsmith library development, performance considerations override strict functional programming ideology when justified and documented. Performance wins in these scenarios: (1) Hot path operations where functional approaches create measurable overhead, (2) Memory-intensive operations where immutable patterns cause excessive allocation, (3) Iteration-heavy algorithms where functional composition creates call stack issues, (4) Type system boundaries where monadic wrapping adds significant runtime cost. Decision criteria: Profile first, measure impact, document rationale, contain scope to internal utilities only. All performance-over-ideology decisions must include [PERFORMANCE_OVER_IDEOLOGY] comments with benchmark data or clear performance reasoning. Application-level code maintains strict functional patterns - these exceptions apply only to internal Toolsmith utilities.
- **Rule ID**: TOOLSMITH_PERF_005
- **Category**: performance
- **Priority**: 9
- **Scope**: internal_utilities
- **Type**: performance_trade_offs
- **Performance Scenarios**:
  1. hot_path
  2. memory_intensive
  3. iteration_heavy
  4. type_boundaries
- **Decision Process**:
  1. profile_first
  2. measure_impact
  3. document_rationale
  4. contain_scope
- **Comment Format**: [PERFORMANCE_OVER_IDEOLOGY]
- **Examples**:
  1. // [PERFORMANCE_OVER_IDEOLOGY] Direct array mutation 50x faster than functional concat in 10M element test
  2. // [PERFORMANCE_OVER_IDEOLOGY] Avoiding Result wrapper reduces memory allocation by 60% in tight loop
