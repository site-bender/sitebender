import formatter from "../../../format"
import collectDependencies from "../../../rendering/helpers/collectDependencies/index.ts"

const FROM_VALUE = ["DATA", "INPUT", "SELECT", "TEXTAREA"]

const addFormatter = (element) => (fmt) => {
	const selectors = collectDependencies(fmt)
	const format = formatter(fmt)

	element.__sbFormat = async function () {
		const arg = FROM_VALUE.includes(this.tagName) ? this.value : this.innerHTML
		const formatted = await format(arg)

		return formatted
	}

	element.dataset.format = JSON.stringify(fmt)

	document.__sbFormatters ??= new Set()
	document.__sbFormatters.add(element.id)

	// console.log("selectors", selectors)
	// console.log("__sbFormatters", document.__sbFormatters)

	selectors.forEach((selector) => {
		document.__sbFormatted ??= {}
		document.__sbFormatted[selector] ??= new Set()
		document.__sbFormatted[selector].add(element.id)
	})
}

export default addFormatter
