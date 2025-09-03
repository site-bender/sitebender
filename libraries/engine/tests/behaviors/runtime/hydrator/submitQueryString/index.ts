import { assert, assertStringIncludes } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import type {
	ActionNode,
	EventBindingNode,
	InjectorNode,
	IrDocument,
} from "../../../../../types/ir/index.ts"

import createComposeContext from "../../../../../src/context/composeContext/index.ts"
import registerDefaultExecutors from "../../../../../src/operations/defaults/registerDefaults/index.ts"
import hydrate from "../../../../../src/runtime/hydrator/index.ts"
import createTestDomWithBody from "../../../../helpers/createTestDom/createTestDomWithBody/index.ts"

function embedIr(doc: IrDocument) {
	return `<script id="ir-root" type="application/engine+json">${
		JSON.stringify(doc)
	}</script>`
}

describe("hydrate - submit sets query string via Act.SetQueryString", () => {
	it("On.Submit triggers SetQueryString action", async () => {
		const evtId = "evt_form_submit"
		const irDoc: IrDocument = {
			v: "0.1.0",
			kind: "element",
			id: "root",
			tag: "div",
			attrs: {},
			children: [
				{
					v: "0.1.0",
					kind: "on",
					id: evtId,
					event: "On.Submit",
					handler: {
						v: "0.1.0",
						kind: "action",
						id: "a1",
						action: "Act.SetQueryString",
						args: [
							{
								v: "0.1.0",
								kind: "injector",
								id: "k",
								injector: "From.Constant",
								datatype: "String",
								args: { value: "k" },
							} as InjectorNode,
							{
								v: "0.1.0",
								kind: "injector",
								id: "v",
								injector: "From.Constant",
								datatype: "String",
								args: { value: "v" },
							} as InjectorNode,
						],
					} as ActionNode,
				} as EventBindingNode,
			],
		}

		const body = `
      <form id="f" data-ir-id="${evtId}"><button type="submit">Go</button></form>
      ${embedIr(irDoc)}
    `

		const { document, window } = createTestDomWithBody(body) // Provide globals for hydrate + action
		 // deno-lint-ignore no-explicit-any
		;(globalThis as any).document = document as unknown as Document
		// Capture replaceState calls
		const calls: Array<{ url: string }> = [] // deno-lint-ignore no-explicit-any
		;(globalThis as any).history = {
			replaceState: (_s: unknown, _t: string, url: string) => {
				calls.push({ url })
			},
		} // deno-lint-ignore no-explicit-any
		;(globalThis as any).location = window.location

		const ctx = createComposeContext({ env: "client" })
		registerDefaultExecutors(ctx)

		const scriptDoc = document.getElementById("ir-root")
		if (!scriptDoc) throw new Error("IR script missing")

		// Hydrate
		// deno-lint-ignore no-explicit-any
		hydrate(JSON.parse(scriptDoc.textContent || "") as any, ctx)

		// Submit the form
		const formEl = document.getElementById("f")
		assert(formEl)
		formEl!.dispatchEvent(new Event("submit"))

		// Wait a tick for async handler
		await new Promise((r) => setTimeout(r, 0))

		// Assert history.replaceState called with ?k=v
		const last = calls.at(-1)
		assert(last)
		assertStringIncludes(last!.url, "?k=v")
	})
})
