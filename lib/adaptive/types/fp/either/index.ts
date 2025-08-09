export interface Left<E> {
	readonly _tag: "Left"
	readonly left: E
}

export interface Right<A> {
	readonly _tag: "Right"
	readonly right: A
}

export type InferEitherTuple<T extends Array<Either<any, any>>> = {
	[K in keyof T]: T[K] extends Either<any, infer U> ? U : never
}

export type Either<E, A> = Left<E> | Right<A>
