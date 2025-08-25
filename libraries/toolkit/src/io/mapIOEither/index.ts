import type { IOEither } from "../../types/fp/io/index.ts"

import right from "../../either/right/index.ts"

/**
 * Maps a function over the Either value inside IOEither
 *
 * Transforms the success value of an IOEither without executing the computation.
 * If the IOEither contains a Right value, the function is applied to transform it.
 * If it contains a Left value (error), the function is ignored and the error
 * is preserved. This allows for composing transformations on successful results
 * while maintaining error handling throughout the computation chain.
 *
 * @curried (f) => (io) => mappedIO
 * @param f - Function to transform the success value
 * @param io - IOEither to transform
 * @returns New IOEither with transformed success value
 * @example
 * ```typescript
 * import { runIO } from "../runIO/index.ts"
 * import { ioEither } from "../ioEither/index.ts"
 * import { right } from "../../either/right/index.ts"
 * import { left } from "../../either/left/index.ts"
 *
 * // Basic transformation
 * const numberIO = ioEither(() => right(42))
 * const doubledIO = mapIOEither((x: number) => x * 2)(numberIO)
 * runIO(doubledIO)  // Right(84)
 *
 * // Error case - function not applied
 * const errorIO = ioEither(() => left("Something went wrong"))
 * const transformedErrorIO = mapIOEither((x: number) => x * 2)(errorIO)
 * runIO(transformedErrorIO)  // Left("Something went wrong")
 *
 * // String transformations
 * const greetingIO = ioEither(() => right("hello"))
 * const upperIO = mapIOEither((s: string) => s.toUpperCase())(greetingIO)
 * runIO(upperIO)  // Right("HELLO")
 *
 * // Object transformations
 * interface User {
 *   id: number
 *   name: string
 *   email: string
 * }
 *
 * const userIO = ioEither(() => right({
 *   id: 1,
 *   name: "Alice",
 *   email: "alice@example.com"
 * }))
 *
 * const nameIO = mapIOEither((user: User) => user.name)(userIO)
 * runIO(nameIO)  // Right("Alice")
 *
 * // Chaining transformations
 * const dataIO = ioEither(() => right(5))
 * const processedIO = pipe(
 *   dataIO,
 *   mapIOEither((x: number) => x * 2),     // Right(10)
 *   mapIOEither((x: number) => x + 3),     // Right(13)
 *   mapIOEither((x: number) => x.toString()) // Right("13")
 * )
 * runIO(processedIO)  // Right("13")
 *
 * // JSON processing with error preservation
 * const configIO = ioEither(() => {
 *   try {
 *     return right(JSON.parse('{"apiUrl": "https://api.example.com"}'))
 *   } catch (error) {
 *     return left(`Parse error: ${error}`)
 *   }
 * })
 *
 * const apiUrlIO = mapIOEither((config: any) => config.apiUrl)(configIO)
 * runIO(apiUrlIO)  // Right("https://api.example.com")
 *
 * // Mathematical operations
 * const mathIO = ioEither(() => right(16))
 * const sqrtIO = mapIOEither((x: number) => Math.sqrt(x))(mathIO)
 * const roundedIO = mapIOEither((x: number) => Math.round(x))(sqrtIO)
 * runIO(roundedIO)  // Right(4)
 *
 * // Array transformations
 * const arrayIO = ioEither(() => right([1, 2, 3, 4, 5]))
 * const evenNumbersIO = mapIOEither((arr: Array<number>) =>
 *   arr.filter(x => x % 2 === 0)
 * )(arrayIO)
 * runIO(evenNumbersIO)  // Right([2, 4])
 *
 * // Date formatting
 * const timeIO = ioEither(() => right(new Date("2023-08-20T15:30:00Z")))
 * const formattedIO = mapIOEither((date: Date) =>
 *   date.toISOString().split('T')[0]
 * )(timeIO)
 * runIO(formattedIO)  // Right("2023-08-20")
 *
 * // Error scenarios preserve the error
 * const failedParseIO = ioEither(() => left("Invalid JSON"))
 * const attemptTransformIO = mapIOEither((data: any) => data.value)(failedParseIO)
 * runIO(attemptTransformIO)  // Left("Invalid JSON") - transformation skipped
 *
 * // Complex object manipulation
 * interface Order {
 *   id: string
 *   items: Array<{ name: string; price: number; quantity: number }>
 *   customerId: string
 * }
 *
 * const orderIO = ioEither(() => right({
 *   id: "ORD-123",
 *   items: [
 *     { name: "Widget", price: 10.99, quantity: 2 },
 *     { name: "Gadget", price: 5.50, quantity: 1 }
 *   ],
 *   customerId: "CUST-456"
 * }))
 *
 * const totalIO = mapIOEither((order: Order) =>
 *   order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
 * )(orderIO)
 * runIO(totalIO)  // Right(27.48)
 *
 * // Type conversions
 * const stringNumberIO = ioEither(() => right("42"))
 * const numberIO2 = mapIOEither((s: string) => parseInt(s, 10))(stringNumberIO)
 * runIO(numberIO2)  // Right(42)
 *
 * // Validation results
 * const emailIO = ioEither(() => right("user@example.com"))
 * const domainIO = mapIOEither((email: string) => {
 *   const parts = email.split("@")
 *   return parts.length === 2 ? parts[1] : "unknown"
 * })(emailIO)
 * runIO(domainIO)  // Right("example.com")
 *
 * // Network response processing
 * const responseIO = ioEither(() => right({
 *   status: 200,
 *   data: { users: ["Alice", "Bob", "Charlie"] },
 *   headers: { "content-type": "application/json" }
 * }))
 *
 * const usersIO = mapIOEither((response: any) => response.data.users)(responseIO)
 * runIO(usersIO)  // Right(["Alice", "Bob", "Charlie"])
 *
 * // Partial application for reusable transformers
 * const addOne = mapIOEither((x: number) => x + 1)
 * const toString = mapIOEither((x: number) => x.toString())
 * const toUpperCase = mapIOEither((s: string) => s.toUpperCase())
 *
 * const numIO = ioEither(() => right(41))
 * const transformedIO = pipe(numIO, addOne, toString, toUpperCase)
 * runIO(transformedIO)  // Right("42")
 *
 * // Error preservation through chain
 * const failedIO = ioEither(() => left("Database connection failed"))
 * const chainedIO = pipe(
 *   failedIO,
 *   mapIOEither((x: any) => x.toUpperCase()),  // Skipped
 *   mapIOEither((x: any) => x + "!"),          // Skipped
 *   mapIOEither((x: any) => x.repeat(3))       // Skipped
 * )
 * runIO(chainedIO)  // Left("Database connection failed")
 * ```
 * @property Functor - Preserves IOEither structure while transforming success values
 * @property Error-preserving - Left values (errors) pass through unchanged
 * @property Lazy - Transformation is deferred until runIO is called
 * @property Composable - Can be chained with other IOEither operations
 */
const mapIOEither =
	<E, A, B>(f: (a: A) => B) => (io: IOEither<E, A>): IOEither<E, B> => () => {
		const either = io()
		return either._tag === "Right" ? right(f(either.right)) : either
	}

export default mapIOEither
