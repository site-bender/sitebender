//++ Creates an array from an async iterable or iterable
export default function fromAsync<T>(
	iterable: AsyncIterable<T> | Iterable<T>,
): Promise<T[]> {
	return Array.fromAsync(iterable)
}

//?? [EXAMPLE] `await fromAsync([1, 2, 3])   // [1, 2, 3]`
//?? [EXAMPLE] `await fromAsync(new Set([1, 2, 3]))  // [1, 2, 3]`
/*??
 | [EXAMPLE]
 | ```typescript
 | // From async generator
 | async function* asyncGen() {
 |   yield 1
 |   yield 2
 |   yield 3
 | }
 | await fromAsync(asyncGen())  // [1, 2, 3]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // From async iterable with promises
 | const asyncIterable = {
 |   async *[Symbol.asyncIterator]() {
 |     yield Promise.resolve(1)
 |     yield Promise.resolve(2)
 |   }
 | }
 | await fromAsync(asyncIterable)  // [1, 2]
 | ```
 */
