//++ Lifts a 5-ary function to work with applicative functors, applying it to all combinations of elements from five arrays (Cartesian product)
const liftA5 = <A, B, C, D, E, R>(
	fn: (a: A, b: B, c: C, d: D, e: E) => R,
) =>
(
	fa: ReadonlyArray<A>,
) =>
(
	fb: ReadonlyArray<B>,
) =>
(
	fc: ReadonlyArray<C>,
) =>
(
	fd: ReadonlyArray<D>,
) =>
(
	fe: ReadonlyArray<E>,
): Array<R> =>
	fa.flatMap((a) =>
		fb.flatMap((b) =>
			fc.flatMap((c) => fd.flatMap((d) => fe.map((e) => fn(a, b, c, d, e))))
		)
	)

//?? [EXAMPLE] liftedSum5([1])([10])([100])([1000])([10000]) // [11111]
//?? [EXAMPLE] liftedSum5([1, 2])([10])([100])([1000])([10000]) // [11111, 11112]
//?? [EXAMPLE] liftedMakeEntity([1])(["task"])(["open", "closed"])([1, 2])(["Alice"]) // 4 different entity combinations
//?? [EXAMPLE] liftedDateTime([2024])([1])([15])([9, 17])([0, 30]) // 4 datetime combinations with minutes
//?? [EXAMPLE] liftedAnimation(["slide"])(["1s", "2s"])(["ease"])(["0s"])(["1", "infinite"]) // 4 animation combinations
/*??
 | [EXAMPLE]
 | ```typescript
 | // Basic arithmetic with five arrays
 | const sum5 = (a: number, b: number, c: number, d: number, e: number) =>
 |   a + b + c + d + e
 | const liftedSum5 = liftA5(sum5)
 |
 | liftedSum5([1])([10])([100])([1000])([10000])
 | // [11111]
 |
 | liftedSum5([1, 2])([10])([100])([1000])([10000])
 | // [11111, 11112]
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Complex object creation
 | const makeEntity = (
 |   id: number,
 |   type: string,
 |   status: string,
 |   priority: number,
 |   assignee: string
 | ) => ({
 |   id,
 |   type,
 |   status,
 |   priority,
 |   assignee,
 |   created: new Date(),
 |   hash: `${id}-${type}-${status}-${priority}-${assignee}`
 | })
 | const liftedMakeEntity = liftA5(makeEntity)
 |
 | liftedMakeEntity([1])
 |                 (["task"])
 |                 (["open", "closed"])
 |                 ([1, 2])
 |                 (["Alice"])
 | // 4 different entity combinations
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Date-time with timezone
 | const makeFullDateTime = (
 |   year: number,
 |   month: number,
 |   day: number,
 |   hour: number,
 |   minute: number
 | ) => new Date(year, month - 1, day, hour, minute)
 | const liftedDateTime = liftA5(makeFullDateTime)
 |
 | liftedDateTime([2024])
 |               ([1])
 |               ([15])
 |               ([9, 17])
 |               ([0, 30])
 | // 4 datetime combinations with minutes
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // CSS animation shorthand
 | const animation = (
 |   name: string,
 |   duration: string,
 |   timing: string,
 |   delay: string,
 |   iteration: string
 | ) => `${name} ${duration} ${timing} ${delay} ${iteration}`
 | const liftedAnimation = liftA5(animation)
 |
 | liftedAnimation(["slide"])
 |                (["1s", "2s"])
 |                (["ease"])
 |                (["0s"])
 |                (["1", "infinite"])
 | // 4 animation combinations
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Database connection string
 | const connectionString = (
 |   protocol: string,
 |   user: string,
 |   host: string,
 |   port: number,
 |   database: string
 | ) => `${protocol}://${user}@${host}:${port}/${database}`
 | const liftedConnection = liftA5(connectionString)
 |
 | liftedConnection(["postgresql"])
 |                 (["admin"])
 |                 (["localhost"])
 |                 ([5432, 3306])
 |                 (["myapp"])
 | // 2 connection string combinations
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // API request configuration
 | const apiConfig = (
 |   method: string,
 |   endpoint: string,
 |   headers: Record<string, string>,
 |   timeout: number,
 |   retries: number
 | ) => ({
 |   method,
 |   url: endpoint,
 |   headers,
 |   timeout,
 |   retries,
 |   timestamp: Date.now()
 | })
 | const liftedApiConfig = liftA5(apiConfig)
 |
 | liftedApiConfig(["GET"])
 |                (["/api/v1"])
 |                ([{ Accept: "json" }])
 |                ([5000])
 |                ([0, 3])
 | // 2 API configuration combinations
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Empty array handling
 | liftedSum5([])([1])([2])([3])([4])     // []
 | liftedSum5([1])([])([2])([3])([4])     // []
 | liftedSum5([1])([2])([])([3])([4])     // []
 | liftedSum5([1])([2])([3])([])([4])     // []
 | liftedSum5([1])([2])([3])([4])([])     // []
 |
 | // Single element arrays
 | liftedSum5([1])([2])([3])([4])([5])  // [15]
 | ```
 */

export default liftA5
