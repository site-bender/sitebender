//++ Conditionally applies a function based on a predicate, returning the value unchanged if predicate is false
const when = <T>(
	predicate: (value: T) => boolean,
	fn: (value: T) => T,
) =>
(value: T): T => predicate(value) ? fn(value) : value

//?? [EXAMPLE] doubleIfPositive(5) // 10
//?? [EXAMPLE] doubleIfPositive(-3) // -3 (unchanged)
//?? [EXAMPLE] doubleIfPositive(0) // 0 (unchanged)
//?? [EXAMPLE] promoteIfSenior({ years: 7, title: "Developer" }) // { years: 7, title: "Senior Developer" }
/*??
 | [EXAMPLE]
 | ```typescript
 | const doubleIfPositive = when(
 |   (x: number) => x > 0,
 |   (x: number) => x * 2
 | )
 |
 | doubleIfPositive(5) // 10
 | doubleIfPositive(-3) // -3 (unchanged)
 | doubleIfPositive(0) // 0 (unchanged)
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Use with objects
 | const promoteIfSenior = when(
 |   (emp: { years: number }) => emp.years > 5,
 |   (emp: { years: number; title: string }) => ({
 |     ...emp,
 |     title: "Senior " + emp.title
 |   })
 | )
 |
 | promoteIfSenior({ years: 7, title: "Developer" })
 | // { years: 7, title: "Senior Developer" }
 | ```
 |
 | [GOTCHA]
 | The identity function is applied when predicate returns false,
 | making this safe to use in pipelines.
 */

export default when
