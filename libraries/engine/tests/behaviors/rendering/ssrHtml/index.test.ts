import { assertStringIncludes } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import type { ElementNode, InjectorNode } from "../../../types/ir/index.ts"

import renderHtml from "../../../src/runtime/render/html/index.ts"
import createDeterministicIdGenerator from "../../../src/utilities/nodeId/index.ts"

const nodeId = createDeterministicIdGenerator("ssr-html-test")

describe("SSR HTML renderer", () => {
	it("renders minimal form with static content", async () => {
		const form: ElementNode = {
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
					tag: "button",
					attrs: { type: "submit" },
					children: [
						{
							v: "0.1.0",
							kind: "injector",
							id: nodeId(),
							injector: "From.Constant",
							datatype: "String",
							args: { value: "Submit" },
						} as InjectorNode,
					],
				},
			],
		}

		const html = await renderHtml(form)
		assertStringIncludes(html, '<form method="POST" action="/submit">')
		assertStringIncludes(html, '<button type="submit">Submit</button>')
	})
})
