import {
	assertStringIncludes,
} from "https://deno.land/std@0.224.0/assert/mod.ts"

import createElement from "../../src/helpers/createElement/index.ts"
import Button from "../../src/interact/buttons/Button/index.tsx"
import Input from "../../src/interact/forms/elements/Input/index.tsx"
import Field from "../../src/interact/forms/Field/index.tsx"
import Form from "../../src/interact/forms/Form/index.tsx"

// Helper to stringify the simple VDOM to HTML-ish string for assertions
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

Deno.test("Form works without JavaScript and supports POST/GET", () => {
	const form = createElement(
		Form,
		{ method: "POST", action: "/submit" },
		createElement(Input, { name: "email", type: "email", required: true }),
		createElement(Button, { type: "submit" }, "Submit"),
	) as { type: string; props: Record<string, unknown> }

	const html = renderToString(form)
	assertStringIncludes(html, "<form")
	assertStringIncludes(html, 'method="POST"')
	assertStringIncludes(html, 'action="/submit"')
	assertStringIncludes(html, "<input")
	assertStringIncludes(html, 'type="submit"')
})

Deno.test("Form includes Schema.org ContactForm microdata when enabled", () => {
	const form = createElement(
		Form,
		{
			includeContactFormMicrodata: true,
			method: "POST",
			action: "/contact",
		},
	) as { type: string; props: Record<string, unknown> }
	const html = renderToString(form)
	assertStringIncludes(html, "itemscope")
	assertStringIncludes(html, 'itemtype="https://schema.org/ContactForm"')
})

Deno.test("Input supports required and error aria attributes via Field wrapper", () => {
	const field = createElement(
		Field,
		{
			name: "email",
			label: "Email",
			type: "email",
			required: true,
			error: "Invalid email",
		},
	) as { type: string; props: Record<string, unknown> }
	const html = renderToString(field)
	assertStringIncludes(html, 'aria-required="true"')
	assertStringIncludes(html, 'aria-invalid="true"')
	assertStringIncludes(html, '-error"')
})

Deno.test("Button supports loading and pressed states with ARIA", () => {
	const btn = createElement(Button, {
		type: "button",
		loading: true,
		pressed: true,
		label: "Save",
	}) as { type: string; props: Record<string, unknown> }
	const html = renderToString(btn)
	assertStringIncludes(html, 'aria-busy="true"')
	assertStringIncludes(html, 'aria-pressed="true"')
	assertStringIncludes(html, ">Loading...<")
})
