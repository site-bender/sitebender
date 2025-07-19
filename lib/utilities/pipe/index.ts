import identity from "../identity/index.ts"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function pipe<T, R>(fns: Array<(input: any) => any> = []) {
	return fns.length === 0
		? (identity as (x: T) => R)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		: (input: T): R => fns.reduce((acc: any, fn: any) => fn(acc), input as any)
}
