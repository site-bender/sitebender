import deduplicate from "../deduplicate"

const collectLinkElements = config => {
	const elements = Array.isArray(config) ? config : [config]

	return deduplicate(
		elements.reduce((out, element) => {
			const children = element.children || []
			const links = collectLinkElements(children)
			const stylesheets = element["stylesheets"] || []

			return out.concat(stylesheets).concat(links)
		}, []),
	)
}

export default collectLinkElements
