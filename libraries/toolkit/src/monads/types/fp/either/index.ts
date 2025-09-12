// Either type definitions (mirrors established Either shape used across monads)
// Keeping minimal to satisfy existing imports in Either implementation test parity work.

export type Left<E> = { readonly _tag: "Left"; readonly left: E }
export type Right<A> = { readonly _tag: "Right"; readonly right: A }

export type Either<E, A> = Left<E> | Right<A>

export type InferLeft<T> = T extends Either<infer E, any> ? E : never
export type InferRight<T> = T extends Either<any, infer A> ? A : never
