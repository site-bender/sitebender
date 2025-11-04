import reduce from "../../array/reduce/index.ts"

//++ Functional programming pipe utility that composes functions left-to-right
//++ Data flows through the pipeline: pipe([f, g, h])(x) === h(g(f(x)))
//++ NOTE: TypeScript cannot fully type-check intermediate function compositions
//++ without extensive overloads. Type parameters T (input) and U (output) provide
//++ boundary type safety, but intermediate steps are not strictly checked.
// deno-lint-ignore no-explicit-any
export default function pipe<T, U>(fns: ReadonlyArray<(value: any) => any>) {
	// deno-lint-ignore no-explicit-any
	return function pipeWithFns(input: T): U {
		// deno-lint-ignore no-explicit-any
		return reduce(
			function applyFunction(output: any, fn: (value: any) => any): any {
				return fn(output)
			},
		)(input as any)(fns) as U
	}
}
