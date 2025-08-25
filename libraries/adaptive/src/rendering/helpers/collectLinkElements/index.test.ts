import {
	DOMParser,
	Element,
	HTMLDocument,
} from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"
import { assertEquals } from "jsr:@std/assert"
import fc from "npm:fast-check"

import collectLinkElements from "./index.ts"

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
const createComponentFromElement = (element: Element): Record<string, any> => {
	const component: Record<string, any> = {}

	// Extract dependencies from data-dependencies attribute
	const depsAttr = element.getAttribute("data-dependencies")
	if (depsAttr) {
		component.dependencies = depsAttr.split(",").map((dep) => dep.trim())
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

Deno.test("collectLinkElements basic functionality", async (t) => {
	await t.step("should return empty array for empty component", () => {
		const doc = setupDocument(`<div id="empty"></div>`)
		const element = doc.getElementById("empty")!
		const component = createComponentFromElement(element)

		const result = collectLinkElements(component)
		assertEquals(result, [])
	})

	await t.step("should collect dependencies from root level", () => {
		const doc = setupDocument(
			`<div id="root" data-dependencies="dep1,dep2,dep3"></div>`,
		)
		const element = doc.getElementById("root")!
		const component = createComponentFromElement(element)

		const result = collectLinkElements(component)
		assertEquals(result, ["dep1", "dep2", "dep3"])
	})

	await t.step("should ignore non-dependency attributes", () => {
		const doc = setupDocument(
			`<div id="test" class="container" data-dependencies="dep1"></div>`,
		)
		const element = doc.getElementById("test")!
		const component = createComponentFromElement(element)
		component.tag = "div"
		component.attributes = { class: "container" }
		component.content = "hello"

		const result = collectLinkElements(component)
		assertEquals(result, ["dep1"])
	})

	await t.step(
		"should handle component with no dependencies or children",
		() => {
			const doc = setupDocument(`<div id="container" class="container"></div>`)
			const element = doc.getElementById("container")!
			const component = createComponentFromElement(element)
			component.tag = "div"
			component.attributes = { class: "container" }

			const result = collectLinkElements(component)
			assertEquals(result, [])
		},
	)
})

Deno.test("collectLinkElements children traversal", async (t) => {
	await t.step("should collect dependencies from direct children", () => {
		const doc = setupDocument(`
			<div id="parent">
				<div data-dependencies="child-dep1"></div>
				<div data-dependencies="child-dep2,child-dep3"></div>
			</div>
		`)
		const element = doc.getElementById("parent")!
		const component = createComponentFromElement(element)

		const result = collectLinkElements(component)
		assertEquals(result, ["child-dep1", "child-dep2", "child-dep3"])
	})

	await t.step("should collect dependencies from nested children", () => {
		const doc = setupDocument(`
			<div id="parent">
				<div data-dependencies="level1-dep">
					<div data-dependencies="level2-dep">
						<div data-dependencies="level3-dep"></div>
					</div>
				</div>
			</div>
		`)
		const element = doc.getElementById("parent")!
		const component = createComponentFromElement(element)

		const result = collectLinkElements(component)
		assertEquals(result, ["level1-dep", "level2-dep", "level3-dep"])
	})

	await t.step(
		"should handle mixed children with and without dependencies",
		() => {
			const doc = setupDocument(`
			<div id="parent">
				<div></div>
				<div data-dependencies="dep1"></div>
				<span id="test"></span>
				<div data-dependencies="dep2,dep3"></div>
			</div>
		`)
			const element = doc.getElementById("parent")!
			const component = createComponentFromElement(element)

			const result = collectLinkElements(component)
			assertEquals(result, ["dep1", "dep2", "dep3"])
		},
	)

	await t.step("should handle empty children array", () => {
		const doc = setupDocument(`<div id="empty"></div>`)
		const element = doc.getElementById("empty")!
		const component = createComponentFromElement(element)

		const result = collectLinkElements(component)
		assertEquals(result, [])
	})

	await t.step("should handle null/undefined children", () => {
		const component1 = { children: null }
		const component2 = { children: undefined }

		assertEquals(collectLinkElements(component1), [])
		assertEquals(collectLinkElements(component2), [])
	})
})

Deno.test("collectLinkElements combined scenarios", async (t) => {
	await t.step(
		"should collect dependencies from both root and children",
		() => {
			const doc = setupDocument(`
			<div id="root" data-dependencies="root-dep1,root-dep2">
				<div data-dependencies="child-dep1"></div>
				<div data-dependencies="child-dep2">
					<div data-dependencies="nested-dep"></div>
				</div>
			</div>
		`)
			const element = doc.getElementById("root")!
			const component = createComponentFromElement(element)

			const result = collectLinkElements(component)
			assertEquals(result, [
				"root-dep1",
				"root-dep2",
				"child-dep1",
				"child-dep2",
				"nested-dep",
			])
		},
	)

	await t.step("should preserve order of collection", () => {
		const doc = setupDocument(`
			<div id="root" data-dependencies="first">
				<div data-dependencies="second"></div>
				<div>
					<div data-dependencies="third"></div>
				</div>
				<div data-dependencies="fourth"></div>
			</div>
		`)
		const element = doc.getElementById("root")!
		const component = createComponentFromElement(element)

		const result = collectLinkElements(component)
		assertEquals(result, ["first", "second", "third", "fourth"])
	})
})

Deno.test("collectLinkElements edge cases", async (t) => {
	await t.step("should handle different dependency value types", () => {
		const component = {
			dependencies: ["string-dep", 123, { url: "object-dep" }, null, undefined],
		}
		const result = collectLinkElements(component)
		assertEquals(result, [
			"string-dep",
			123,
			{ url: "object-dep" },
			null,
			undefined,
		])
	})

	await t.step("should handle deeply nested structures", () => {
		let nested = { dependencies: ["deep"] }

		// Create a 10-level nested structure
		for (let i = 0; i < 10; i++) {
			nested = { children: [nested] }
		}

		const component = {
			dependencies: ["root"],
			children: [nested],
		}

		const result = collectLinkElements(component)
		assertEquals(result, ["root", "deep"])
	})

	await t.step("should handle circular-like structures safely", () => {
		const child1 = { dependencies: ["dep1"] }
		const child2 = { dependencies: ["dep2"] }

		// Create cross-references (though not truly circular due to structure)
		const component = {
			dependencies: ["root"],
			children: [child1, child2, child1], // Same child referenced multiple times
		}

		const result = collectLinkElements(component)
		assertEquals(result, ["root", "dep1", "dep2", "dep1"])
	})

	await t.step("should handle well-formed object children", () => {
		const doc = setupDocument(`
			<div id="parent">
				<div data-dependencies="valid1"></div>
				<div></div>
				<div data-dependencies="valid2"></div>
				<div></div>
			</div>
		`)
		const element = doc.getElementById("parent")!
		const component = createComponentFromElement(element)

		const result = collectLinkElements(component)
		assertEquals(result, ["valid1", "valid2"])
	})
})

Deno.test("collectLinkElements realistic scenarios", async (t) => {
	await t.step("should handle typical HTML component structure", () => {
		const doc = setupDocument(`
			<div id="root">
				<div data-dependencies="normalize.css,main.css">
					<div>My Page</div>
					<div charset="utf-8"></div>
				</div>
				<div>
					<header data-dependencies="header.css">
						<nav data-dependencies="nav.css,responsive.css"></nav>
					</header>
					<main data-dependencies="layout.css">
						<article data-dependencies="article.css"></article>
					</main>
					<footer data-dependencies="footer.css"></footer>
				</div>
			</div>
		`)
		const element = doc.getElementById("root")!
		const component = createComponentFromElement(element)

		const result = collectLinkElements(component)
		assertEquals(result, [
			"normalize.css",
			"main.css",
			"header.css",
			"nav.css",
			"responsive.css",
			"layout.css",
			"article.css",
			"footer.css",
		])
	})

	await t.step("should handle form with various input dependencies", () => {
		const doc = setupDocument(`
			<form id="root" data-dependencies="form-base.css">
				<fieldset data-dependencies="fieldset.css">
					<input data-dependencies="input.css,validation.css">
					<select data-dependencies="select.css,dropdown.css"></select>
				</fieldset>
				<button data-dependencies="button.css,button-primary.css"></button>
			</form>
		`)
		const element = doc.getElementById("root")!
		const component = createComponentFromElement(element)

		const result = collectLinkElements(component)
		assertEquals(result, [
			"form-base.css",
			"fieldset.css",
			"input.css",
			"validation.css",
			"select.css",
			"dropdown.css",
			"button.css",
			"button-primary.css",
		])
	})
})

Deno.test("collectLinkElements property-based tests", () => {
	fc.assert(
		fc.property(
			fc.array(fc.string({ minLength: 1, maxLength: 20 })),
			(deps) => {
				const component = { dependencies: deps }
				const result = collectLinkElements(component)
				assertEquals(result, deps)
			},
		),
		{ numRuns: 100 },
	)

	fc.assert(
		fc.property(
			fc.array(fc.array(fc.string({ minLength: 1, maxLength: 20 }))),
			(childDeps) => {
				const children = childDeps.map((deps) => ({ dependencies: deps }))
				const component = { children }
				const result = collectLinkElements(component)
				const expected = childDeps.flat()
				assertEquals(result, expected)
			},
		),
		{ numRuns: 50 },
	)

	fc.assert(
		fc.property(
			fc.array(fc.string({ minLength: 1, maxLength: 10 })),
			fc.array(fc.array(fc.string({ minLength: 1, maxLength: 10 }))),
			(rootDeps, childDeps) => {
				const children = childDeps.map((deps) => ({ dependencies: deps }))
				const component = { dependencies: rootDeps, children }
				const result = collectLinkElements(component)
				const expected = [...rootDeps, ...childDeps.flat()]
				assertEquals(result, expected)
			},
		),
		{ numRuns: 30 },
	)
})
