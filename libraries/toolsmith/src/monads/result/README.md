# Result

A tagged success/error type similar to Rust’s `Result`. Good for rich error tagging without accumulation. For accumulating many errors, use Validation.

- Curried, inference-first helpers
- Constructors: ok, err
- Type guards: isOk / isErr
- Pure, data-first, tree-shakable utilities (no barrel files)

## Types

- `Result<E, A>` = `Ok<A>` | `Err<E>`
- `Ok<A>`: `{ _tag: "Ok"; value: A }`
- `Err<E>`: `{ _tag: "Err"; error: E }`

## Design guidelines

- Prefer explicit, tagged error types for `E`.
- Fail-fast semantics: chain stops on Err.
- No barrel files; import only what you need by path for maximal tree-shaking.

## Quick start

```ts
import ok from "./ok/index.ts"
import err from "./err/index.ts"
import chain from "./chain/index.ts"
import fold from "./fold/index.ts"
import mapErr from "./mapErr/index.ts"
import tryCatch from "./tryCatch/index.ts"
import { expect } from "@std/expect"

type AppError = { tag: "Parse"; msg: string } | { tag: "Domain"; msg: string }

const parse = tryCatch((s: string) => JSON.parse(s) as { n: number })((
	e,
) => ({ tag: "Parse", msg: String(e) } as AppError))

const r = chain((
	o: { n: number },
) => (o.n > 0 ? ok(o.n) : err({ tag: "Domain", msg: "> 0" } as AppError)))(
	parse('{"n":1}'),
)

const out = fold<number, string, AppError>((n) => `ok:${n}`)((e) =>
	`err:${e.tag}`
)(r)
expect(out).toBe("ok:1")

const withTag = mapErr((e: AppError) => ({ ...e, code: "E_APP" }))(
	err({ tag: "Domain", msg: "no" } as AppError),
)
expect(withTag).toEqual({
	_tag: "Err",
	error: { tag: "Domain", msg: "no", code: "E_APP" },
})
```

## When to use what

- map(fn): transform the Ok value only.
- chain(fn): dependent computation on Ok (fail-fast).
- fold(onOk)(onErr): handle both branches.
- getOrElse(default): extract Ok or default on Err.
- orElse(alt): replace Err with alternative Result.
- bimap(onErr)(onOk): transform both branches.
- mapErr(fn): transform only Err.
- tryCatch(f)(onError): wrap exceptions into Err.

## Type guards

```ts
import isOk from "./isOk/index.ts"
import isErr from "./isErr/index.ts"

const xs = [ok(1), err({ tag: "bad" }), ok(2)]
const goods = xs.filter(isOk)
const bads = xs.filter(isErr)
```

## Import paths (no barrels)

```ts
import map from "./map/index.ts"
import chain from "./chain/index.ts"
import fold from "./fold/index.ts"
import tryCatch from "./tryCatch/index.ts"
import isOk from "./isOk/index.ts"
import isErr from "./isErr/index.ts"
```

## Notes

- Use Result when you want typed, tagged errors without accumulation.
- Examples follow Envoy’s pipe-prefixed doc comment style (`|`).

## Testing and roadmap

Handwritten tests for now; Logician will replace them once ready.
