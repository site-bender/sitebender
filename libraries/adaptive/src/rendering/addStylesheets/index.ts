import collectLinkElements from "../../utilities/collectLinkElements/index.ts"
import buildDomTree from "../buildDomTree/index.ts"

const addStylesheets = (component) => {
	const head = document && document.head

	if (head) {
		const stylesheets = collectLinkElements(component)

		stylesheets.forEach((stylesheet) => buildDomTree(head)(stylesheet)())
	}
}

export default addStylesheets
