# Toolsmith Rules

## Array.push() and loops permitted in Toolsmith internal utilities

- **Rule ID**: TOOLSMITH_PERF_001
- **Description**: Array.push() and loops permitted in Toolsmith internal utilities when performance critical, with mandatory [EXCEPTION] documentation
- **Keywords**: toolsmith, performance, exceptions, push, loops, mutation, optimization, internal, hot-path
- **Rationale**: Internal Toolsmith utilities require maximum performance. Imperative patterns permitted when justified and properly documented. ONLY in internal Toolsmith code, NEVER in application-level code.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using mutations without documentation:
function map<T, U>(items: Array<T>, fn: (item: T) => U): Array<U> {
	const result: Array<U> = []
	for (let i = 0; i < items.length; i++) {
		result.push(fn(items[i]))
	}
	return result
}

// Problems:
// - No [EXCEPTION] comment
// - No performance justification
// - Violates FP without documentation
```

*Reasoning*: Performance exceptions must be explicitly documented with rationale

**Required:**
```ts
// ✅ REQUIRED - Properly documented exception:
// [EXCEPTION] Using .push() for O(1) amortized vs O(n) functional concat in hot path
function _internalMap<T, U>(
	items: ReadonlyArray<T>,
	fn: (item: T) => U
): Array<U> {
	const result: Array<U> = []

	for (let i = 0; i < items.length; i++) {
		result.push(fn(items[i]))
	}

	return result
}
```

*Scope*: Internal Toolsmith utilities only - NEVER in pagewright, architect, operator, custodian, or application code

## Four math types with type-specific optimizations

- **Rule ID**: TOOLSMITH_PERF_006
- **Description**: Four math types (integer, bigint, float, precision) with identical signatures but type-specific optimizations for performance
- **Keywords**: toolsmith, math, types, optimization, integer, bigint, float, precision, performance
- **Rationale**: Different numeric types require different optimization strategies. Type-specific implementations provide maximum performance while maintaining mathematical correctness and consistent API across all four types.

**Prohibited:**
```ts
// ❌ PROHIBITED - Generic implementation without type-specific optimization:
export default function add(augend: number) {
	return function addToAugend(addend: number): number {
		// Generic approach - same for all types
		return augend + addend
	}
}

// Problems:
// - No type-specific optimization
// - Misses performance opportunities
// - No [MATH_TYPE_OPTIMIZATION] comment
```

*Reasoning*: Each math type should leverage its specific performance characteristics

**Required:**
```ts
// ✅ REQUIRED - Type-specific optimization:
// Path: /math/integer/add/index.ts
// [MATH_TYPE_OPTIMIZATION] Integer: Direct + operator for native performance
export default function add(augend: number) {
	return function addToAugend(addend: number): number {
		return augend + addend
	}
}

// Path: /math/precision/add/index.ts
// [MATH_TYPE_OPTIMIZATION] Precision: Using decimal.js for accurate floating point
import Decimal from 'decimal.js'

export default function add(augend: Decimal) {
	return function addToAugend(addend: Decimal): Decimal {
		return augend.plus(addend)
	}
}
```

*Scope*: Path structure: /math/{integer|bigint|float|precision}/ - identical signatures, optimized implementations

## Vanilla vs Boxed functions

- **Rule ID**: TOOLSMITH_PERF_003
- **Description**: Vanilla functions (performance, null returns) vs Boxed functions (monadic, composable) - choose based on internal vs public API
- **Keywords**: toolsmith, vanilla, boxed, performance, monads, api-design, result, validation
- **Rationale**: Vanilla functions maximize performance for internal hot paths by avoiding monadic overhead. Boxed functions provide safe composition for application code. Both serve different purposes.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using boxed in internal hot path:
// Path: /toolsmith/internal/_fastMap/index.ts
import { map } from '@sitebender/toolsmith/boxed/array/map'
import { success } from '@sitebender/toolsmith/monads/result'

function _fastMap<T, U>(
	items: ReadonlyArray<T>,
	fn: (item: T) => U
): Result<Array<U>, Error> {
	// Unnecessary Result wrapper in internal code
	return map(fn)(items)
}

// Problems:
// - Monadic overhead in hot path
// - Result wrapper not needed internally
// - Should use vanilla for performance
```

*Reasoning*: Internal utilities should use vanilla for performance; boxed for public APIs

**Required:**
```ts
// ✅ REQUIRED - Vanilla for internal, boxed for public:

// Internal utility (vanilla):
// Path: /toolsmith/vanilla/array/_internalMap/index.ts
export default function _internalMap<T, U>(
	items: ReadonlyArray<T>,
	fn: (item: T) => U
): Array<U> | null {
	if (!items || !fn) return null
	return items.map(fn)
}

// Public API (boxed):
// Path: /toolsmith/boxed/array/map/index.ts
import type { Result } from '@sitebender/toolsmith/types'
import { success, failure } from '@sitebender/toolsmith/monads/result'

export default function map<T, U>(fn: (item: T) => U) {
	return function mapWithFn(
		items: ReadonlyArray<T>
	): Result<Array<U>, Error> {
		if (!items) return failure(new Error('Invalid array'))
		return success(items.map(fn))
	}
}
```

*Scope*: Vanilla in /vanilla/* for internal use; boxed in standard paths for public API

## Exception documentation with Envoy comments

- **Rule ID**: TOOLSMITH_PERF_002
- **Description**: All performance exceptions must be documented with [EXCEPTION] or [OPTIMIZATION] Envoy comments explaining rationale
- **Keywords**: toolsmith, documentation, exceptions, optimization, envoy, comments, rationale
- **Rationale**: Performance exceptions must be tracked and justified. Envoy comments enable searching for all exceptions, ensure they remain justified, and document why functional principles were violated.

**Prohibited:**
```ts
// ❌ PROHIBITED - Exception without documentation:
function _buildArray<T>(items: ReadonlyArray<T>): Array<T> {
	const result: Array<T> = []

	// Using mutation but no comment explaining why
	for (const item of items) {
		result.push(item)
	}

	return result
}

// Problems:
// - Mutation without [EXCEPTION] comment
// - No performance rationale
// - Can't track why FP was violated
// - Future developers won't know if still needed
```

*Reasoning*: Every FP violation must be documented to track and justify exceptions

**Required:**
```ts
// ✅ REQUIRED - Proper exception documentation:

// Format 1: [EXCEPTION] for breaking FP principles
// [EXCEPTION] Using .push() for O(1) amortized vs O(n) functional concat
function _buildArray<T>(items: ReadonlyArray<T>): Array<T> {
	const result: Array<T> = []

	for (const item of items) {
		result.push(item)
	}

	return result
}

// Format 2: [OPTIMIZATION] for performance techniques
// [OPTIMIZATION] Direct property access instead of lens for 10x speedup in hot path
function _getValue<T>(obj: Record<string, T>, key: string): T | null {
	return obj[key] ?? null
}

// Required fields:
// 1. Clear rationale
// 2. Performance benefit
// 3. Scope (internal only)
// 4. Why alternatives insufficient
```

*Scope*: All Toolsmith internal utilities with FP violations

## Generator function exceptions

- **Rule ID**: TOOLSMITH_PERF_004
- **Description**: Generator functions granted exceptions for let bindings, loops, and mutable state due to lack of functional equivalent
- **Keywords**: toolsmith, generators, lazy-evaluation, exceptions, let, loops, mutation, yield, streaming
- **Rationale**: Generators provide lazy evaluation and memory efficiency impossible with pure functional approaches in TypeScript. No Haskell equivalent exists. Imperative patterns acceptable within generator scope when documented.

**Prohibited:**
```ts
// ❌ PROHIBITED - Generator without [GENERATOR_EXCEPTION] comment:
function* range(start: number, end: number) {
	// Using let and loops but no documentation
	let current = start

	while (current <= end) {
		yield current
		current++
	}
}

// Problems:
// - No [GENERATOR_EXCEPTION] comment
// - Imperative patterns undocumented
// - Unclear why functional approach insufficient
```

*Reasoning*: Generator exceptions must be documented even though they're generally permitted

**Required:**
```ts
// ✅ REQUIRED - Documented generator exceptions:

// [GENERATOR_EXCEPTION] Let binding and loop for memory-efficient iteration
function* range(start: number, end: number) {
	let current = start

	while (current <= end) {
		yield current
		current++
	}
}

// [GENERATOR_EXCEPTION] Mutable accumulators for infinite lazy sequence
function* fibonacci() {
	let [a, b] = [0, 1]

	while (true) {
		yield a
		;[a, b] = [b, a + b]
	}
}

// Permitted patterns:
// - let bindings for iteration state
// - while/for loops for control flow
// - Mutable counters within scope
// - Imperative yield logic
```

*Scope*: All generator functions in Toolsmith - imperative patterns must stay within generator scope

## Performance over ideology trade-offs

- **Rule ID**: TOOLSMITH_PERF_005
- **Description**: Performance wins over ideology when profiled, measured, documented, and scoped to Toolsmith internal utilities only
- **Keywords**: toolsmith, performance, ideology, trade-offs, profiling, optimization, hot-path, benchmarking
- **Rationale**: Toolsmith is the foundation library - performance bottlenecks here affect all dependent code. When profiling shows significant gains, pragmatic exceptions to FP are acceptable if properly justified and scoped.

**Prohibited:**
```ts
// ❌ PROHIBITED - Breaking FP without measurement:
// "I think this will be faster"
function _processItems<T>(items: Array<T>): void {
	// Mutating in place "for performance"
	for (let i = 0; i < items.length; i++) {
		items[i] = transform(items[i])
	}
}

// Problems:
// - No profiling done
// - No benchmark data
// - No [PERFORMANCE_OVER_IDEOLOGY] comment
// - Premature optimization
// - No functional alternative considered
```

*Reasoning*: Profile first, measure impact, then decide. Never break FP based on assumptions.

**Required:**
```ts
// ✅ REQUIRED - Measured performance decision:

// Decision process:
// 1. Profile first - identified bottleneck
// 2. Measure impact - benchmarked alternatives
// 3. Document rationale - explain tradeoff
// 4. Contain scope - internal only

// [PERFORMANCE_OVER_IDEOLOGY] Direct array mutation 50x faster than
// functional concat in benchmark with 10M elements. Hot path in
// map/filter/reduce operations. Functional approach: 2.3s, imperative: 0.046s
function _internalFlatMap<T, U>(
	items: ReadonlyArray<T>,
	fn: (item: T) => ReadonlyArray<U>
): Array<U> {
	const result: Array<U> = []

	for (let i = 0; i < items.length; i++) {
		const mapped = fn(items[i])
		for (let j = 0; j < mapped.length; j++) {
			result.push(mapped[j])
		}
	}

	return result
}
```

*Scope*: ONLY internal Toolsmith utilities - application code remains strictly functional
