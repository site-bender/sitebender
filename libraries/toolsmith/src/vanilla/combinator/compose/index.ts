//++ Functional programming compose utility that composes functions right-to-left (mathematical composition)
// deno-lint-ignore no-explicit-any
const compose = <T>(fns: ReadonlyArray<(value: any) => any> = []) =>
// deno-lint-ignore no-explicit-any
(input: T): any => fns.reduceRight((out, fn) => fn(out), input)

//?? [EXAMPLE] composed(3) // 16 (first adds 5 to get 8, then multiplies by 2)
//?? [EXAMPLE] transform("  hello  ") // "HELLO"
//?? [EXAMPLE] identity(42) // 42
/*??
 | [EXAMPLE]
 | ```typescript
 | const add5 = (x: number) => x + 5
 | const multiply2 = (x: number) => x * 2
 | const composed = compose([multiply2, add5])
 | composed(3) // 16
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // String transformations
 | const toUpper = (s: string) => s.toUpperCase()
 | const trim = (s: string) => s.trim()
 | const transform = compose([toUpper, trim])
 | transform("  hello  ") // "HELLO"
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Empty array returns identity
 | const identity = compose([])
 | identity(42) // 42
 | ```
 |
 | [GOTCHA]
 | TypeScript cannot properly type variadic compose without extensive overloads.
 | The 'any' type here is justified because each function's output type becomes
 | the previous function's input type, creating a chain of dependent types that
 | TypeScript cannot infer without 20+ overloads for different arities.
 */

export default compose
