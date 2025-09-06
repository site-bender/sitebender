#!/usr/bin/env -S deno run

import { parseFormula } from "./src/index.ts"

console.log("=".repeat(60))
console.log("@sitebender/maths Library Demo")
console.log("=".repeat(60))

// Example 1: Simple arithmetic with constants
console.log("\n1. Simple arithmetic with constants:")
console.log("Formula: 3.14 + 2.86")
const result1 = parseFormula("3.14 + 2.86", {})
if (result1.ok) {
	console.log("✅ Parsed successfully!")
	console.log("Output:", JSON.stringify(result1.value, null, 2))
} else {
	console.log("❌ Error:", result1.error.message)
}

// Example 2: Using variables with different injector types
console.log("\n2. Variables with different injector types:")
console.log("Formula: (price * quantity) * (1 + tax_rate)")
const variables2 = {
	price: { tag: "FromElement", type: "injector", datatype: "Float", source: "#price-input" },
	quantity: { tag: "FromElement", type: "injector", datatype: "Integer", source: "#qty-input" },
	tax_rate: { tag: "Constant", type: "injector", datatype: "Float", value: 0.08 },
}
const result2 = parseFormula("(price * quantity) * (1 + tax_rate)", variables2)
if (result2.ok) {
	console.log("✅ Parsed successfully!")
	console.log("Output:", JSON.stringify(result2.value, null, 2))
} else {
	console.log("❌ Error:", result2.error.message)
}

// Example 3: Complex formula with mixed operations
console.log("\n3. Complex formula with mixed operations:")
console.log("Formula: (a / b) + (c / d) - e^2")
const variables3 = {
	a: { tag: "Constant", type: "injector", datatype: "Integer", value: 99 },
	b: { tag: "FromElement", type: "injector", datatype: "Integer", source: "#divisor" },
	c: { tag: "Constant", type: "injector", datatype: "Integer", value: 44 },
	d: { tag: "Constant", type: "injector", datatype: "Integer", value: 2 },
	e: { tag: "Constant", type: "injector", datatype: "Integer", value: 3 },
}
const result3 = parseFormula("(a / b) + (c / d) - e^2", variables3)
if (result3.ok) {
	console.log("✅ Parsed successfully!")
	console.log("Output:", JSON.stringify(result3.value, null, 2))
} else {
	console.log("❌ Error:", result3.error.message)
}

// Example 4: Unary operations
console.log("\n4. Unary operations:")
console.log("Formula: -x + y")
const variables4 = {
	x: { tag: "Constant", type: "injector", datatype: "Number", value: 10 },
	y: { tag: "Constant", type: "injector", datatype: "Number", value: 20 },
}
const result4 = parseFormula("-x + y", variables4)
if (result4.ok) {
	console.log("✅ Parsed successfully!")
	console.log("Output:", JSON.stringify(result4.value, null, 2))
} else {
	console.log("❌ Error:", result4.error.message)
}

// Example 5: Error handling - undefined variable
console.log("\n5. Error handling - undefined variable:")
console.log("Formula: a + b (where b is not defined)")
const variables5 = {
	a: { tag: "Constant", type: "injector", datatype: "Number", value: 5 },
}
const result5 = parseFormula("a + b", variables5)
if (result5.ok) {
	console.log("✅ Parsed successfully!")
	console.log("Output:", JSON.stringify(result5.value, null, 2))
} else {
	console.log("❌ Error:", result5.error.message)
}

// Example 6: Error handling - syntax error
console.log("\n6. Error handling - syntax error:")
console.log("Formula: 5 + + 3")
const result6 = parseFormula("5 + + 3", {})
if (result6.ok) {
	console.log("✅ Parsed successfully!")
	console.log("Output:", JSON.stringify(result6.value, null, 2))
} else {
	console.log("❌ Error:", result6.error.message)
}

// Example 7: Type inference
console.log("\n7. Type inference:")
console.log("Formula: int1 + int2 (both Integer types)")
const variables7 = {
	int1: { tag: "Constant", type: "injector", datatype: "Integer", value: 10 },
	int2: { tag: "Constant", type: "injector", datatype: "Integer", value: 20 },
}
const result7 = parseFormula("int1 + int2", variables7)
if (result7.ok) {
	console.log("✅ Parsed successfully!")
	console.log("Output datatype:", result7.value.datatype)
	console.log("Full output:", JSON.stringify(result7.value, null, 2))
} else {
	console.log("❌ Error:", result7.error.message)
}

// Example 8: Mixed types default to Number
console.log("\n8. Mixed types default to Number:")
console.log("Formula: intVal + floatVal")
const variables8 = {
	intVal: { tag: "Constant", type: "injector", datatype: "Integer", value: 10 },
	floatVal: { tag: "Constant", type: "injector", datatype: "Float", value: 3.14 },
}
const result8 = parseFormula("intVal + floatVal", variables8)
if (result8.ok) {
	console.log("✅ Parsed successfully!")
	console.log("Output datatype:", result8.value.datatype)
	console.log("Full output:", JSON.stringify(result8.value, null, 2))
} else {
	console.log("❌ Error:", result8.error.message)
}

// Example 9: Different injector types
console.log("\n9. Different injector types showcase:")
console.log("Formula: url_param + local_storage + session_storage + element_value")
const variables9 = {
	url_param: { tag: "FromURL", type: "injector", datatype: "Number", param: "score" },
	local_storage: { tag: "FromLocalStorage", type: "injector", datatype: "Number", key: "user_score" },
	session_storage: { tag: "FromSessionStorage", type: "injector", datatype: "Number", key: "temp_score" },
	element_value: { tag: "FromElement", type: "injector", datatype: "Number", source: "#score-input" },
}
const result9 = parseFormula("url_param + local_storage + session_storage + element_value", variables9)
if (result9.ok) {
	console.log("✅ Parsed successfully!")
	console.log("This demonstrates support for various data sources:")
	console.log("- URL parameters")
	console.log("- Local storage")  
	console.log("- Session storage")
	console.log("- DOM elements")
	console.log("\nOutput:", JSON.stringify(result9.value, null, 2))
} else {
	console.log("❌ Error:", result9.error.message)
}

console.log("\n" + "=".repeat(60))
console.log("Demo complete!")
console.log("=".repeat(60))