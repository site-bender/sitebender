//++ Functional programming pipe utility that composes functions left-to-right (data flows through the pipeline)
// deno-lint-ignore no-explicit-any
const pipe = <T>(fns: ReadonlyArray<(value: any) => any> = []) =>
// deno-lint-ignore no-explicit-any
(input: T): any => fns.reduce((out, fn) => fn(out), input)


export default pipe
