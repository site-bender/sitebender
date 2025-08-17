/**
 * Maybe type - represents a value that may or may not exist
 * Similar to Option in other languages
 */

/**
 * Nothing - represents absence of value
 */
export interface Nothing {
  readonly _tag: "Nothing"
  readonly value: undefined
}

/**
 * Just - represents presence of value
 */
export interface Just<T> {
  readonly _tag: "Just"
  readonly value: T
}

/**
 * Maybe type - either Just(value) or Nothing
 */
export type Maybe<T> = Nothing | Just<T>

/**
 * Create a Nothing value
 */
export const nothing = (): Nothing => ({
  _tag: "Nothing",
  value: undefined
})

/**
 * Create a Just value
 */
export const just = <T>(value: T): Just<T> => ({
  _tag: "Just",
  value
})

/**
 * Type guard for Nothing
 */
export const isNothing = <T>(maybe: Maybe<T>): maybe is Nothing =>
  maybe._tag === "Nothing"

/**
 * Type guard for Just
 */
export const isJust = <T>(maybe: Maybe<T>): maybe is Just<T> =>
  maybe._tag === "Just"

/**
 * Convert Maybe to a default value
 */
export const fromMaybe = <T>(defaultValue: T) => (maybe: Maybe<T>): T =>
  isJust(maybe) ? maybe.value : defaultValue

/**
 * Map over Maybe
 */
export const mapMaybe = <A, B>(fn: (a: A) => B) => (maybe: Maybe<A>): Maybe<B> =>
  isJust(maybe) ? just(fn(maybe.value)) : nothing()

/**
 * FlatMap over Maybe
 */
export const flatMapMaybe = <A, B>(fn: (a: A) => Maybe<B>) => (maybe: Maybe<A>): Maybe<B> =>
  isJust(maybe) ? fn(maybe.value) : nothing()

/**
 * Convert nullable value to Maybe
 */
export const toMaybe = <T>(value: T | null | undefined): Maybe<T> =>
  value == null ? nothing() : just(value)