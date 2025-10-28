import Person from "~architect/semantics/Person/index.tsx"

import { expect } from "@std/expect"
import { describe, it } from "@std/testing/bdd"

function render(node: unknown): string {
	// Extremely small renderer for our createElement shape used in docs
	if (Array.isArray(node)) return node.map(render).join("")
	if (typeof node === "string") return node
	if (typeof node === "number") return String(node)
	if (node && typeof node === "object" && "type" in node && "props" in node) {
		const { type, props } = node as {
			type: string
			props: Record<string, unknown>
		}
		const { children, ...attrs } = props
		const attrStr = Object.entries(attrs)
			.map((
				[k, v],
			) => (v === true
				? k
				: v === false || v === null || v === undefined
				? ""
				: `${k}="${String(v)}"`)
			)
			.filter(Boolean)
			.join(" ")
		return `<${type}${attrStr ? " " + attrStr : ""}>${
			render(children as unknown)
		}</${type}>`
	}
	return ""
}

describe("Person SSR helper", () => {
	it("emits microdata and JSON-LD", () => {
		const out = render(
			<Person name="Ada Lovelace" url="https://example.com/ada" />,
		)

		expect(out).toContain("itemscope")
		expect(out).toContain('itemtype="https://schema.org/Person"')
		expect(out).toContain('itemprop="name"')
		expect(out).toContain('itemprop="url"')
		expect(out).toContain('<script type="application/ld+json"')
		expect(out).toContain('"@type":"Person"')
		expect(out).toContain('"name":"Ada Lovelace"')
		expect(out).toContain('"url":"https://example.com/ada"')
	})
})
