//++ Lifts a ternary function to work with applicative functors, applying it to all combinations of elements from three arrays (Cartesian product)
const liftA3 = <A, B, C, R>(
	fn: (a: A, b: B, c: C) => R,
) =>
(
	fa: ReadonlyArray<A>,
) =>
(
	fb: ReadonlyArray<B>,
) =>
(
	fc: ReadonlyArray<C>,
): Array<R> => fa.flatMap((a) => fb.flatMap((b) => fc.map((c) => fn(a, b, c))))

//?? [EXAMPLE] liftedSum3([1, 2])([10, 20])([100]) // [111, 121, 112, 122]
//?? [EXAMPLE] liftedFormat(["Hello", "Hi"])(["Alice", "Bob"])(["!", "."]) // ["Hello, Alice!", "Hello, Alice.", "Hello, Bob!", "Hello, Bob.", "Hi, Alice!", "Hi, Alice.", "Hi, Bob!", "Hi, Bob."]
//?? [EXAMPLE] liftedRgb([0, 255])([128, 255])([64, 128]) // All 8 RGB combinations
//?? [EXAMPLE] liftedMakeDate([2024])([1, 6])([15, 30]) // All date combinations
//?? [EXAMPLE] liftedValidate([0])([100])([25, 75]) // Boolean results for all combinations
/*??
 | [EXAMPLE]
 | ```typescript
 | // Basic arithmetic with three arrays
 | const sum3 = (a: number, b: number, c: number) => a + b + c
 | const liftedSum3 = liftA3(sum3)
 |
 | liftedSum3([1, 2])([10, 20])([100])
 | // [111, 121, 112, 122]
 | // Applies: 1+10+100, 1+20+100, 2+10+100, 2+20+100
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // String formatting
 | const format = (greeting: string, name: string, punct: string) =>
 |   `${greeting}, ${name}${punct}`
 | const liftedFormat = liftA3(format)
 |
 | liftedFormat(["Hello", "Hi"])
 |             (["Alice", "Bob"])
 |             (["!", "."])
 | // ["Hello, Alice!", "Hello, Alice.", "Hello, Bob!", "Hello, Bob.",
 | //  "Hi, Alice!", "Hi, Alice.", "Hi, Bob!", "Hi, Bob."]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // RGB color combinations
 | const rgb = (r: number, g: number, b: number) =>
 |   `rgb(${r}, ${g}, ${b})`
 | const liftedRgb = liftA3(rgb)
 |
 | liftedRgb([0, 255])([128, 255])([64, 128])
 | // All 8 RGB combinations from the given values
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Date creation
 | const makeDate = (year: number, month: number, day: number) =>
 |   new Date(year, month - 1, day)
 | const liftedMakeDate = liftA3(makeDate)
 |
 | liftedMakeDate([2024])([1, 6])([15, 30])
 | // All date combinations for the given year, months, and days
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Validation with multiple conditions
 | const isValid = (min: number, max: number, value: number) =>
 |   value >= min && value <= max
 | const liftedValidate = liftA3(isValid)
 |
 | liftedValidate([0])([100])([25, 75])
 | // Boolean results for all combinations
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Object construction
 | const makeUser = (id: number, name: string, role: string) => ({
 |   id,
 |   name,
 |   role,
 |   created: new Date()
 | })
 | const liftedMakeUser = liftA3(makeUser)
 |
 | liftedMakeUser([1, 2])
 |               (["Alice"])
 |               (["admin", "user"])
 | // [
 | //   { id: 1, name: "Alice", role: "admin", ... },
 | //   { id: 1, name: "Alice", role: "user", ... },
 | //   { id: 2, name: "Alice", role: "admin", ... },
 | //   { id: 2, name: "Alice", role: "user", ... }
 | // ]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Mathematical operations
 | const clamp = (min: number, max: number, value: number) =>
 |   Math.max(min, Math.min(max, value))
 | const liftedClamp = liftA3(clamp)
 |
 | liftedClamp([0])([10])([3, 8, 15])
 | // All clamped values: [3, 8, 10]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Empty array handling
 | liftedSum3([])([1, 2])([3, 4])    // []
 | liftedSum3([1, 2])([])([3, 4])    // []
 | liftedSum3([1, 2])([3, 4])([])    // []
 |
 | // Single element arrays
 | liftedSum3([1])([2])([3])  // [6]
 | ```
 */

export default liftA3
