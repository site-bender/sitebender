import unique from "../unique"

export default function mapAttributes(attributes, classes = []) {
	const { "class": cls, "class:list": cList = [], ...attrs } = attributes || {}

	const classList = unique([
		...(cls ? [cls] : []),
		...(Array.isArray(cList) ? cList : []),
		...classes,
	])

	return {
		...attributes,
		class: classList.join(" "),
		...attrs,
	}
}
