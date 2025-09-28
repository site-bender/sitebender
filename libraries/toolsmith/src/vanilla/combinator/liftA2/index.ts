//++ Lifts a binary function to work with applicative functors, applying it to all combinations of elements from both arrays (Cartesian product)
const liftA2 = <A, B, R>(
	fn: (a: A, b: B) => R,
) =>
(
	fa: ReadonlyArray<A>,
) =>
(
	fb: ReadonlyArray<B>,
): Array<R> => fa.flatMap((a) => fb.map((b) => fn(a, b)))

//?? [EXAMPLE] liftedAdd([1, 2, 3])([10, 20]) // [11, 21, 12, 22, 13, 23]
//?? [EXAMPLE] liftedConcat(["Hello", "Hi"])([" World", " There"]) // ["Hello World", "Hello There", "Hi World", "Hi There"]
//?? [EXAMPLE] liftedMakePair(["a", "b"])([1, 2]) // [{ a: 1 }, { a: 2 }, { b: 1 }, { b: 2 }]
//?? [EXAMPLE] addToArray([10]) // [11, 12, 13]
//?? [EXAMPLE] liftedJoinPath(["/home", "/usr"])(["file1.txt", "file2.txt"]) // ["/home/file1.txt", "/home/file2.txt", "/usr/file1.txt", "/usr/file2.txt"]
/*??
 | [EXAMPLE]
 | ```typescript
 | // Basic arithmetic with arrays
 | const add = (a: number, b: number) => a + b
 | const liftedAdd = liftA2(add)
 |
 | liftedAdd([1, 2, 3])([10, 20])
 | // [11, 21, 12, 22, 13, 23]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // String concatenation
 | const concat = (a: string, b: string) => `${a}${b}`
 | const liftedConcat = liftA2(concat)
 |
 | liftedConcat(["Hello", "Hi"])([" World", " There"])
 | // ["Hello World", "Hello There", "Hi World", "Hi There"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Object creation
 | const makePair = (key: string, value: number) => ({ [key]: value })
 | const liftedMakePair = liftA2(makePair)
 |
 | liftedMakePair(["a", "b"])([1, 2])
 | // [{ a: 1 }, { a: 2 }, { b: 1 }, { b: 2 }]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Curried usage
 | const addToArray = liftedAdd([1, 2, 3])
 | addToArray([10])    // [11, 12, 13]
 | addToArray([5, 6])  // [6, 7, 8, 7, 8, 9]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Path combinations
 | const joinPath = (dir: string, file: string) => `${dir}/${file}`
 | const liftedJoinPath = liftA2(joinPath)
 |
 | liftedJoinPath(["/home", "/usr"])
 |               (["file1.txt", "file2.txt"])
 | // ["/home/file1.txt", "/home/file2.txt", "/usr/file1.txt", "/usr/file2.txt"]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Mathematical operations
 | const multiply = (a: number, b: number) => a * b
 | const liftedMultiply = liftA2(multiply)
 |
 | liftedMultiply([2, 3])([10, 100])
 | // [20, 200, 30, 300]
 | ```
 */

export default liftA2
