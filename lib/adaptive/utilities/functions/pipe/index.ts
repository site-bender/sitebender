/**
 * Functional programming pipe utility
 * Composes functions left-to-right (data flows through the pipeline)
 *
 * @param fns - Array of functions to compose
 * @returns Function that takes input and applies all functions in sequence
 */
// deno-lint-ignore no-explicit-any
const pipe = (fns: readonly ((value: any) => any)[] = []) =>
// deno-lint-ignore no-explicit-any
(input: any): any => fns.reduce((out, fn) => fn(out), input)

export default pipe
