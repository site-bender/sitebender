import deduplicate from "../deduplicate"

const collectScriptElements = config => {
	const elements = Array.isArray(config) ? config : [config]

	return deduplicate(
		elements.reduce((out, element) => {
			const children = element.children || []
			const links = collectScriptElements(children)
			const scripts = element["scripts"] || []

			return out.concat(scripts).concat(links)
		}, []),
	)
}

export default collectScriptElements
