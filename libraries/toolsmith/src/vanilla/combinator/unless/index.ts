//++ The opposite of when - applies function when predicate is false, returning the value unchanged if predicate is true
const unless = <T>(
	predicate: (value: T) => boolean,
	fn: (value: T) => T,
) =>
(value: T): T => predicate(value) ? value : fn(value)

//?? [EXAMPLE] doubleIfNotPositive(5) // 5 (unchanged, since positive)
//?? [EXAMPLE] doubleIfNotPositive(-3) // -6 (doubled, since not positive)
//?? [EXAMPLE] doubleIfNotPositive(0) // 0 (doubled to 0, since not positive)
//?? [EXAMPLE] ensureNotNull("value") // "value"
//?? [EXAMPLE] ensureNotNull(null) // "default"
/*??
 | [EXAMPLE]
 | ```typescript
 | const doubleIfNotPositive = unless(
 |   (x: number) => x > 0,
 |   (x: number) => x * 2
 | )
 |
 | doubleIfNotPositive(5) // 5 (unchanged, since positive)
 | doubleIfNotPositive(-3) // -6 (doubled, since not positive)
 | doubleIfNotPositive(0) // 0 (doubled to 0, since not positive)
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Provide defaults for missing values
 | const ensureNotNull = unless(
 |   (x: string | null) => x !== null,
 |   () => "default"
 | )
 |
 | ensureNotNull("value") // "value"
 | ensureNotNull(null) // "default"
 | ```
 |
 | [GOTCHA]
 | This is exactly equivalent to when with a negated predicate,
 | but often reads more naturally for certain conditions.
 */

export default unless
