export interface Some<A> {
	readonly _tag: "Some"
	readonly value: A
}

export interface None {
	readonly _tag: "None"
}

export type Option<T> = Some<T> | None
