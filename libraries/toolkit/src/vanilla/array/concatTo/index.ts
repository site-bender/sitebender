/**
 * Concatenates an array to another array
 *
 * Takes an array to append, then returns a function that will concatenate
 * that array TO the end of whatever array is passed to it. This is useful
 * for partial application when you know what you want to append to various
 * arrays.
 *
 * @curried (toAppend) => (baseArray) => result
 * @param toAppend - The array to append to other arrays
 * @param baseArray - The array to append to
 * @returns New array with baseArray's elements followed by toAppend's elements
 * @example
 * ```typescript
 * concatTo([3, 4])([1, 2]) // [1, 2, 3, 4]
 * concatTo([])([1, 2])     // [1, 2]
 * concatTo([3, 4])([])     // [3, 4]
 *
 * // Partial application for suffixing
 * const appendSuffix = concatTo([99, 100])
 * appendSuffix([1, 2, 3]) // [1, 2, 3, 99, 100]
 * appendSuffix([4, 5])    // [4, 5, 99, 100]
 *
 * // Adding standard endings
 * const addSentinel = concatTo([-1])
 * addSentinel([1, 2, 3]) // [1, 2, 3, -1]
 * addSentinel([])        // [-1]
 * ```
 */
const concatTo = <T>(toAppend: Array<T>) => (baseArray: Array<T>): Array<T> =>
	baseArray.concat(toAppend)

export default concatTo
