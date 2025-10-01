# Boxed Functions Usage Examples

Demonstrating how monadic (boxed) functions work in practice.

## Negate (Unary Function)

```typescript
import negate from "./math/negate/index.ts"
import ok from "../monads/result/ok/index.ts"
import error from "../monads/result/error/index.ts"
import success from "../monads/validation/success/index.ts"
import failure from "../monads/validation/failure/index.ts"
import isOk from "../monads/result/isOk/index.ts"
import getOrElse from "../monads/result/getOrElse/index.ts"

// Plain values default to Result
const result1 = negate(5)
// { _tag: "Ok", value: -5 }

if (isOk(result1)) {
	console.log(getOrElse(0)(result1)) // -5
}

// Works with Result monad
const result2 = negate(ok(10))
// { _tag: "Ok", value: -10 }

// Errors propagate
const result3 = negate(error("invalid input"))
// { _tag: "Error", error: "invalid input" }

// Works with Validation monad
const result4 = negate(success(7))
// { _tag: "Valid", value: -7 }

// Validations propagate
const result5 = negate(failure(["not a number"]))
// { _tag: "Invalid", errors: ["not a number"] }

// Involutive property - double negation is identity
const result6 = negate(negate(5))
// { _tag: "Ok", value: 5 }
```

## Add (Binary Function)

```typescript
import add from "./math/add/index.ts"
import ok from "../monads/result/ok/index.ts"
import error from "../monads/result/error/index.ts"
import success from "../monads/validation/success/index.ts"
import failure from "../monads/validation/failure/index.ts"

// Plain values default to Result
const result1 = add(2)(3)
// { _tag: "Ok", value: 5 }

// Currying works naturally
const add5 = add(5)
const result2 = add5(10)
// { _tag: "Ok", value: 15 }

// Result monad propagation
const result3 = add(ok(2))(ok(3))
// { _tag: "Ok", value: 5 }

const result4 = add(error("bad"))(ok(3))
// { _tag: "Error", error: "bad" }

// Validation monad propagation AND error accumulation
const result5 = add(success(2))(success(3))
// { _tag: "Valid", value: 5 }

const result6 = add(failure(["e1"]))(failure(["e2"]))
// { _tag: "Invalid", errors: ["e1", "e2"] }  // Both errors accumulated!

// Validation "wins" - if ANY input is Validation, output is Validation
const result7 = add(ok(2))(success(3))
// { _tag: "Valid", value: 5 }  // Result + Validation = Validation

const result8 = add(success(2))(10)
// { _tag: "Valid", value: 12 }  // Validation + plain = Validation

// Works in pipelines
import pipe from "../pipe/index.ts"

const result9 = pipe(
	10,
	add(5),      // Result.Ok(15)
	add(3),      // Result.Ok(18)
	negate       // Result.Ok(-18)
)
// { _tag: "Ok", value: -18 }

// Validation propagates through pipeline
const result10 = pipe(
	success(10),
	add(5),      // Validation.Valid(15)
	add(3),      // Validation.Valid(18)
	negate       // Validation.Valid(-18)
)
// { _tag: "Valid", value: -18 }
```

## Multiply (Binary Function)

```typescript
import multiply from "./math/multiply/index.ts"
import ok from "../monads/result/ok/index.ts"
import success from "../monads/validation/success/index.ts"

// Plain values
const result1 = multiply(2)(3)
// { _tag: "Ok", value: 6 }

// Currying for partial application
const double = multiply(2)
const triple = multiply(3)

const result2 = double(10)
// { _tag: "Ok", value: 20 }

const result3 = triple(10)
// { _tag: "Ok", value: 30 }

// Composition
const result4 = triple(double(5))
// { _tag: "Ok", value: 30 }

// With Validation monad
const result5 = multiply(success(2))(success(3))
// { _tag: "Valid", value: 6 }

// Mixed monads - Validation wins
const result6 = multiply(ok(2))(success(3))
// { _tag: "Valid", value: 6 }

// In a pipeline
import pipe from "../pipe/index.ts"

const result7 = pipe(
	5,
	double,      // 10
	triple,      // 30
	negate       // -30
)
// { _tag: "Ok", value: -30 }
```

## Key Takeaways

1. **Zero cognitive overhead** - Same interface as vanilla functions
2. **Automatic monad handling** - Plain values wrap in Result.Ok
3. **Validation wins** - If any input is Validation, output is Validation
4. **Error accumulation** - Validation collects ALL errors, not just first
5. **Currying preserved** - Partial application works naturally
6. **Pipeline friendly** - Monad type propagates through composition
7. **Type-safe** - TypeScript knows the return types

## Anti-Patterns to Avoid

```typescript
// ❌ DON'T reach into the monad
const result = add(2)(3)
console.log(result.value)  // DON'T DO THIS!

// ✅ DO use the public API
import getOrElse from "../monads/result/getOrElse/index.ts"
const value = getOrElse(0)(result)  // CORRECT
