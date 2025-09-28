//++ Flips the first two arguments of a function, useful for creating variations with reversed parameter order
const flip = <A, B, Rest extends ReadonlyArray<unknown>, R>(
	fn: (a: A, b: B, ...rest: Rest) => R,
) =>
(b: B, a: A, ...rest: Rest): R => fn(a, b, ...rest)

//?? [EXAMPLE] flippedSubtract(10, 3) // -7 (equivalent to subtract(3, 10))
//?? [EXAMPLE] flippedConcat("Hello", " World") // " WorldHello"
//?? [EXAMPLE] flippedGreet("Alice", "Hello", "!") // "Hello, Alice!"
/*??
 | [EXAMPLE]
 | ```typescript
 | const subtract = (a: number, b: number) => a - b
 | const flippedSubtract = flip(subtract)
 |
 | subtract(10, 3) // 7
 | flippedSubtract(10, 3) // -7 (equivalent to subtract(3, 10))
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Works with regular binary functions
 | const concat = (a: string, b: string) => a + b
 | const flippedConcat = flip(concat)
 | concat("Hello", " World") // "Hello World"
 | flippedConcat("Hello", " World") // " WorldHello"
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Works with functions that have more than 2 arguments
 | const greet = (greeting: string, name: string, punctuation: string) =>
 |   `${greeting}, ${name}${punctuation}`
 | const flippedGreet = flip(greet)
 | flippedGreet("Alice", "Hello", "!") // "Hello, Alice!"
 | ```
 */

export default flip
