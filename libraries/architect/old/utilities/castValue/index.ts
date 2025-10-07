// Minimal phase-2 shim: typed pass-through that preserves an Either-like shape.
// Many call sites expect an object shaped as { right: R } or { left: L }.
// We keep the input shape and simply return it unchanged, but with generic types.

// Either-ish helpers
type Left<L> = { left: L; right?: never }
type Right<R> = { right: R; left?: never }
export type Either<L, R> = Left<L> | Right<R>

export default function castValue<L = unknown, R = unknown>(
	_datatype: unknown,
): (input: Either<L, R>) => Either<L, R> {
	return (input: Either<L, R>) => input
}
