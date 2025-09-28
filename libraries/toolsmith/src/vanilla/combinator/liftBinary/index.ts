//++ Lifts a binary function to work with functors pairwise (zipWith behavior), applying the function to corresponding elements at the same index
const liftBinary = <A, B, R>(
	fn: (a: A, b: B) => R,
) =>
(
	fa: ReadonlyArray<A>,
) =>
(
	fb: ReadonlyArray<B>,
): Array<R> => {
	const minLength = Math.min(fa.length, fb.length)
	return Array.from({ length: minLength }, (_, i) => fn(fa[i], fb[i]))
}

//?? [EXAMPLE] liftedAdd([1, 2, 3])([10, 20, 30]) // [11, 22, 33]
//?? [EXAMPLE] liftedConcat(["Hello", "Good", "Hi"])([" World", " Morning", " There"]) // ["Hello World", "Good Morning", "Hi There"]
//?? [EXAMPLE] liftedMax([1, 5, 3])([4, 2, 8]) // [4, 5, 8]
//?? [EXAMPLE] liftedMerge([{ name: "Alice" }, { name: "Bob" }])([{ age: 30 }, { age: 25 }]) // [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }]
//?? [EXAMPLE] liftedAdd([1, 2, 3, 4, 5])([10, 20]) // [11, 22]
/*??
 | [EXAMPLE]
 | ```typescript
 | // Basic arithmetic - pairwise operations
 | const add = (a: number, b: number) => a + b
 | const liftedAdd = liftBinary(add)
 |
 | liftedAdd([1, 2, 3])([10, 20, 30])
 | // [11, 22, 33]
 | // Pairs: 1+10, 2+20, 3+30 (NOT Cartesian product)
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // String operations - pairwise
 | const concat = (a: string, b: string) => `${a}${b}`
 | const liftedConcat = liftBinary(concat)
 |
 | liftedConcat(["Hello", "Good", "Hi"])([" World", " Morning", " There"])
 | // ["Hello World", "Good Morning", "Hi There"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Comparison operations
 | const max = (a: number, b: number) => Math.max(a, b)
 | const liftedMax = liftBinary(max)
 |
 | liftedMax([1, 5, 3])([4, 2, 8])
 | // [4, 5, 8]
 | // Takes max of each pair: max(1,4), max(5,2), max(3,8)
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Object merging
 | const merge = (a: Record<string, any>, b: Record<string, any>) =>
 |   ({ ...a, ...b })
 | const liftedMerge = liftBinary(merge)
 |
 | liftedMerge([
 |   { name: "Alice" },
 |   { name: "Bob" }
 | ])([
 |   { age: 30 },
 |   { age: 25 }
 | ])
 | // [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Different length arrays - stops at shorter length
 | liftedAdd([1, 2, 3, 4, 5])([10, 20])
 | // [11, 22]
 | // Only processes pairs while both arrays have elements
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Boolean operations
 | const and = (a: boolean, b: boolean) => a && b
 | const liftedAnd = liftBinary(and)
 |
 | liftedAnd([true, true, false, false])
 |          ([true, false, true, false])
 | // [true, false, false, false]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Array pairing
 | const makePair = <A, B>(a: A, b: B): [A, B] => [a, b]
 | const liftedPair = liftBinary(makePair)
 |
 | liftedPair(["a", "b", "c"])([1, 2, 3])
 | // [["a", 1], ["b", 2], ["c", 3]]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Creating records from parallel arrays
 | const makeRecord = (key: string, value: number) => ({ [key]: value })
 | const liftedMakeRecord = liftBinary(makeRecord)
 |
 | liftedMakeRecord(["foo", "bar", "baz"])([1, 2, 3])
 | // [{ foo: 1 }, { bar: 2 }, { baz: 3 }]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Empty array handling
 | liftedAdd([])([1, 2, 3])  // []
 | liftedAdd([1, 2, 3])([])  // []
 |
 | // Single element arrays
 | liftedAdd([5])([10])  // [15]
 | ```
 */

export default liftBinary
