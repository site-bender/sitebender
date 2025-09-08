import doNotation from "../doNotation/index.ts"
import type { MonadDictionary } from "../doNotation/index.ts"

type Maybe<A> = { tag: "None" } | { tag: "Some"; value: A }

const MaybeMonad: MonadDictionary<Maybe<any>> = {
	chain: <A, B>(f: (a: A) => Maybe<B>) => (ma: Maybe<A>): Maybe<B> => {
		if (ma.tag === "None") {
			return ma
		}
		return f(ma.value)
	},
	of: <A>(value: A): Maybe<A> => {
		return { tag: "Some", value }
	}
}

//++ Maybe monad constructors and helpers
export function None<A = never>(): Maybe<A> {
	return { tag: "None" }
}

export function Some<A>(value: A): Maybe<A> {
	return { tag: "Some", value }
}

export function isNone<A>(maybe: Maybe<A>): maybe is { tag: "None" } {
	return maybe.tag === "None"
}

export function isSome<A>(maybe: Maybe<A>): maybe is { tag: "Some"; value: A } {
	return maybe.tag === "Some"
}

export function fromNullable<A>(value: A | null | undefined): Maybe<A> {
	return value === null || value === undefined
		? None()
		: Some(value)
}

export function fromPredicate<A>(predicate: (value: A) => boolean) {
	return function checkPredicate(value: A): Maybe<A> {
		return predicate(value) ? Some(value) : None()
	}
}

export function getOrElse<A>(defaultValue: A) {
	return function extractValue(maybe: Maybe<A>): A {
		return maybe.tag === "None" ? defaultValue : maybe.value
	}
}

//++ Specialized do-notation for Maybe monad with null-safe operations
export default function doMaybe<A>(
	genFn: () => Generator<Maybe<any>, A, any>
): Maybe<A> {
	return doNotation(MaybeMonad)(genFn)
}

//?? [EXAMPLE] doMaybe(function* () { const x = yield Some(5); const y = yield Some(3); return x + y })
//?? [EXAMPLE] doMaybe(function* () { const x = yield None(); return x }) // Short-circuits on None
//?? [EXAMPLE] doMaybe(function* () { const x = yield fromNullable(getValue()); return x * 2 })
/*??
 * [EXAMPLE]
 * // Safe property access
 * const getNestedProp = (obj: any) => doMaybe<string>(function* () {
 *   const user = yield fromNullable(obj.user)
 *   const profile = yield fromNullable(user.profile)
 *   const name = yield fromNullable(profile.name)
 *   return name.toUpperCase()
 * })
 * 
 * const result1 = getNestedProp({ user: { profile: { name: "Alice" } } })  // Some("ALICE")
 * const result2 = getNestedProp({ user: null })  // None()
 * const result3 = getNestedProp({})  // None()
 * 
 * // Filtering and transforming
 * const processNumber = (n: number) => doMaybe<string>(function* () {
 *   const positive = yield fromPredicate<number>(x => x > 0)(n)
 *   const even = yield fromPredicate<number>(x => x % 2 === 0)(positive)
 *   return `Even positive: ${even}`
 * })
 * 
 * processNumber(4)   // Some("Even positive: 4")
 * processNumber(3)   // None() - not even
 * processNumber(-2)  // None() - not positive
 * 
 * // Safe array operations
 * const getFirstPositive = (numbers: number[]) => doMaybe<number>(function* () {
 *   const first = yield fromNullable(numbers[0])
 *   const positive = yield fromPredicate<number>(x => x > 0)(first)
 *   return positive * 2
 * })
 * 
 * // Combining with default values
 * const withDefaults = (config: any) => doMaybe<Config>(function* () {
 *   const port = yield Some(getOrElse(3000)(fromNullable(config.port)))
 *   const host = yield Some(getOrElse("localhost")(fromNullable(config.host)))
 *   const ssl = yield Some(getOrElse(false)(fromNullable(config.ssl)))
 *   return { port, host, ssl }
 * })
 * 
 * [GOTCHA] First None short-circuits entire computation
 * [GOTCHA] No error information preserved (use Either for errors)
 * [PRO] Null-safe chaining without ?. operator
 * [PRO] Composable optional value handling
 * [PRO] Clear semantics for missing values
 */