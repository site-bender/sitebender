//++ Tests submit query string hydration (Act.SetQueryString via On.Submit)
import { assert, assertStringIncludes } from "jsr:@std/assert@1"

import type {
	ActionNode,
	EventBindingNode,
	InjectorNode,
	IrDocument,
} from "../../../../types/ir/index.ts"

import createTestDomWithBody from "@sitebender/toolsmith/testing/dom/createTestDomWithBody.ts"
import createComposeContext from "../../../context/composeContext/index.ts"
import registerDefaultExecutors from "../../../operations/defaults/registerDefaults/index.ts"
import hydrate from "../index.ts"

const embedIr = (doc: IrDocument) =>
	`<script id=\"ir-root\" type=\"application/architect+json\">${
		JSON.stringify(doc)
	}</script>`

Deno.test("hydrate submit sets query string", async () => {
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

	const body =
		`<form id=\"f\" data-ir-id=\"${evtId}\"><button type=\"submit\">Go</button></form>${
			embedIr(irDoc)
		}`
	const { document, window } = createTestDomWithBody(body) // deno-lint-ignore no-explicit-any
	;(globalThis as any).document = document as unknown as Document
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
	// deno-lint-ignore no-explicit-any
	hydrate(JSON.parse(scriptDoc.textContent || "") as any, ctx)

	const formEl = document.getElementById("f")
	assert(formEl)
	formEl!.dispatchEvent(new Event("submit"))
	await new Promise((r) => setTimeout(r, 0))
	const last = calls.at(-1)
	assert(last)
	assertStringIncludes(last!.url, "?k=v")
})
