import collectLinkElements from "../../utilities/collectLinkElements"
import buildDomTree from "../buildDomTree"

const addStylesheets = component => {
	const head = document && document.head

	if (head) {
		const stylesheets = collectLinkElements(component)

		stylesheets.forEach(stylesheet => buildDomTree(head)(stylesheet)())
	}
}

export default addStylesheets
