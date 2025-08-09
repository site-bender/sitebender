import addConditionals from "../addConditionals"
import addScripts from "../addScripts"
import addStylesheets from "../addStylesheets"
import buildDomTree from "../buildDomTree"
import convertSelectorsToIds from "../convertSelectorsToIds"
import runAllCalculations from "../runAllCalculations"
import runAllDisplayCallbacks from "../runAllDisplayCallbacks"
import runAllFormatters from "../runAllFormatters.js"

const renderTo = (target) => (config) => (options) => {
	const opts = { level: 0, ...options }

	addStylesheets(config)

	const temp = document.createElement("Template")

	buildDomTree(temp)(config)(opts)
	addConditionals(temp)(config)

	Array.from(temp.children).forEach((child) => target.appendChild(child))

	addScripts(config)

	temp.remove()
	convertSelectorsToIds()
	runAllCalculations()
	runAllFormatters()
	runAllDisplayCallbacks()
}

export default renderTo
