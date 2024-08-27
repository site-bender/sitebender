import { JSDOM } from "jsdom"

import addConditionals from "./addConditionals"
import addScripts from "./addScripts"
import addStylesheets from "./addStylesheets"
import buildDomTree from "./buildDomTree"
import convertSelectorsToIds from "./convertSelectorsToIds"
import runAllCalculations from "./runAllCalculations"
import runAllDisplayCallbacks from "./runAllDisplayCallbacks"
import runAllFormatters from "./runAllFormatters"

const dom = new JSDOM(`<!DOCTYPE html>`)

globalThis.document = dom.window.document

const render = (config, options = {}) => {
	const opts = { level: 0, ...options }

	addStylesheets(config)

	const temp = document.createElement("Template")

	buildDomTree(temp)(config)(opts)
	addConditionals(temp)(config)

	Array.from(temp.children).forEach(child => document.body.appendChild(child))

	addScripts(config)

	temp.remove()
	convertSelectorsToIds()
	runAllCalculations()
	runAllFormatters()
	runAllDisplayCallbacks()

	return document.body.innerHTML
}

export default render
