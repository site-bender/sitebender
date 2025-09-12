/**
 * Like partial but fixes arguments from the right
 * Returns a new function that takes the initial arguments
 *
 * @pure
 * @param fn - Function to partially apply
 * @param fixedArgs - Arguments to fix at the end
 * @returns Partially applied function with fixed arguments on the right
 * @example
 * ```typescript
 * const greet = (greeting: string, name: string, punctuation: string) =>
 *   `${greeting}, ${name}${punctuation}`
 *
 * const exclaim = partialRight(greet, "!")
 * exclaim("Hello", "Alice") // "Hello, Alice!"
 * exclaim("Goodbye", "Bob") // "Goodbye, Bob!"
 *
 * const greetBobExcitedly = partialRight(greet, "Bob", "!!")
 * greetBobExcitedly("Hi") // "Hi, Bob!!"
 * greetBobExcitedly("Welcome") // "Welcome, Bob!!"
 *
 * // Useful for creating specialized functions
 * const divide = (dividend: number, divisor: number) => dividend / divisor
 * const divideBy2 = partialRight(divide, 2)
 * divideBy2(10) // 5
 * divideBy2(100) // 50
 *
 * const divideInto100 = partialRight(divide, 100)
 * divideInto100(4) // 0.04 (4 / 100)
 * ```
 *
 * Note: The fixed arguments are applied from the right side,
 * filling the last parameter positions first.
 */
const partialRight =
	<T extends ReadonlyArray<unknown>, U extends ReadonlyArray<unknown>, R>(
		fn: (...args: [...T, ...U]) => R,
		...fixedArgs: U
	) =>
	(...initialArgs: T): R => fn(...initialArgs, ...fixedArgs)

export default partialRight
