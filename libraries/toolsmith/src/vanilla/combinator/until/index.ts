//++ Calls a function repeatedly until a predicate returns true, applying the function to its own output until the condition is met
const until = <T>(
	predicate: (value: T) => boolean,
	fn: (value: T) => T,
	initial: T,
): T => predicate(initial) ? initial : until(predicate, fn, fn(initial))

//?? [EXAMPLE] nextPowerOf2(10) // 16 (1 -> 2 -> 4 -> 8 -> 16)
//?? [EXAMPLE] nextPowerOf2(100) // 128
//?? [EXAMPLE] digitalRoot(99) // 9 (99 -> 18 -> 9)
//?? [EXAMPLE] digitalRoot(12345) // 6 (12345 -> 15 -> 6)
/*??
 | [EXAMPLE]
 | ```typescript
 | // Find the next power of 2 greater than a number
 | const nextPowerOf2 = (n: number) =>
 |   until(
 |     (x: number) => x > n,
 |     (x: number) => x * 2,
 |     1
 |   )
 |
 | nextPowerOf2(10) // 16 (1 -> 2 -> 4 -> 8 -> 16)
 | nextPowerOf2(100) // 128
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Reduce a number to single digit by summing digits
 | const sumDigits = (n: number): number =>
 |   String(n).split('').reduce((a, b) => a + Number(b), 0)
 |
 | const digitalRoot = (n: number) =>
 |   until(
 |     (x: number) => x < 10,
 |     sumDigits,
 |     n
 |   )
 |
 | digitalRoot(99) // 9 (99 -> 18 -> 9)
 | digitalRoot(12345) // 6 (12345 -> 15 -> 6)
 | ```
 |
 | [GOTCHA]
 | Be careful to ensure the predicate will eventually return true,
 | or this function will run forever. Consider adding a maximum iteration
 | count for safety in production code.
 */

export default until
