//++ Appends a fixed array to any array
const concatTo = <T>(toAppend: Array<T>) => (baseArray: Array<T>): Array<T> =>
	baseArray.concat(toAppend)

//?? [EXAMPLE] `concatTo([3, 4])([1, 2]) // [1, 2, 3, 4]`
//?? [EXAMPLE] `concatTo([])([1, 2])     // [1, 2]`
//?? [EXAMPLE] `concatTo([3, 4])([])     // [3, 4]`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Partial application for suffixing
 | const appendSuffix = concatTo([99, 100])
 | appendSuffix([1, 2, 3]) // [1, 2, 3, 99, 100]
 | appendSuffix([4, 5])    // [4, 5, 99, 100]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Adding standard endings
 | const addSentinel = concatTo([-1])
 | addSentinel([1, 2, 3]) // [1, 2, 3, -1]
 | addSentinel([])        // [-1]
 | ```
 */

export default concatTo
