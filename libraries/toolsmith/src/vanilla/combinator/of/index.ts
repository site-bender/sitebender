//++ Wraps a value in an array (singleton), creating a single-element array containing the value
const of = <T>(value: T): Array<T> => [value]

//?? [EXAMPLE] of(5) // [5]
//?? [EXAMPLE] of("hello") // ["hello"]
//?? [EXAMPLE] of(null) // [null]
//?? [EXAMPLE] of(undefined) // [undefined]
//?? [EXAMPLE] of([1, 2, 3]) // [[1, 2, 3]]
/*??
 | [EXAMPLE]
 | ```typescript
 | // Create singleton arrays
 | of(5) // [5]
 | of("hello") // ["hello"]
 | of(null) // [null]
 | of(undefined) // [undefined]
 |
 | // Already an array? Still wraps it
 | of([1, 2, 3]) // [[1, 2, 3]]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Compose with array methods
 | const process = (value: unknown) =>
 |   of(value)
 |     .map(x => String(x))
 |     .map(s => s.toUpperCase())
 |     .map(s => s.length)
 |
 | process("hello") // [5]
 | ```
 |
 | [GOTCHA]
 | This is the monadic return/pure function for arrays.
 | It's the simplest way to lift a value into the array context.
 */

export default of
