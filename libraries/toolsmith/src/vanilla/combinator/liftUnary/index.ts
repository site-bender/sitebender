//++ Lifts a unary function to work with functors (standard map operation), applying the function to each element in an array
const liftUnary = <A, R>(
	fn: (a: A) => R,
) =>
(
	fa: ReadonlyArray<A>,
): Array<R> => {
	return fa.map(fn)
}

//?? [EXAMPLE] liftedDouble([1, 2, 3, 4, 5]) // [2, 4, 6, 8, 10]
//?? [EXAMPLE] liftedToUpper(["hello", "world", "typescript"]) // ["HELLO", "WORLD", "TYPESCRIPT"]
//?? [EXAMPLE] liftedNot([true, false, true, false]) // [false, true, false, true]
//?? [EXAMPLE] liftedToString([1, 2, 3]) // ["1", "2", "3"]
//?? [EXAMPLE] liftedGetName([{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }, { name: "Carol", age: 35 }]) // ["Alice", "Bob", "Carol"]
/*??
 | [EXAMPLE]
 | ```typescript
 | // Basic arithmetic
 | const double = (x: number) => x * 2
 | const liftedDouble = liftUnary(double)
 |
 | liftedDouble([1, 2, 3, 4, 5])
 | // [2, 4, 6, 8, 10]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // String operations
 | const toUpper = (s: string) => s.toUpperCase()
 | const liftedToUpper = liftUnary(toUpper)
 |
 | liftedToUpper(["hello", "world", "typescript"])
 | // ["HELLO", "WORLD", "TYPESCRIPT"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Boolean negation
 | const not = (b: boolean) => !b
 | const liftedNot = liftUnary(not)
 |
 | liftedNot([true, false, true, false])
 | // [false, true, false, true]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Type conversions
 | const toString = (n: number) => n.toString()
 | const liftedToString = liftUnary(toString)
 |
 | liftedToString([1, 2, 3])
 | // ["1", "2", "3"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Object property extraction
 | const getName = (obj: { name: string }) => obj.name
 | const liftedGetName = liftUnary(getName)
 |
 | liftedGetName([
 |   { name: "Alice", age: 30 },
 |   { name: "Bob", age: 25 },
 |   { name: "Carol", age: 35 }
 | ])
 | // ["Alice", "Bob", "Carol"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Validation
 | const isPositive = (n: number) => n > 0
 | const liftedIsPositive = liftUnary(isPositive)
 |
 | liftedIsPositive([-5, 0, 5, 10, -10])
 | // [false, false, true, true, false]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Formatting
 | const formatCurrency = (n: number) => `$${n.toFixed(2)}`
 | const liftedFormatCurrency = liftUnary(formatCurrency)
 |
 | liftedFormatCurrency([10, 99.99, 150.5, 0.99])
 | // ["$10.00", "$99.99", "$150.50", "$0.99"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Mathematical operations
 | const factorial = (n: number): number =>
 |   n <= 1 ? 1 : n * factorial(n - 1)
 | const liftedFactorial = liftUnary(factorial)
 |
 | liftedFactorial([0, 1, 2, 3, 4, 5])
 | // [1, 1, 2, 6, 24, 120]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Empty array handling
 | liftedDouble([])  // []
 |
 | // Single element
 | liftedDouble([42])  // [84]
 | ```
 */

export default liftUnary
