import addConditionals from "../addConditionals/index.ts"
import addScripts from "../addScripts/index.ts"
import addStylesheets from "../addStylesheets/index.ts"
import buildDomTree, { type ElementConfig } from "../buildDomTree/index.ts"
import convertSelectorsToIds from "../convertSelectorsToIds/index.ts"
import runAllCalculations from "../runAllCalculations/index.ts"
import runAllDisplayCallbacks from "../runAllDisplayCallbacks/index.ts"
import runAllFormatters from "../runAllFormatters/index.ts"

type RenderOptions = { level?: number }
type ArchitectConfig = Record<string, unknown>

const renderTo =
	(target: Element) =>
	(config: ArchitectConfig) =>
	(options: RenderOptions = {}) => {
		const opts = { level: 0, ...options }

		addStylesheets(config)

		const temp = document.createElement("Template")

		buildDomTree(temp)(config as unknown as ElementConfig)(opts)
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
