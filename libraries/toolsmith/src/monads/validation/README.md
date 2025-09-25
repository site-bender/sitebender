# Validation (reference module)

Minimal, composable validation primitives with great TypeScript inference. This folder is the reference for style, tests, and docs patterns across the toolsmith.

- Curried, inference-first helpers (map, chain, fold, …)
- Typed error accumulation with NonEmptyArray<ValidationError>
- Boolean type guards: isValid / isInvalid
- Pure, data-first, tree-shakable utilities (no barrel files)

## Types

- `Validation<E, A>` = `Valid<A>` | `Invalid<E>`
- `Valid<A>`: `{ _tag: "Valid"; value: A }`
- `Invalid<E>`: `{ _tag: "Invalid"; errors: NonEmptyArray<E> }`
- `ValidationError`: `{ field: string; messages: string[] }`

## Design guidelines

- Curried API: favor signatures that infer from left to right.
- Fail-fast vs. accumulate: use chain for dependent steps; validateAll/combineValidations for collecting all errors.
- Keep errors structured (field + messages) and always NonEmptyArray when Invalid.
- No barrel files; import only what you need by path for maximal tree-shaking.

## Quick start

```ts
import createValidator from "./createValidator/index.ts"
import chain from "./chain/index.ts"
import fold from "./fold/index.ts"
import { expect } from "@std/expect"

const isAdult = createValidator((age: number) => age >= 18)((age) => ({
	field: "age",
	messages: [`Age ${age} is too young`],
}))

const result = chain(isAdult)({ _tag: "Valid", value: 21 })

const message = fold<number, string>((n) => `ok:${n}`)<
	{ field: string; messages: string[] }
>((errs) => `errors:${errs.length}`)(result)

expect(message).toBe("ok:21")
```

## When to use what

- map(fn): transform the Valid value only.
- chain(fn): run another validation that depends on the previous Valid value (fail-fast).
- fold(onValid)(onInvalid): exhaustively handle both branches into a single result.
- getOrElse(default): extract value or return default when Invalid.
- orElse(alt): keep Valid as-is; replace Invalid with an alternative Validation.
- bimap(onInvalid)(onValid): transform both branches in one go.
- mapErrors(fn): transform only errors (preserve NonEmptyArray).

### Accumulating errors

- validateAll(validators)(value): apply many validators to one value; returns Valid when all pass or Invalid with all errors.
- combineValidations([v1, v2, …]): combine multiple ValidationResults; returns Invalid with all errors if none are valid; otherwise returns the last Valid value.
- combineErrors/groupByField: helpers to merge errors by field and concatenate messages in-place when you need a compact shape.

## Type guards

Use these to safely narrow in control flow and array combinators.

```ts
import isValid from "./isValid/index.ts"
import isInvalid from "./isInvalid/index.ts"

const xs = [valid(1), invalid([{ field: "n", messages: ["bad"] }]), valid(2)]
const goods = xs.filter(isValid) // Array<Valid<number>>
const bads = xs.filter(isInvalid) // Array<Invalid<ValidationError>>
```

## Import paths (no barrels)

Import only what you need directly by file path to keep bundles lean and tree-shakable.

```ts
import map from "./map/index.ts"
import chain from "./chain/index.ts"
import fold from "./fold/index.ts"
import createValidator from "./createValidator/index.ts"
import validateAll from "./validateAll/index.ts"
import combineValidations from "./combineValidations/index.ts"
import isValid from "./isValid/index.ts"
import isInvalid from "./isInvalid/index.ts"
```

## Notes

- Examples inside source files use Envoy’s pipe-prefixed doc comment style (`|`) for clarity and consistency.
- If you need all failure reasons, prefer validateAll/combineValidations over chain.
- Keep error messages user-facing at the edge; core validators should be deterministic and pure.

## Testing and roadmap

For now, tests in this folder are handwritten unit tests using Deno.test and std expect. Where helpful, we may add targeted property-based tests (e.g., functor/monad laws).

This is a temporary measure. Once the Auditor library is ready, it will synthesize and maintain the full test suites for the Toolsmith and the rest of the codebase (including itself). The plan is to remove all handwritten tests (unit, property, integration) in favor of Auditor-generated tests. Any remaining manual tests would serve only as supplemental safety harnesses around the generated proofs/tests.
