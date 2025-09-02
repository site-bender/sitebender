import { assertEquals } from "jsr:@std/assert@1.0.8"
import * as fc from "npm:fast-check@3"

import join from "../../../../src/simple/array/join/index.ts"

Deno.test("join: joins array elements with separator", () => {
	assertEquals(join(", ")(["a", "b", "c"]), "a, b, c")
	assertEquals(join("-")(["one", "two", "three"]), "one-two-three")
	assertEquals(join("")(["h", "e", "l", "l", "o"]), "hello")
	assertEquals(join(" ")(["hello", "world"]), "hello world")
})

Deno.test("join: handles numeric arrays", () => {
	assertEquals(join(", ")([1, 2, 3]), "1, 2, 3")
	assertEquals(join("")([1, 2, 3, 4, 5]), "12345")
	assertEquals(join("-")([10, 20, 30]), "10-20-30")
	assertEquals(join(".")([192, 168, 1, 1]), "192.168.1.1")
})

Deno.test("join: handles single element arrays", () => {
	assertEquals(join(", ")(["single"]), "single")
	assertEquals(join("-")([42]), "42")
	assertEquals(join("")(["only"]), "only")
})

Deno.test("join: handles empty arrays", () => {
	assertEquals(join(", ")([]), "")
	assertEquals(join("-")([]), "")
	assertEquals(join("")([]), "")
})

Deno.test("join: handles null and undefined input", () => {
	assertEquals(join(", ")(null), "")
	assertEquals(join(", ")(undefined), "")
	assertEquals(join("-")(null), "")
	assertEquals(join("-")(undefined), "")
})

Deno.test("join: handles mixed type arrays", () => {
	assertEquals(join(", ")([1, "two", true, null, undefined]), "1, two, true, , ")
	assertEquals(join("-")([true, false, true]), "true-false-true")
	assertEquals(join(" | ")([null, undefined, 0, ""]), " |  | 0 | ")
})

Deno.test("join: handles special numeric values", () => {
	assertEquals(join(", ")([NaN, Infinity, -Infinity]), "NaN, Infinity, -Infinity")
	assertEquals(join("-")([0, -0, NaN]), "0-0-NaN")
})

Deno.test("join: handles arrays with objects", () => {
	assertEquals(
		join(", ")([{ id: 1 }, { id: 2 }, { id: 3 }]),
		"[object Object], [object Object], [object Object]"
	)
	
	// Objects with toString
	const obj1 = { toString: () => "obj1" }
	const obj2 = { toString: () => "obj2" }
	assertEquals(join("-")([obj1, obj2]), "obj1-obj2")
})

Deno.test("join: handles arrays with nested arrays", () => {
	assertEquals(join(", ")([[1, 2], [3, 4], [5, 6]]), "1,2, 3,4, 5,6")
	assertEquals(join("-")([[], [1], [2, 3]]), "-1-2,3")
})

Deno.test("join: handles different separator types", () => {
	// Empty separator
	assertEquals(join("")(["a", "b", "c"]), "abc")
	
	// Multi-character separator
	assertEquals(join(" -> ")(["step1", "step2", "step3"]), "step1 -> step2 -> step3")
	assertEquals(join(" | ")(["option1", "option2"]), "option1 | option2")
	
	// Special characters
	assertEquals(join("\n")(["line1", "line2", "line3"]), "line1\nline2\nline3")
	assertEquals(join("\t")(["col1", "col2", "col3"]), "col1\tcol2\tcol3")
})

Deno.test("join: is properly curried", () => {
	const commaSeparate = join(", ")
	assertEquals(commaSeparate(["a", "b", "c"]), "a, b, c")
	assertEquals(commaSeparate([1, 2, 3]), "1, 2, 3")
	
	const dashSeparate = join("-")
	assertEquals(dashSeparate(["x", "y", "z"]), "x-y-z")
	assertEquals(dashSeparate([]), "")
})

Deno.test("join: creates CSV lines", () => {
	const toCSV = join(",")
	assertEquals(toCSV(["name", "age", "city"]), "name,age,city")
	assertEquals(toCSV(["Alice", "30", "NYC"]), "Alice,30,NYC")
	assertEquals(toCSV(['"quoted"', "normal", 'with,comma']), '"quoted",normal,with,comma')
})

Deno.test("join: creates file paths", () => {
	const toPath = join("/")
	assertEquals(toPath(["usr", "local", "bin"]), "usr/local/bin")
	assertEquals(toPath(["home", "user", "documents"]), "home/user/documents")
	
	const toWindowsPath = join("\\")
	assertEquals(toWindowsPath(["C:", "Users", "Documents"]), "C:\\Users\\Documents")
})

Deno.test("join: creates URL query strings", () => {
	const params = ["name=John", "age=30", "city=NYC"]
	assertEquals(join("&")(params), "name=John&age=30&city=NYC")
})

Deno.test("join: handles symbols", () => {
	// Symbols can't be directly converted to strings by Array.join
	// This is expected to throw
	const sym1 = Symbol("test1")
	const sym2 = Symbol("test2")
	
	try {
		join(", ")([sym1, sym2])
		throw new Error("Should have thrown")
	} catch (error) {
		assertEquals(error instanceof TypeError, true)
		assertEquals(error.message, "Cannot convert a Symbol value to a string")
	}
})

Deno.test("join: handles functions", () => {
	const fn1 = function myFunc() {}
	const fn2 = () => {}
	const result = join(", ")([fn1, fn2])
	// Functions convert to their string representation
	assertEquals(result.includes("function"), true)
})

Deno.test("join: property-based testing", () => {
	// Join with empty separator equals concatenation (for string arrays)
	fc.assert(
		fc.property(
			fc.array(fc.string()),
			(arr) => {
				const joined = join("")(arr)
				const concatenated = arr.reduce((acc, curr) => acc + curr, "")
				return joined === concatenated
			}
		)
	)
	
	// Splitting joined string recreates array (for non-empty separator)
	fc.assert(
		fc.property(
			fc.array(fc.string().filter(s => !s.includes("|"))),
			(arr) => {
				const separator = "|"
				const joined = join(separator)(arr)
				if (arr.length === 0) {
					return joined === ""
				}
				const split = joined.split(separator)
				return split.length === arr.length &&
					split.every((s, i) => s === arr[i])
			}
		)
	)
	
	// Join preserves string representation of elements
	fc.assert(
		fc.property(
			fc.array(fc.integer()),
			fc.string(),
			(arr, separator) => {
				const joined = join(separator)(arr)
				const expected = arr.map(String).join(separator)
				return joined === expected
			}
		)
	)
	
	// Empty array always returns empty string
	fc.assert(
		fc.property(
			fc.string(),
			(separator) => {
				return join(separator)([]) === ""
			}
		)
	)
	
	// Single element array returns element's string representation
	fc.assert(
		fc.property(
			fc.anything().filter(x => {
				// Filter out symbols and objects with non-function toString
				if (typeof x === "symbol") return false
				if (x && typeof x === "object" && x.toString !== undefined && typeof x.toString !== "function") {
					return false
				}
				return true
			}),
			fc.string(),
			(elem, separator) => {
				try {
					const result = join(separator)([elem])
					// Array.join converts undefined/null differently than String()
					// undefined and null become empty string in join
					const expected = elem === undefined || elem === null ? "" : String(elem)
					return result === expected
				} catch (e) {
					// Some objects can't be converted to primitives
					return e instanceof TypeError
				}
			}
		)
	)
})

Deno.test("join: large arrays performance", () => {
	const largeArray = Array.from({ length: 10000 }, (_, i) => i)
	const result = join(",")(largeArray)
	
	// Check it creates a long string
	assertEquals(result.length > 30000, true) // At least 10000 numbers + 9999 commas
	
	// Check beginning and end
	assertEquals(result.startsWith("0,1,2,3,4"), true)
	assertEquals(result.endsWith("9997,9998,9999"), true)
})

Deno.test("join: handles arrays with empty strings", () => {
	assertEquals(join(",")(["", "", ""]), ",,")
	assertEquals(join("-")(["a", "", "b"]), "a--b")
	assertEquals(join(" ")(["", "middle", ""]), " middle ")
})

Deno.test("join: handles unicode separators", () => {
	assertEquals(join("→")(["A", "B", "C"]), "A→B→C")
	assertEquals(join("•")(["item1", "item2", "item3"]), "item1•item2•item3")
	assertEquals(join("🔹")(["one", "two", "three"]), "one🔹two🔹three")
})