import type { MonadDictionary } from "../doNotation/index.ts"

type InspectConfig = {
	label?: string
	showTypes?: boolean
	maxDepth?: number
	filter?: (value: unknown) => boolean
}

//++ Provides do-notation with rich inspection capabilities for debugging monadic computations
export default function doNotationWithInspect<M>(
	monad: MonadDictionary<M>,
	config: InspectConfig = {},
) {
	return function runGeneratorWithInspect<A>(
		genFn: () => Generator<M, A, unknown>,
	): M {
		const generator = genFn()
		const { label = "inspect", showTypes = true, maxDepth = 3, filter } = config

		const formatValue = (value: unknown, depth = 0): string => {
			//++ [EXCEPTION] > operator permitted in Toolsmith for performance - provides depth limiting for debugging output
			if (depth > maxDepth) return "..."

			//++ [EXCEPTION] === operator permitted in Toolsmith for performance - provides null/undefined checking for debugging
			if (value === null) return "null"
			if (value === undefined) return "undefined"

			//++ [EXCEPTION] typeof operator permitted in Toolsmith for performance - provides type checking for debugging output
			const type = typeof value

			//++ [EXCEPTION] === operator and Array.isArray() permitted in Toolsmith for performance - provides type checking for debugging
			if (type === "object") {
				if (Array.isArray(value)) {
					//++ [EXCEPTION] .map() and .join() methods permitted in Toolsmith for performance - provides array formatting for debugging
					return `[${value.map((v) => formatValue(v, depth + 1)).join(", ")}]`
				}
				//++ [EXCEPTION] Object.entries() and .map()/.join() methods permitted in Toolsmith for performance - provides object formatting for debugging
				const entries = Object.entries(value)
					.map(([k, v]) => `${k}: ${formatValue(v, depth + 1)}`)
					.join(", ")
				return `{ ${entries} }`
			}

			//++ [EXCEPTION] === operator permitted in Toolsmith for performance - provides type checking for debugging
			if (type === "string") return `"${value}"`
			return String(value)
		}

		const inspect = (value: unknown, step: number): void => {
			//++ [EXCEPTION] && operator and ! operator permitted in Toolsmith for performance - provides filter checking for debugging
			if (filter && !filter(value)) return

			const formatted = formatValue(value)
			//++ [EXCEPTION] typeof operator permitted in Toolsmith for performance - provides type info for debugging
			const typeInfo = showTypes ? ` (${typeof value})` : ""
			console.log(`[${label}:${step}]${typeInfo}: ${formatted}`)
		}

		//++ [EXCEPTION] let declaration and mutation permitted in Toolsmith for performance - provides step counter for debugging
		let stepCount = 0

		function stepWithInspect(value: unknown): M {
			//++ [EXCEPTION] !== operator permitted in Toolsmith for performance - provides undefined checking
			if (value !== undefined) {
				inspect(value, stepCount)
			}
			//++ [EXCEPTION] ++ operator permitted in Toolsmith for performance - provides step counter increment for debugging
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
