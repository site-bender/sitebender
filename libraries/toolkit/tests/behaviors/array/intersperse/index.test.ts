import { assertEquals } from "jsr:@std/assert@1.0.8"
import * as fc from "npm:fast-check@3"

import intersperse from "../../../../src/simple/array/intersperse/index.ts"

Deno.test("intersperse: inserts separator between array elements", () => {
	assertEquals(intersperse(0)([1, 2, 3, 4]), [1, 0, 2, 0, 3, 0, 4])
	assertEquals(intersperse(",")([1, 2, 3]), [1, ",", 2, ",", 3])
	assertEquals(intersperse(null)([1, 2]), [1, null, 2])
})

Deno.test("intersperse: handles string arrays and separators", () => {
	assertEquals(
		intersperse(" | ")(["home", "products", "about"]),
		["home", " | ", "products", " | ", "about"],
	)
	assertEquals(
		intersperse(" > ")(["Users", "Documents", "Reports"]),
		["Users", " > ", "Documents", " > ", "Reports"],
	)
	assertEquals(
		intersperse("-")(["a", "b", "c", "d"]),
		["a", "-", "b", "-", "c", "-", "d"],
	)
})

Deno.test("intersperse: handles single element array", () => {
	assertEquals(intersperse(",")([1]), [1])
	assertEquals(intersperse(0)(["only"]), ["only"])
	assertEquals(intersperse(null)([true]), [true])
})

Deno.test("intersperse: handles empty array", () => {
	assertEquals(intersperse(",")([]), [])
	assertEquals(intersperse(0)([]), [])
	assertEquals(intersperse("separator")([]), [])
})

Deno.test("intersperse: handles null and undefined input", () => {
	assertEquals(intersperse(",")(null), [])
	assertEquals(intersperse(",")(undefined), [])
	assertEquals(intersperse(0)(null), [])
	assertEquals(intersperse(0)(undefined), [])
})

Deno.test("intersperse: handles object separators", () => {
	const divider = { type: "divider" }
	const content = [
		{ type: "content", value: "A" },
		{ type: "content", value: "B" },
		{ type: "content", value: "C" },
	]

	assertEquals(
		intersperse(divider)(content),
		[
			{ type: "content", value: "A" },
			{ type: "divider" },
			{ type: "content", value: "B" },
			{ type: "divider" },
			{ type: "content", value: "C" },
		],
	)
})

Deno.test("intersperse: handles array separators", () => {
	assertEquals(
		intersperse([0])([[1], [2], [3]]),
		[[1], [0], [2], [0], [3]],
	)
})

Deno.test("intersperse: handles mixed type arrays", () => {
	const mixed = [1, "two", true, null, undefined]
	assertEquals(
		intersperse("|")(mixed),
		[1, "|", "two", "|", true, "|", null, "|", undefined],
	)
})

Deno.test("intersperse: handles special numeric values", () => {
	assertEquals(
		intersperse(0)([NaN, Infinity, -Infinity]),
		[NaN, 0, Infinity, 0, -Infinity],
	)
	assertEquals(
		intersperse(NaN)([1, 2, 3]),
		[1, NaN, 2, NaN, 3],
	)
})

Deno.test("intersperse: maintains object references", () => {
	const obj1 = { id: 1 }
	const obj2 = { id: 2 }
	const obj3 = { id: 3 }
	const separator = { type: "sep" }

	const result = intersperse(separator)([obj1, obj2, obj3])

	// Check structure
	assertEquals(result.length, 5)
	// Check references are maintained
	assertEquals(result[0] === obj1, true)
	assertEquals(result[1] === separator, true)
	assertEquals(result[2] === obj2, true)
	assertEquals(result[3] === separator, true)
	assertEquals(result[4] === obj3, true)
})

Deno.test("intersperse: is properly curried", () => {
	const commaSeparate = intersperse(", ")
	assertEquals(commaSeparate(["apple", "banana"]), ["apple", ", ", "banana"])
	assertEquals(commaSeparate(["x", "y", "z"]), ["x", ", ", "y", ", ", "z"])

	const zeroPad = intersperse(0)
	assertEquals(zeroPad([1, 2]), [1, 0, 2])
	assertEquals(zeroPad([5]), [5])
})

Deno.test("intersperse: handles undefined as separator", () => {
	assertEquals(
		intersperse(undefined)([1, 2, 3]),
		[1, undefined, 2, undefined, 3],
	)
})

Deno.test("intersperse: handles boolean separators", () => {
	assertEquals(
		intersperse(false)([true, true, true]),
		[true, false, true, false, true],
	)
})

Deno.test("intersperse: handles function separators", () => {
	const fn = () => "separator"
	const arr = [1, 2, 3]
	const result = intersperse(fn)(arr)

	assertEquals(result.length, 5)
	assertEquals(typeof result[1], "function")
	assertEquals(result[1] === fn, true)
})

Deno.test("intersperse: handles symbol separators", () => {
	const sym = Symbol("separator")
	const result = intersperse(sym)([1, 2, 3])

	assertEquals(result.length, 5)
	assertEquals(result[1] === sym, true)
	assertEquals(result[3] === sym, true)
})

Deno.test("intersperse: property-based testing", () => {
	// Result length is always 2*n - 1 for non-empty arrays
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			fc.anything(),
			(arr, separator) => {
				const result = intersperse(separator)(arr)
				return result.length === 2 * arr.length - 1
			},
		),
	)

	// Original elements appear at even indices
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 1 }),
			fc.string(),
			(arr, separator) => {
				const result = intersperse(separator)(arr)
				return arr.every((elem, i) => result[i * 2] === elem)
			},
		),
	)

	// Separators appear at odd indices
	fc.assert(
		fc.property(
			fc.array(fc.integer(), { minLength: 2 }),
			fc.string(),
			(arr, separator) => {
				const result = intersperse(separator)(arr)
				// Check all odd indices have the separator
				return Array.from(
					{ length: arr.length - 1 },
					(_, i) => result[i * 2 + 1] === separator,
				).every(Boolean)
			},
		),
	)

	// Empty array returns empty array
	fc.assert(
		fc.property(
			fc.anything(),
			(separator) => {
				const result = intersperse(separator)([])
				return result.length === 0
			},
		),
	)

	// Single element array returns same array
	fc.assert(
		fc.property(
			fc.anything(),
			fc.anything(),
			(elem, separator) => {
				const result = intersperse(separator)([elem])
				return result.length === 1 && result[0] === elem
			},
		),
	)
})

Deno.test("intersperse: creates breadcrumb trails", () => {
	const breadcrumb = intersperse(" > ")

	assertEquals(
		breadcrumb(["Home", "Products", "Electronics", "Phones"]),
		["Home", " > ", "Products", " > ", "Electronics", " > ", "Phones"],
	)

	assertEquals(
		breadcrumb(["Root"]),
		["Root"],
	)
})

Deno.test("intersperse: creates CSV-like structures", () => {
	const csvRow = intersperse(",")

	assertEquals(
		csvRow(["Name", "Age", "City"]),
		["Name", ",", "Age", ",", "City"],
	)

	assertEquals(
		csvRow(["Alice", "30", "NYC"]),
		["Alice", ",", "30", ",", "NYC"],
	)
})

Deno.test("intersperse: large arrays performance", () => {
	const largeArray = Array.from({ length: 1000 }, (_, i) => i)
	const result = intersperse(",")(largeArray)

	// Check length
	assertEquals(result.length, 1999)

	// Check first few elements
	assertEquals(result.slice(0, 5), [0, ",", 1, ",", 2])

	// Check last element
	assertEquals(result[result.length - 1], 999)
})
