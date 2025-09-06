import concat from "@sitebender/toolkit/simple/array/concat/index.ts"
import unique from "@sitebender/toolkit/simple/array/unique/index.ts"

const runCalculations = () => {
	const calculations = Object.entries(
		document.__sbCalculations || {},
	) as Array<
		[
			string,
			Set<string>,
		]
	>

	let elements: string[] = []

	document.__sbCalculations = Object.fromEntries(
		calculations.map(([selector, ids]) => {
			const elem = document.querySelector(selector) as HTMLElement | null

			elements = concat(elements)([...ids])

			return [elem?.id ?? selector, ids]
		}),
	)

	unique(elements).forEach(async (id: string) => {
		const elem = document.getElementById(id) as
			| (HTMLElement & {
				__sbCalculate?: (arg?: unknown) => Promise<unknown> | unknown
				value?: string
			})
			| null

		if (elem?.__sbCalculate) {
			await elem.__sbCalculate(
				(elem as
					| HTMLInputElement
					| HTMLTextAreaElement
					| HTMLSelectElement)
					.value,
			)
		}
	})
}

export default runCalculations
