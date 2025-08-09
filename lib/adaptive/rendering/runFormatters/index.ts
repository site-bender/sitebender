import concat from "../../utilities/array/concat"
import unique from "../../utilities/array/unique.js"

const runFormatters = () => {
	const formats = Object.entries(document.__sbFormatted || {})

	let elementIds = []

	document.__sbFormatted = Object.fromEntries(
		formats.map(([selector, ids]) => {
			const elem = document.querySelector(selector)

			elementIds = concat(elementIds)([...ids])

			return [elem?.id, ids]
		}),
	)

	unique(elementIds).forEach(async (id) => {
		const elem = document.getElementById(id)

		elem.__sbFormat && (await elem.__sbFormat(elem.value))
	})
}

export default runFormatters
