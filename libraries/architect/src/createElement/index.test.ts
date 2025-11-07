import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import range from "@sitebender/toolsmith/array/range/index.ts"

import createElement from "./index.ts"
import type { Props, VirtualNode } from "../types/index.ts"

Deno.test("createElement", async function createElementTests(t) {
	await t.step(
		"creates element from string tag",
		function createsFromString() {
			const result = createElement("div")(null)([])

			assertEquals(result._tag, "element")
			assertEquals((result as any).tagName, "DIV")
			assertEquals((result as any).attributes, {})
			assertEquals((result as any).children, [])
		},
	)

	await t.step(
		"uppercases tag name",
		function uppercasesTag() {
			const result = createElement("section")(null)([])

			assertEquals((result as any).tagName, "SECTION")
		},
	)

	await t.step(
		"includes attributes from props",
		function includesAttributes() {
			const result = createElement("div")({ id: "test", class: "container" })(
				[],
			)

			assertEquals((result as any).attributes.id, "test")
			assertEquals((result as any).attributes.class, "container")
		},
	)

	await t.step(
		"processes string children",
		function processesStringChildren() {
			const result = createElement("p")(null)(["Hello", "World"])

			assertEquals((result as any).children.length, 2)
			assertEquals((result as any).children[0], {
				_tag: "text",
				content: "Hello",
			})
			assertEquals((result as any).children[1], {
				_tag: "text",
				content: "World",
			})
		},
	)

	await t.step(
		"processes number children",
		function processesNumberChildren() {
			const result = createElement("span")(null)([42, 100])

			assertEquals((result as any).children.length, 2)
			assertEquals((result as any).children[0], { _tag: "text", content: "42" })
			assertEquals((result as any).children[1], {
				_tag: "text",
				content: "100",
			})
		},
	)

	await t.step(
		"converts null children to error configs",
		function convertsNulls() {
			const result = createElement("div")(null)(["Hello", null, "World"])

			assertEquals((result as any).children.length, 3)
			assertEquals((result as any).children[0], {
				_tag: "text",
				content: "Hello",
			})
			assertEquals((result as any).children[1], {
				_tag: "error",
				code: "INVALID_CHILD_NULL",
				message: "Null child encountered - this is not a valid DOM node",
				received: null,
			})
			assertEquals((result as any).children[2], {
				_tag: "text",
				content: "World",
			})
		},
	)

	await t.step(
		"converts boolean children to error configs",
		function convertsBooleans() {
			const result = createElement("div")(null)(["Hello", true, false, "World"])

			assertEquals((result as any).children.length, 4)
			assertEquals((result as any).children[0], {
				_tag: "text",
				content: "Hello",
			})
			assertEquals((result as any).children[1], {
				_tag: "error",
				code: "INVALID_CHILD_BOOLEAN",
				message:
					"Boolean child (true) encountered - this is not a valid DOM node",
				received: true,
			})
			assertEquals((result as any).children[2], {
				_tag: "error",
				code: "INVALID_CHILD_BOOLEAN",
				message:
					"Boolean child (false) encountered - this is not a valid DOM node",
				received: false,
			})
			assertEquals((result as any).children[3], {
				_tag: "text",
				content: "World",
			})
		},
	)

	await t.step(
		"flattens nested array children",
		function flattensArrays() {
			const result = createElement("div")(null)(["A", ["B", "C"], "D"])

			assertEquals((result as any).children.length, 4)
			assertEquals((result as any).children[0], { _tag: "text", content: "A" })
			assertEquals((result as any).children[1], { _tag: "text", content: "B" })
			assertEquals((result as any).children[2], { _tag: "text", content: "C" })
			assertEquals((result as any).children[3], { _tag: "text", content: "D" })
		},
	)

	await t.step(
		"handles nested elements",
		function handlesNestedElements() {
			const child = createElement("span")(null)(["Inner"])
			const result = createElement("div")(null)([child])

			assertEquals((result as any).children.length, 1)
			assertEquals((result as any).children[0]._tag, "element")
			assertEquals(
				((result as any).children[0] as { tagName: string }).tagName,
				"SPAN",
			)
		},
	)

	await t.step(
		"calls component function",
		function callsComponent() {
			function TestComponent(props: Props): VirtualNode {
				return createElement("div")({ class: "test-component" })(
					props.children || [],
				)
			}

			const result = createElement(TestComponent)({ title: "Test" })([
				"Content",
			])

			assertEquals(result._tag, "element")
			assertEquals((result as any).tagName, "DIV")
			assertEquals((result as any).attributes.class, "test-component")
			assertEquals((result as any).children.length, 1)
		},
	)

	await t.step(
		"passes props to component function",
		function passesPropsToComponent() {
			function TestComponent(props: Props): VirtualNode {
				const title = props.title as string
				return createElement("h1")(null)([title])
			}

			const result = createElement(TestComponent)({ title: "Hello" })([])

			assertEquals((result as any).children[0], {
				_tag: "text",
				content: "Hello",
			})
		},
	)

	await t.step(
		"passes children to component function",
		function passesChildrenToComponent() {
			function TestComponent(props: Props): VirtualNode {
				return createElement("div")(null)(props.children || [])
			}

			const result = createElement(TestComponent)(null)(["Child1", "Child2"])

			assertEquals((result as any).children.length, 2)
			assertEquals((result as any).children[0], {
				_tag: "text",
				content: "Child1",
			})
			assertEquals((result as any).children[1], {
				_tag: "text",
				content: "Child2",
			})
		},
	)

	await t.step(
		"excludes children from attributes",
		function excludesChildrenFromAttrs() {
			const result = createElement("div")({
				id: "test",
				children: ["ignored"],
			})(["Real child"])

			assertEquals((result as any).attributes.id, "test")
			assertEquals((result as any).attributes.children, undefined)
			assertEquals((result as any).children.length, 1)
			assertEquals((result as any).children[0], {
				_tag: "text",
				content: "Real child",
			})
		},
	)

	await t.step(
		"converts non-string attribute values to strings",
		function convertsAttrValues() {
			const result = createElement("div")({ id: 123, enabled: true })([])

			assertEquals((result as any).attributes.id, "123")
			assertEquals((result as any).attributes.enabled, "true")
		},
	)

	await t.step(
		"filters null and undefined attribute values",
		function filtersNullAttrs() {
			const result = createElement("div")({
				id: "test",
				removed: null,
				missing: undefined,
			})([])

			assertEquals((result as any).attributes.id, "test")
			assertEquals((result as any).attributes.removed, undefined)
			assertEquals((result as any).attributes.missing, undefined)
		},
	)

	await t.step(
		"handles empty props",
		function handlesEmptyProps() {
			const result = createElement("div")(null)([])

			assertEquals((result as any).attributes, {})
		},
	)

	await t.step(
		"handles no children",
		function handlesNoChildren() {
			const result = createElement("div")(null)([])

			assertEquals((result as any).children, [])
		},
	)

	await t.step(
		"is properly curried",
		function properlyCurried() {
			const withDiv = createElement("div")
			const withProps = withDiv({ class: "box" })
			const result = withProps(["Content"])

			assertEquals((result as any).tagName, "DIV")
			assertEquals((result as any).attributes.class, "box")
			assertEquals((result as any).children.length, 1)
		},
	)

	await t.step(
		"handles invalid component type gracefully",
		function handlesInvalidComponent() {
			const result = createElement(123 as never)(null)([])

			assertEquals(result._tag, "error")
			assertEquals((result as any).code, "INVALID_COMPONENT_TYPE")
			assertEquals((result as any).message.includes("number"), true)
		},
	)
})

Deno.test("createElement - property: string tags always create elements", function stringTagsCreateElements() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			function propertyStringTags(tagName) {
				const result = createElement(tagName)(null)([])
				assertEquals(result._tag, "element")
			},
		),
	)
})

Deno.test("createElement - property: tag names always uppercased", function tagNamesUppercase() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			function propertyUppercase(tagName) {
				const result = createElement(tagName)(null)([])
				if (result._tag === "element") {
					assertEquals(
						(result as any).tagName,
						(result as any).tagName.toUpperCase(),
					)
				}
			},
		),
	)
})

Deno.test("createElement - property: attributes preserved", function attributesPreserved() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			fc.dictionary(fc.string(), fc.oneof(fc.string(), fc.integer())),
			function propertyPreservesAttrs(tagName, attrs) {
				const result = createElement(tagName)(attrs)([])
				Object.keys(attrs).forEach((key) => {
					if (
						key !== "children" && attrs[key] !== null &&
						attrs[key] !== undefined
					) {
						assertEquals((result as any).attributes[key], String(attrs[key]))
					}
				})
			},
		),
	)
})

Deno.test("createElement - property: children count matches non-filtered input", function childrenCount() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			fc.array(fc.oneof(fc.string(), fc.integer())),
			function propertyChildrenCount(tagName, children) {
				const result = createElement(tagName)(null)(children)
				assertEquals((result as any).children.length, children.length)
			},
		),
	)
})

Deno.test("createElement - property: deeply nested elements", function deeplyNested() {
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 5 }),
			function propertyNestedElements(depth) {
				/*++
				 + Build nested structure using reduce instead of for loop
				 + Starts with span element, wraps in divs based on depth
				 */
				const baseElement = createElement("span")(null)(["Leaf"])

				function nestElement(accumulator: VirtualNode, _: number): VirtualNode {
					return createElement("div")(null)([accumulator])
				}

				const element = reduce(nestElement)(baseElement)(range(0)(depth))

				assertEquals(element._tag, "element")
				if (element._tag === "element") {
					// When depth is 0, element is SPAN; when depth > 0, it's DIV
					assertEquals(element.tagName, depth === 0 ? "SPAN" : "DIV")

					/*++
					 + Verify nested structure using recursion instead of for loop
					 + Traverses depth levels checking element tags
					 */
					function verifyDepth(node: VirtualNode, remaining: number): void {
						assertEquals(node._tag, "element")
						if (remaining > 0 && node._tag === "element") {
							verifyDepth(node.children[0] as VirtualNode, remaining - 1)
						}
					}

					verifyDepth(element, depth)
				}
			},
		),
	)
})

Deno.test("createElement - property: idempotent for same inputs", function idempotent() {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1 }),
			fc.dictionary(fc.string(), fc.string()),
			fc.array(fc.string()),
			function propertyIdempotent(tagName, attrs, children) {
				const first = createElement(tagName)(attrs)(children)
				const second = createElement(tagName)(attrs)(children)
				assertEquals(first, second)
			},
		),
	)
})
