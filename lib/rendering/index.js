import { JSDOM } from "jsdom"

import renderTo from "./renderTo"

const dom = new JSDOM(`<!DOCTYPE html>`)

globalThis.document = dom.window.document

const render = (config, options = {}) => {
	renderTo(dom.window.document.body)(config)(options)

	return document.body.innerHTML
}

export default render
