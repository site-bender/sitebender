import concat from "@sitebender/toolsmith/vanilla/array/concat/index.ts"
import unique from "@sitebender/toolsmith/vanilla/array/unique/index.ts"

const runFormatters = () => {
	const formats = Object.entries(document.__sbFormatted || {}) as Array<[
		string,
		Set<string>,
	]>

	let elementIds: string[] = []

	document.__sbFormatted = Object.fromEntries(
		formats.map(([selector, ids]) => {
			const elem = document.querySelector(selector) as HTMLElement | null

			elementIds = concat(elementIds)([...ids])

			return [elem?.id ?? selector, ids]
		}),
	)

	unique(elementIds).forEach(async (id: string) => {
		const elem = document.getElementById(id) as
			| (HTMLElement & {
				__sbFormat?: (arg?: unknown) => Promise<unknown> | unknown
				value?: string
			})
			| null

		if (elem?.__sbFormat) {
			await elem.__sbFormat(
				(elem as
					| HTMLInputElement
					| HTMLTextAreaElement
					| HTMLSelectElement)
					.value,
			)
		}
	})
}

export default runFormatters
