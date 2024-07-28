import addConditionals from "./addConditionals"
import addScripts from "./addScripts"
import addStylesheets from "./addStylesheets"
import buildDomTree from "./buildDomTree"
import convertSelectorsToIds from "./convertSelectorsToIds"
import runAllCalculations from "./runAllCalculations"
import runAllDisplayCallbacks from "./runAllDisplayCallbacks"

const render = target => config => options => {
	const opts = { level: 0, ...options }

	addStylesheets(config)

	const temp = document.createElement("Template")

	buildDomTree(temp)(config)(opts)
	addConditionals(temp)(config)

	Array.from(temp.children).forEach(child => target.appendChild(child))

	addScripts(config)

	temp.remove()
	convertSelectorsToIds()
	runAllCalculations()
	runAllDisplayCallbacks()
}

export default render
