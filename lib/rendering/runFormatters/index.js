import concat from "../../utilities/array/concat"
import unique from "../../utilities/array/unique"

const runFormatters = () => {
	const formats = Object.entries(document.__sbFormatted || {})

	let elements = []

	document.__sbFormatted = Object.fromEntries(
		formats.map(([selector, ids]) => {
			const elem = document.querySelector(selector)

			elements = concat(elements)([...ids])

			return [elem?.id, ids]
		}),
	)

	unique(elements).forEach(async id => {
		const elem = document.getElementById(id)

		elem.__sbFormat && (await elem.__sbFormat(elem.value))
	})
}

export default runFormatters
