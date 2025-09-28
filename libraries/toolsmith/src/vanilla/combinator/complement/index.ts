//++ Returns the logical complement of a predicate function, creating a function that returns the opposite boolean result
const complement = <T extends ReadonlyArray<unknown>>(
 	predicate: (...args: T) => boolean,
) =>
(...args: T): boolean => !predicate(...args)

//?? [EXAMPLE] isEven(4) // true
//?? [EXAMPLE] isOdd(4) // false
//?? [EXAMPLE] isOdd(5) // true
//?? [EXAMPLE] numbers.filter(isEven) // [2, 4]
//?? [EXAMPLE] numbers.filter(isOdd) // [1, 3, 5]
/*??
 | [EXAMPLE]
 | ```typescript
 | const isEven = (n: number) => n % 2 === 0
 | const isOdd = complement(isEven)
 |
 | isEven(4) // true
 | isOdd(4) // false
 | isOdd(5) // true
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Use with array methods
 | const numbers = [1, 2, 3, 4, 5]
 | numbers.filter(isEven) // [2, 4]
 | numbers.filter(isOdd) // [1, 3, 5]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Complement complex predicates
 | const isValidEmail = (email: string) =>
 |   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
 | const isInvalidEmail = complement(isValidEmail)
 |
 | const emails = ["test@example.com", "invalid.email", "user@domain.org"]
 | emails.filter(isValidEmail) // ["test@example.com", "user@domain.org"]
 | emails.filter(isInvalidEmail) // ["invalid.email"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Useful for partition operations
 | const isPositive = (n: number) => n > 0
 | const isNotPositive = complement(isPositive)
 |
 | const partition = <T>(pred: (x: T) => boolean, arr: Array<T>) => [
 |   arr.filter(pred),
 |   arr.filter(complement(pred))
 | ]
 |
 | partition(isPositive, [-2, -1, 0, 1, 2])
 | // [[1, 2], [-2, -1, 0]]
 | ```
 |
 | [GOTCHA]
 | This is equivalent to composing with the not function,
 | but more efficient and semantic for predicates.
 */

export default complement
