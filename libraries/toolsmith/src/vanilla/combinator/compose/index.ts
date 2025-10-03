//++ Functional programming compose utility that composes functions right-to-left (mathematical composition)
// deno-lint-ignore no-explicit-any
const compose = <T>(fns: ReadonlyArray<(value: any) => any> = []) =>
// deno-lint-ignore no-explicit-any
(input: T): any => fns.reduceRight((out, fn) => fn(out), input)

export default compose
