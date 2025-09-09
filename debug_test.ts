import extractDescription from "./libraries/scribe/src/extractors/extractDescription/index.ts"

// Test the exact case that's failing
const source1 = `
// This is a test function
function test() {
	return 42
}`

console.log("=== Debug Test 1 ===")
console.log("Source lines:", source1.split('\n').map((line, i) => `${i}: "${line}"`))
console.log("extractDescription(source, 2):", extractDescription(source1, 2))
console.log("Expected: 'This is a test function'")

// Test the "exact line" case
const source2 = `// Line 1
// Line 2 - target
// Line 3
function test() {}`

console.log("\n=== Debug Test 2 ===")
console.log("Source lines:", source2.split('\n').map((line, i) => `${i}: "${line}"`))
console.log("extractDescription(source, 3):", extractDescription(source2, 3))
console.log("Expected: 'Line 2 - target'")