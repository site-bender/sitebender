//++ Identity function that returns its argument unchanged
const identity = <T>(a: T): T => a

//?? [EXAMPLE] identity(5) // 5
//?? [EXAMPLE] identity("hello") // "hello"
//?? [EXAMPLE] identity([1, 2, 3]) // [1, 2, 3]
/*??
 | [EXAMPLE]
 | ```typescript
 | identity(identity(42)) // 42 (idempotent)
 | ```
 */

export default identity
