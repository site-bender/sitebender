import {
	DOMParser,
	Element,
	HTMLDocument,
} from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"
import { assertEquals } from "jsr:@std/assert"
import fc from "npm:fast-check"

import collectScriptElements from "./index.ts"

// Helper to create a real DOM document for testing
const setupDocument = (html: string): HTMLDocument => {
	const parser = new DOMParser()
	const doc = parser.parseFromString(
		`<!DOCTYPE html><html><head></head><body>${html}</body></html>`,
		"text/html",
	)
	if (!doc) throw new Error("Failed to create document")
	return doc as HTMLDocument
}

// Helper to create component data from DOM attributes
const createComponentFromElement = (
	element: Element,
): Record<string, unknown> => {
	const component: Record<string, unknown> = {}

	// Extract scripts from data-scripts attribute
	const scriptsAttr = element.getAttribute("data-scripts")
	if (scriptsAttr) {
		component.scripts = scriptsAttr.split(",").map((script) =>
			script.trim()
		)
	}

	// Extract children from child elements
	const children = Array.from(element.children).map((child) =>
		createComponentFromElement(child as Element)
	)
	if (children.length > 0) {
		component.children = children
	}

	return component
}

Deno.test("collectScriptElements basic functionality", async (t) => {
	await t.step("should return empty array for empty component", () => {
		const doc = setupDocument(`<div id="empty"></div>`)
		const element = doc.getElementById("empty")!
		const component = createComponentFromElement(element)

		const result = collectScriptElements(component)
		assertEquals(result, [])
	})

	await t.step("should collect scripts from root level", () => {
		const doc = setupDocument(
			`<div id="root" data-scripts="script1.js,script2.js,script3.js"></div>`,
		)
		const element = doc.getElementById("root")!
		const component = createComponentFromElement(element)

		const result = collectScriptElements(component)
		assertEquals(result, ["script1.js", "script2.js", "script3.js"])
	})

	await t.step("should ignore non-script attributes", () => {
		const doc = setupDocument(
			`<div id="test" class="container" data-dependencies="style.css" data-scripts="app.js"></div>`,
		)
		const element = doc.getElementById("test")!
		const component = createComponentFromElement(element)
		component.tag = "div"
		component.attributes = { id: "test" }
		component.content = "hello"
		component.dependencies = ["style.css"]

		const result = collectScriptElements(component)
		assertEquals(result, ["app.js"])
	})

	await t.step("should handle component with no scripts or children", () => {
		const doc = setupDocument(
			`<div id="container" class="container" data-dependencies="style.css"></div>`,
		)
		const element = doc.getElementById("container")!
		const component = createComponentFromElement(element)
		component.tag = "div"
		component.attributes = { class: "container" }
		component.dependencies = ["style.css"]

		const result = collectScriptElements(component)
		assertEquals(result, [])
	})
})

Deno.test("collectScriptElements children traversal", async (t) => {
	await t.step("should collect scripts from direct children", () => {
		const doc = setupDocument(`
			<div id="parent">
				<div data-scripts="child1.js"></div>
				<div data-scripts="child2.js,child3.js"></div>
			</div>
		`)
		const element = doc.getElementById("parent")!
		const component = createComponentFromElement(element)

		const result = collectScriptElements(component)
		assertEquals(result, ["child1.js", "child2.js", "child3.js"])
	})

	await t.step("should collect scripts from nested children", () => {
		const doc = setupDocument(`
			<div id="parent">
				<div data-scripts="level1.js">
					<div data-scripts="level2.js">
						<div data-scripts="level3.js"></div>
					</div>
				</div>
			</div>
		`)
		const element = doc.getElementById("parent")!
		const component = createComponentFromElement(element)

		const result = collectScriptElements(component)
		assertEquals(result, ["level1.js", "level2.js", "level3.js"])
	})

	await t.step(
		"should handle mixed children with and without scripts",
		() => {
			const doc = setupDocument(`
			<div id="parent">
				<div></div>
				<div data-scripts="script1.js"></div>
				<span id="test"></span>
				<div data-scripts="script2.js,script3.js"></div>
			</div>
		`)
			const element = doc.getElementById("parent")!
			const component = createComponentFromElement(element)

			const result = collectScriptElements(component)
			assertEquals(result, ["script1.js", "script2.js", "script3.js"])
		},
	)

	await t.step("should handle empty children array", () => {
		const doc = setupDocument(`<div id="empty"></div>`)
		const element = doc.getElementById("empty")!
		const component = createComponentFromElement(element)

		const result = collectScriptElements(component)
		assertEquals(result, [])
	})

	await t.step("should handle null/undefined children", () => {
		const component1 = { children: null }
		const component2 = { children: undefined }

		assertEquals(collectScriptElements(component1), [])
		assertEquals(collectScriptElements(component2), [])
	})
})

Deno.test("collectScriptElements combined scenarios", async (t) => {
	await t.step("should collect scripts from both root and children", () => {
		const doc = setupDocument(`
			<div id="root" data-scripts="main.js,utils.js">
				<div data-scripts="component1.js"></div>
				<div data-scripts="component2.js">
					<div data-scripts="nested.js"></div>
				</div>
			</div>
		`)
		const element = doc.getElementById("root")!
		const component = createComponentFromElement(element)

		const result = collectScriptElements(component)
		assertEquals(result, [
			"main.js",
			"utils.js",
			"component1.js",
			"component2.js",
			"nested.js",
		])
	})

	await t.step("should preserve order of collection", () => {
		const doc = setupDocument(`
			<div id="root" data-scripts="first.js">
				<div data-scripts="second.js"></div>
				<div>
					<div data-scripts="third.js"></div>
				</div>
				<div data-scripts="fourth.js"></div>
			</div>
		`)
		const element = doc.getElementById("root")!
		const component = createComponentFromElement(element)

		const result = collectScriptElements(component)
		assertEquals(result, ["first.js", "second.js", "third.js", "fourth.js"])
	})

	await t.step(
		"should handle complex nested structure with mixed content",
		() => {
			const doc = setupDocument(`
			<div id="root" data-scripts="root.js" data-dependencies="style.css">
				<header data-scripts="header.js" data-dependencies="header.css">
					<nav data-scripts="nav.js"></nav>
				</header>
				<main>
					<section data-scripts="section.js">
						<article data-scripts="article.js"></article>
					</section>
				</main>
			</div>
		`)
			const element = doc.getElementById("root")!
			const component = createComponentFromElement(element)
			component.tag = "div"
			component.dependencies = ["style.css"] // Should be ignored

			const result = collectScriptElements(component)
			assertEquals(result, [
				"root.js",
				"header.js",
				"nav.js",
				"section.js",
				"article.js",
			])
		},
	)
})

Deno.test("collectScriptElements edge cases", async (t) => {
	await t.step("should handle different script value types", () => {
		const doc = setupDocument(
			`<div id="root" data-scripts="string-script.js,/path/to/script.js,https://cdn.example.com/lib.js"></div>`,
		)
		const element = doc.getElementById("root")!
		const component = createComponentFromElement(element)

		const result = collectScriptElements(component)
		assertEquals(result, [
			"string-script.js",
			"/path/to/script.js",
			"https://cdn.example.com/lib.js",
		])
	})

	await t.step("should handle deeply nested structures", () => {
		let nested: { scripts?: unknown[]; children?: unknown[] } = {
			scripts: ["deep.js"] as unknown[],
		}

		// Create a 10-level nested structure
		for (let i = 0; i < 10; i++) {
			nested = { children: [nested] }
		}

		const component: { scripts?: unknown[]; children?: unknown[] } = {
			scripts: ["root.js"] as unknown[],
			children: [nested],
		}

		const result = collectScriptElements(component)
		assertEquals(result, ["root.js", "deep.js"])
	})

	await t.step("should handle duplicate script references", () => {
		const doc = setupDocument(`
			<div id="root" data-scripts="common.js,app.js">
				<div data-scripts="common.js,module1.js"></div>
				<div data-scripts="module2.js,app.js"></div>
			</div>
		`)
		const element = doc.getElementById("root")!
		const component = createComponentFromElement(element)

		const result = collectScriptElements(component)
		assertEquals(result, [
			"common.js",
			"app.js",
			"common.js",
			"module1.js",
			"module2.js",
			"app.js",
		])
	})

	await t.step("should handle well-formed object children", () => {
		const doc = setupDocument(`
			<div id="parent">
				<div data-scripts="valid1.js"></div>
				<div></div>
				<div data-scripts="valid2.js"></div>
				<div></div>
			</div>
		`)
		const element = doc.getElementById("parent")!
		const component = createComponentFromElement(element)

		const result = collectScriptElements(component)
		assertEquals(result, ["valid1.js", "valid2.js"])
	})

	await t.step("should handle empty scripts array", () => {
		const component = {
			scripts: [],
			children: [
				{ scripts: [] },
				{ scripts: ["valid.js"] },
				{ scripts: [] },
			],
		}

		const result = collectScriptElements(component)
		assertEquals(result, ["valid.js"])
	})
})

Deno.test("collectScriptElements realistic scenarios", async (t) => {
	await t.step("should handle typical web application structure", () => {
		const doc = setupDocument(`
			<div id="root">
				<div data-scripts="polyfills.js,vendor.js">
					<div charset="utf-8"></div>
				</div>
				<div data-scripts="app.js">
					<header data-scripts="header.js">
						<nav data-scripts="nav.js,dropdown.js"></nav>
					</header>
					<main>
						<section data-scripts="analytics.js"></section>
					</main>
					<footer data-scripts="footer.js"></footer>
				</div>
			</div>
		`)
		const element = doc.getElementById("root")!
		const component = createComponentFromElement(element)

		const result = collectScriptElements(component)
		assertEquals(result, [
			"polyfills.js",
			"vendor.js",
			"app.js",
			"header.js",
			"nav.js",
			"dropdown.js",
			"analytics.js",
			"footer.js",
		])
	})

	await t.step("should handle SPA component structure", () => {
		const doc = setupDocument(`
			<div id="root" data-scripts="react.js,react-dom.js">
				<div data-component="App" data-scripts="app-bundle.js">
					<div data-component="Router" data-scripts="router.js">
						<div data-component="HomePage" data-scripts="home.chunk.js"></div>
						<div data-component="AboutPage" data-scripts="about.chunk.js"></div>
					</div>
				</div>
			</div>
		`)
		const element = doc.getElementById("root")!
		const component = createComponentFromElement(element)

		const result = collectScriptElements(component)
		assertEquals(result, [
			"react.js",
			"react-dom.js",
			"app-bundle.js",
			"router.js",
			"home.chunk.js",
			"about.chunk.js",
		])
	})

	await t.step("should handle form with interactive elements", () => {
		const doc = setupDocument(`
			<form id="root" data-scripts="form-validation.js">
				<fieldset>
					<input data-scripts="input-mask.js,autocomplete.js">
					<select data-scripts="select2.js"></select>
				</fieldset>
				<button data-scripts="button-loading.js"></button>
			</form>
		`)
		const element = doc.getElementById("root")!
		const component = createComponentFromElement(element)

		const result = collectScriptElements(component)
		assertEquals(result, [
			"form-validation.js",
			"input-mask.js",
			"autocomplete.js",
			"select2.js",
			"button-loading.js",
		])
	})
})

Deno.test("collectScriptElements property-based tests", () => {
	fc.assert(
		fc.property(
			fc.array(
				fc.string({ minLength: 1, maxLength: 20 }).map((s) =>
					s + ".js"
				),
			),
			(scripts) => {
				const component = { scripts }
				const result = collectScriptElements(component)
				assertEquals(result, scripts)
			},
		),
		{ numRuns: 100 },
	)

	fc.assert(
		fc.property(
			fc.array(fc.array(
				fc.string({ minLength: 1, maxLength: 20 }).map((s) =>
					s + ".js"
				),
			)),
			(childScripts) => {
				const children = childScripts.map((scripts) => ({ scripts }))
				const component = { children }
				const result = collectScriptElements(component)
				const expected = childScripts.flat()
				assertEquals(result, expected)
			},
		),
		{ numRuns: 50 },
	)

	fc.assert(
		fc.property(
			fc.array(
				fc.string({ minLength: 1, maxLength: 10 }).map((s) =>
					s + ".js"
				),
			),
			fc.array(
				fc.array(
					fc.string({ minLength: 1, maxLength: 10 }).map((s) =>
						s + ".js"
					),
				),
			),
			(rootScripts, childScripts) => {
				const children = childScripts.map((scripts) => ({ scripts }))
				const component = { scripts: rootScripts, children }
				const result = collectScriptElements(component)
				const expected = [...rootScripts, ...childScripts.flat()]
				assertEquals(result, expected)
			},
		),
		{ numRuns: 30 },
	)

	fc.assert(
		fc.property(
			fc.integer({ min: 1, max: 5 }),
			fc.array(
				fc.string({ minLength: 1, maxLength: 10 }).map((s) =>
					s + ".js"
				),
			),
			(depth, scripts) => {
				// Create nested structure of specified depth
				let component: unknown = { scripts }
				for (let i = 0; i < depth; i++) {
					component = { children: [component] } as unknown
				}

				const result = collectScriptElements(
					component as Record<string, unknown>,
				)
				assertEquals(result, scripts)
			},
		),
		{ numRuns: 20 },
	)
})
