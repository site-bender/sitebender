import { assertEquals } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"

import type {
	ActionNode,
	EventBindingNode,
	InjectorNode,
	IrDocument,
} from "../../../../types/ir/index.ts"

import { createComposeContext } from "../../../../src/context/composeContext/index.ts"
import { registerDefaultExecutors } from "../../../../src/operations/defaults/registerDefaults/index.ts"
import hydrate from "../../../../src/runtime/hydrator/index.ts"
import createTestDomWithBody from "../../../helpers/createTestDom/createTestDomWithBody/index.ts"

function embedIr(doc: IrDocument) {
	return `<script id="ir-root" type="application/adaptive+json">${
		JSON.stringify(doc)
	}</script>`
}

describe("hydrate - binds event and dispatches action", () => {
	it("click handler updates text via Act.SetValue", async () => {
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
					id: "h1",
					event: "On.Click",
					handler: {
						v: "0.1.0",
						kind: "action",
						id: "a1",
						action: "Act.SetValue",
						args: [
							{
								v: "0.1.0",
								kind: "injector",
								id: "sel",
								injector: "From.Constant",
								datatype: "String",
								args: { value: "#target" },
							} as InjectorNode,
							{
								v: "0.1.0",
								kind: "injector",
								id: "val",
								injector: "From.Constant",
								datatype: "String",
								args: { value: "new" },
							} as InjectorNode,
						],
					} as ActionNode,
				} as EventBindingNode,
			],
		}

		const body = `
      <div id="target">old</div>
      <button id="btn" data-ir-id="h1">Click</button>
      ${embedIr(irDoc)}
    `

		const { document, window } = createTestDomWithBody(body)
		// @ts-ignore provide globals for hydrate
		globalThis.document = document as unknown as Document // @ts-ignore minimal history/location for SetQueryString if used
		 // deno-lint-ignore no-explicit-any
		;(globalThis as any).history = { replaceState: () => {} } // deno-lint-ignore no-explicit-any
		;(globalThis as any).location = window.location

		// Register defaults and add On.Click binder (not part of defaults)
		const ctx = createComposeContext({ env: "client" })
		registerDefaultExecutors(ctx)
		// Simple On.Click binder
		// deno-lint-ignore no-explicit-any
		const { registerEvent } = await import(
			"../../../../src/operations/registries/events.ts"
		) as any
		registerEvent(
			"On.Click",
			(el: HTMLElement, _node: EventBindingNode, dispatch: () => void) => {
				el.addEventListener("click", dispatch as EventListener)
			},
		)

		const scriptDoc = document.getElementById("ir-root")
		if (!scriptDoc) throw new Error("IR script missing")

		// Hydrate
		// deno-lint-ignore no-explicit-any
		hydrate(JSON.parse(scriptDoc.textContent || "") as any, ctx)

		// Dispatch click
		const btn = document.getElementById("btn")!
		btn.dispatchEvent(new Event("click"))
		// Wait a tick for async handler to complete
		await new Promise((r) => setTimeout(r, 0))
		const target = document.getElementById("target")!
		assertEquals(target.textContent, "new")
	})
})
