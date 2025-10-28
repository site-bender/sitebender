export type Just<A> = {
	readonly _tag: "Just"
	readonly value: A
}

export type Nothing = {
	readonly _tag: "Nothing"
}

export type InferMaybeTuple<T extends Array<Maybe<unknown>>> = {
	[K in keyof T]: T[K] extends Maybe<infer U> ? U : never
}

export type Maybe<A> = Just<A> | Nothing
