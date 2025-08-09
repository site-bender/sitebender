import { assertEquals, assertExists } from "@std/assert"

import Menu from "../../../../../../constructors/elements/flow/miscellaneous/Menu/index.ts"
import TextNode from "../../../../../../constructors/elements/TextNode/index.ts"

Deno.test("Menu should create a basic menu with no attributes or children", () => {
	const menu = Menu()([])
	assertEquals(menu.tag, "Menu")
	assertEquals(menu.children, [])
	assertExists(menu.attributes)
})

Deno.test("Menu should create a menu with valid global attributes", () => {
	const menu = Menu({
		id: "main-menu",
		class: "navigation-menu",
		title: "Main Navigation",
		lang: "en",
	})([])

	assertEquals(menu.tag, "Menu")
	assertEquals(menu.attributes["id"], "main-menu")
	assertEquals(menu.attributes["class"], "navigation-menu")
	assertEquals(menu.attributes["title"], "Main Navigation")
	assertEquals(menu.attributes["lang"], "en")
})

Deno.test("Menu should filter out invalid attributes", () => {
	const menu = Menu({
		id: "valid",
		href: "invalid-for-menu",
		src: "invalid-for-menu",
		invalidAttr: "should-be-filtered",
	} as any)([])

	assertEquals(menu.tag, "Menu")
	assertEquals(menu.attributes["id"], "valid")
	assertEquals(menu.attributes["href"], undefined)
	assertEquals(menu.attributes["src"], undefined)
	assertEquals((menu.attributes as any).invalidAttr, undefined)
})

Deno.test("Menu should accept li children", () => {
	const li1 = { tag: "Li", attributes: {}, children: [TextNode("Home")] }
	const li2 = { tag: "Li", attributes: {}, children: [TextNode("About")] }
	const menu = Menu()([li1, li2])

	assertEquals(menu.tag, "Menu")
	assertEquals(menu.children.length, 2)
	assertEquals(menu.children[0], li1)
	assertEquals(menu.children[1], li2)
})

Deno.test("Menu should handle navigation menu items", () => {
	const menuItems = [
		{
			tag: "Li",
			attributes: {},
			children: [{
				tag: "A",
				attributes: { href: "/" },
				children: [TextNode("Home")],
			}],
		},
		{
			tag: "Li",
			attributes: {},
			children: [{
				tag: "A",
				attributes: { href: "/about" },
				children: [TextNode("About")],
			}],
		},
		{
			tag: "Li",
			attributes: {},
			children: [{
				tag: "A",
				attributes: { href: "/contact" },
				children: [TextNode("Contact")],
			}],
		},
	]
	const menu = Menu()(menuItems)

	assertEquals(menu.tag, "Menu")
	assertEquals(menu.children.length, 3)
	assertEquals((menu.children[0] as any).tag, "Li")
	assertEquals((menu.children[1] as any).tag, "Li")
	assertEquals((menu.children[2] as any).tag, "Li")
})

Deno.test("Menu should handle single child (not array)", () => {
	const li = { tag: "Li", attributes: {}, children: [TextNode("Single Item")] }
	const menu = Menu()(li)

	assertEquals(menu.tag, "Menu")
	assertEquals(menu.children.length, 1)
	assertEquals(menu.children[0], li)
})

Deno.test("Menu should handle special properties", () => {
	const menu = Menu({
		calculation: "menuCalculation",
		dataset: { type: "navigation", role: "primary" },
		display: "block",
		scripts: ["menu-toggle.js"],
		stylesheets: ["menu.css"],
	})([])

	assertEquals(menu.tag, "Menu")
	assertEquals((menu as any).calculation, "menuCalculation")
	assertEquals((menu as any).dataset, { type: "navigation", role: "primary" })
	assertEquals((menu as any).display, "block")
	assertEquals((menu as any).scripts, ["menu-toggle.js"])
	assertEquals((menu as any).stylesheets, ["menu.css"])
})

Deno.test("Menu should handle ARIA attributes", () => {
	const menu = Menu({
		aria: {
			label: "Main navigation menu",
			expanded: "false",
		},
	})([])

	assertEquals(menu.tag, "Menu")
	assertEquals(menu.attributes["aria-label"], "Main navigation menu")
	assertEquals(menu.attributes["aria-expanded"], "false")
})

Deno.test("Menu should handle complex menu structure", () => {
	const complexMenu = [
		{
			tag: "Li",
			attributes: {},
			children: [
				{
					tag: "A",
					attributes: { href: "/products" },
					children: [TextNode("Products")],
				},
				{
					tag: "Menu",
					attributes: {},
					children: [
						{
							tag: "Li",
							attributes: {},
							children: [{
								tag: "A",
								attributes: { href: "/products/web" },
								children: [TextNode("Web")],
							}],
						},
						{
							tag: "Li",
							attributes: {},
							children: [{
								tag: "A",
								attributes: { href: "/products/mobile" },
								children: [TextNode("Mobile")],
							}],
						},
					],
				},
			],
		},
		{
			tag: "Li",
			attributes: {},
			children: [{
				tag: "A",
				attributes: { href: "/services" },
				children: [TextNode("Services")],
			}],
		},
	]
	const menu = Menu({ class: "dropdown-menu" })(complexMenu)

	assertEquals(menu.tag, "Menu")
	assertEquals(menu.children.length, 2)
	assertEquals(menu.attributes["class"], "dropdown-menu")
	assertEquals((menu.children[0] as any).tag, "Li")
	assertEquals((menu.children[1] as any).tag, "Li")
})

Deno.test("Menu should handle empty children array", () => {
	const menu = Menu()([])
	assertEquals(menu.tag, "Menu")
	assertEquals(menu.children, [])
})
