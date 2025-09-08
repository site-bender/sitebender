import type { MonadDictionary } from "../doNotation/index.ts"

type InspectConfig = {
	label?: string
	showTypes?: boolean
	maxDepth?: number
	filter?: (value: any) => boolean
}

//++ Provides do-notation with rich inspection capabilities for debugging monadic computations
export default function doNotationWithInspect<M>(
	monad: MonadDictionary<M>,
	config: InspectConfig = {}
) {
	return function runGeneratorWithInspect<A>(
		genFn: () => Generator<M, A, any>
	): M {
		const generator = genFn()
		const { label = "inspect", showTypes = true, maxDepth = 3, filter } = config
		
		const formatValue = (value: any, depth = 0): string => {
			if (depth > maxDepth) return "..."
			
			if (value === null) return "null"
			if (value === undefined) return "undefined"
			
			const type = typeof value
			
			if (type === "object") {
				if (Array.isArray(value)) {
					return `[${value.map(v => formatValue(v, depth + 1)).join(", ")}]`
				}
				const entries = Object.entries(value)
					.map(([k, v]) => `${k}: ${formatValue(v, depth + 1)}`)
					.join(", ")
				return `{ ${entries} }`
			}
			
			if (type === "string") return `"${value}"`
			return String(value)
		}
		
		const inspect = (value: any, step: number): void => {
			if (filter && !filter(value)) return
			
			const formatted = formatValue(value)
			const typeInfo = showTypes ? ` (${typeof value})` : ""
			console.log(`[${label}:${step}]${typeInfo}: ${formatted}`)
		}
		
		let stepCount = 0
		
		function stepWithInspect(value: any): M {
			if (value !== undefined) {
				inspect(value, stepCount)
			}
			stepCount++
			
			const result = generator.next(value)
			
			if (result.done) {
				inspect(result.value, stepCount)
				return monad.of(result.value)
			}
			
			return monad.chain(stepWithInspect)(result.value)
		}
		
		return stepWithInspect(undefined)
	}
}

//?? [EXAMPLE] doNotationWithInspect(Maybe, { label: "debug" })(function* () { const x = yield Some(5); return x * 2 })
//?? [EXAMPLE] doNotationWithInspect(Either, { showTypes: false })(function* () { const x = yield Right(10); return x })
//?? [EXAMPLE] doNotationWithInspect(State, { filter: x => x > 0 })(function* () { yield get(); yield put(5); return 10 })
/*??
 * [EXAMPLE]
 * const inspectDo = doNotationWithInspect(TaskMonad, {
 *   label: "API",
 *   showTypes: true,
 *   maxDepth: 2
 * })
 * 
 * const task = inspectDo(function* () {
 *   const user = yield fetchUser()      // [API:1] (object): { id: 1, name: "Alice" }
 *   const posts = yield fetchPosts(user.id) // [API:2] (object): [{ title: "..." }, ...]
 *   return { user, posts }               // [API:3] (object): { user: {...}, posts: [...] }
 * })
 * 
 * // Filter sensitive data
 * const safeDo = doNotationWithInspect(IOMonad, {
 *   filter: value => !value?.password && !value?.apiKey
 * })
 * 
 * // Production-ready inspection
 * const prodDo = doNotationWithInspect(ResultMonad, {
 *   label: process.env.NODE_ENV === "production" ? "PROD" : "DEV",
 *   showTypes: process.env.DEBUG === "true",
 *   maxDepth: process.env.DEBUG === "true" ? 5 : 1
 * })
 * 
 * [GOTCHA] Large objects can produce verbose output
 * [GOTCHA] Circular references will cause infinite recursion
 * [PRO] Rich formatting with type information
 * [PRO] Configurable filtering for sensitive data
 * [PRO] Step counting for debugging flow
 */