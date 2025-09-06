import {
	assertStringIncludes,
} from "https://deno.land/std@0.224.0/assert/mod.ts"

import createElement from "../../src/helpers/createElement/index.ts"
import ContactForm from "../../src/interact/forms/ContactForm/index.tsx"

function toAttrs(props: Record<string, unknown> = {}) {
	return Object.entries(props)
		.filter(([k, v]) => k !== "children" && v !== undefined && v !== false)
		.map(([k, v]) => `${k}="${String(v)}"`)
		.join(" ")
}

function renderToString(node: unknown): string {
	if (node === null || node === undefined) return ""
	if (typeof node === "string" || typeof node === "number") {
		return String(node)
	}
	if (Array.isArray(node)) return node.map(renderToString).join("")

	if (
		typeof node === "object" && node !== null && "type" in node &&
		"props" in node && typeof (node as { type: unknown }).type === "string"
	) {
		const { type, props } = node as {
			type: string
			props: Record<string, unknown>
		}
		const attrs = toAttrs(props)
		const children = props?.children
		const childStr = Array.isArray(children)
			? children.map(renderToString).join("")
			: renderToString(children)
		if (["input", "br", "meta", "link"].includes(type)) {
			return `<${type}${attrs ? " " + attrs : ""} />`
		}
		return `<${type}${attrs ? " " + attrs : ""}>${childStr}</${type}>`
	}

	return ""
}

Deno.test("ContactForm renders semantic and microdata attributes", () => {
	const cf = createElement(ContactForm, { action: "/contact" }) as {
		type: string
		props: Record<string, unknown>
	}
	const html = renderToString(cf)

	assertStringIncludes(html, "<form")
	assertStringIncludes(html, 'action="/contact"')
	assertStringIncludes(html, "itemscope")
	assertStringIncludes(html, 'itemtype="https://schema.org/ContactForm"')

	// Has a submit button
	assertStringIncludes(html, "<button")
})
