import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"
import { 
	detectPurity, 
	detectCurrying, 
	detectComplexity,
	detectProperties 
} from "../../../src/detectors/index.ts"

Deno.test("detectPurity - identifies pure functions", () => {
	const pureFunction = `
function add(x: number, y: number): number {
	return x + y
}`
	
	assertEquals(detectPurity(pureFunction), true)
})

Deno.test("detectPurity - detects console usage as impure", () => {
	const impureFunction = `
function log(x: number): number {
	console.log(x)
	return x
}`
	
	assertEquals(detectPurity(impureFunction), false)
})

Deno.test("detectPurity - detects mutations as impure", () => {
	const impureFunction = `
function mutate(arr: number[]): void {
	arr.push(5)
}`
	
	assertEquals(detectPurity(impureFunction), false)
})

Deno.test("detectPurity - detects Math.random as impure", () => {
	const impureFunction = `
function random(): number {
	return Math.random()
}`
	
	assertEquals(detectPurity(impureFunction), false)
})

Deno.test("detectPurity - detects Date usage as impure", () => {
	const impureFunction = `
function timestamp(): number {
	return Date.now()
}`
	
	assertEquals(detectPurity(impureFunction), false)
})

Deno.test("detectPurity - detects async/await as impure", () => {
	const impureFunction = `
async function fetchData(): Promise<string> {
	const result = await fetch('/api')
	return result.text()
}`
	
	assertEquals(detectPurity(impureFunction), false)
})

Deno.test("detectPurity - detects throw as impure", () => {
	const impureFunction = `
function validate(x: number): number {
	if (x < 0) throw new Error("Invalid")
	return x
}`
	
	assertEquals(detectPurity(impureFunction), false)
})

Deno.test("detectPurity - handles arrow functions correctly", () => {
	const pureArrow = `const add = (x: number) => (y: number) => x + y`
	
	assertEquals(detectPurity(pureArrow), true)
})

Deno.test("detectCurrying - identifies curried functions", () => {
	const curriedFunction = `
export default function add(x: number) {
	return function(y: number): number {
		return x + y
	}
}`
	
	const result = detectCurrying(curriedFunction)
	assertEquals(result.isCurried, true)
	assertEquals(result.levels, 2)
})

Deno.test("detectCurrying - identifies non-curried functions", () => {
	const normalFunction = `
function add(x: number, y: number): number {
	return x + y
}`
	
	const result = detectCurrying(normalFunction)
	assertEquals(result.isCurried, false)
	assertEquals(result.levels, 1)
})

Deno.test("detectCurrying - identifies arrow function currying", () => {
	const curriedArrow = `const add = (x: number) => (y: number) => x + y`
	
	const result = detectCurrying(curriedArrow)
	assertEquals(result.isCurried, true)
	assertEquals(result.levels, 2)
})

Deno.test("detectCurrying - identifies multi-level currying", () => {
	const multiCurried = `
const curry3 = (a: number) => (b: number) => (c: number) => a + b + c`
	
	const result = detectCurrying(multiCurried)
	assertEquals(result.isCurried, true)
	assertEquals(result.levels, 3)
})

Deno.test("detectComplexity - identifies O(1) complexity", () => {
	const constantTime = `
function getFirst(arr: number[]): number {
	return arr[0]
}`
	
	assertEquals(detectComplexity(constantTime), "O(1)")
})

Deno.test("detectComplexity - identifies O(n) complexity", () => {
	const linearTime = `
function sum(arr: number[]): number {
	let total = 0
	for (const num of arr) {
		total += num
	}
	return total
}`
	
	assertEquals(detectComplexity(linearTime), "O(n)")
})

Deno.test("detectComplexity - identifies O(n) with array methods", () => {
	const mapFunction = `
function double(arr: number[]): number[] {
	return arr.map(x => x * 2)
}`
	
	assertEquals(detectComplexity(mapFunction), "O(n)")
})

Deno.test("detectComplexity - identifies O(n²) complexity", () => {
	const quadraticTime = `
function bubbleSort(arr: number[]): number[] {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
			}
		}
	}
	return arr
}`
	
	assertEquals(detectComplexity(quadraticTime), "O(n²)")
})

Deno.test("detectComplexity - identifies O(n log n) for sorting", () => {
	const sortFunction = `
function sortArray(arr: number[]): number[] {
	return arr.sort((a, b) => a - b)
}`
	
	assertEquals(detectComplexity(sortFunction), "O(n log n)")
})

Deno.test("detectComplexity - identifies O(log n) for binary search", () => {
	const binarySearch = `
function binarySearch(arr: number[], target: number): number {
	let low = 0
	let high = arr.length - 1
	
	while (low <= high) {
		const mid = Math.floor((low + high) / 2)
		if (arr[mid] === target) return mid
		if (arr[mid] < target) low = mid + 1
		else high = mid - 1
	}
	return -1
}`
	
	assertEquals(detectComplexity(binarySearch), "O(log n)")
})

Deno.test("detectComplexity - identifies recursive complexity", () => {
	const factorial = `
function factorial(n: number): number {
	if (n <= 1) return 1
	return n * factorial(n - 1)
}`
	
	assertEquals(detectComplexity(factorial), "O(n)")
})

Deno.test("detectProperties - combines all detections", () => {
	const curriedPureFunction = `
// Adds two numbers
export default function add(x: number) {
	return function(y: number): number {
		return x + y
	}
}`
	
	const properties = detectProperties(curriedPureFunction)
	
	assertEquals(properties.isPure, true)
	assertEquals(properties.isCurried, true)
	assertEquals(properties.curryLevels, 2)
	assertEquals(properties.complexity, "O(1)")
	assertEquals(properties.deterministic, true)
})