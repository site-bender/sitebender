export interface Left<E> {
	readonly _tag: "Left"
	readonly left: E
}

export interface Right<A> {
	readonly _tag: "Right"
	readonly right: A
}

export type InferEitherTuple<T extends Array<Either<unknown, unknown>>> = {
	[K in keyof T]: T[K] extends Either<unknown, infer U> ? U : never
}

export type Either<E, A> = Left<E> | Right<A>
