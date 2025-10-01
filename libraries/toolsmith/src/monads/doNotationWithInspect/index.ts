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
			if (depth > maxDepth) return "..."

			if (value === null) return "null"
			if (value === undefined) return "undefined"

			const type = typeof value

			if (type === "object") {
				if (Array.isArray(value)) {
					return `[${value.map((v) => formatValue(v, depth + 1)).join(", ")}]`
				}
				const entries = Object.entries(value)
					.map(([k, v]) => `${k}: ${formatValue(v, depth + 1)}`)
					.join(", ")
				return `{ ${entries} }`
			}

			if (type === "string") return `"${value}"`
			return String(value)
		}

		const inspect = (value: unknown, step: number): void => {
			if (filter && !filter(value)) return

			const formatted = formatValue(value)
			const typeInfo = showTypes ? ` (${typeof value})` : ""
			console.log(`[${label}:${step}]${typeInfo}: ${formatted}`)
		}

		let stepCount = 0

		function stepWithInspect(value: unknown): M {
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
