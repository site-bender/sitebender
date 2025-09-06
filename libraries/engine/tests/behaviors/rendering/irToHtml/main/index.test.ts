import { assert, assertStringIncludes } from "jsr:@std/assert"

import type { ElementNode, IrDocument } from "../../../types/ir/index.ts"

import createDeterministicIdGenerator from "../../utilities/nodeId/index.ts"
import renderIrToHtml from "./index.ts"

const generateId = createDeterministicIdGenerator("ir-to-html-test")
const nodeId = () => generateId()

Deno.test("[irToHtml] renders simple form suitable for progressive enhancement", async () => {
	const doc: IrDocument = {
		v: "0.1.0",
		kind: "element",
		id: nodeId(),
		tag: "form",
		attrs: { method: "POST", action: "/submit" },
		children: [
			{
				v: "0.1.0",
				kind: "element",
				id: nodeId(),
				tag: "label",
				attrs: { for: "email" },
				children: [{
					v: "0.1.0",
					kind: "injector",
					id: nodeId(),
					injector: "From.Constant",
					datatype: "String",
					args: { value: "Email" },
				}],
			} as ElementNode,
			{
				v: "0.1.0",
				kind: "element",
				id: nodeId(),
				tag: "input",
				attrs: {
					type: "email",
					id: "email",
					name: "email",
					required: true,
				},
				children: [],
			} as ElementNode,
			{
				v: "0.1.0",
				kind: "element",
				id: nodeId(),
				tag: "button",
				attrs: { type: "submit" },
				children: [{
					v: "0.1.0",
					kind: "injector",
					id: nodeId(),
					injector: "From.Constant",
					datatype: "String",
					args: { value: "Submit" },
				}],
			} as ElementNode,
		],
	}

	const html = await renderIrToHtml(doc)
	assertStringIncludes(html, '<form method="POST" action="/submit">')
	assertStringIncludes(
		html,
		'<input type="email" id="email" name="email" required="true">',
	)
	assertStringIncludes(html, '<button type="submit">Submit</button>')
	assert(html.endsWith("</form>"))
})
