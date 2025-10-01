import type { ComplexityClass } from "../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function detectComplexity(source: string): ComplexityClass {
	// Remove comments
	const cleanSource = removeComments(source)

	// Count loops
	const forLoops = countOccurrences(cleanSource, /\bfor\s*\(/g)
	const whileLoops = countOccurrences(cleanSource, /\bwhile\s*\(/g)
	const doWhileLoops = countOccurrences(cleanSource, /\bdo\s*\{/g)
	const totalLoops = forLoops + whileLoops + doWhileLoops

	// Count array methods that iterate
	const mapCalls = countOccurrences(cleanSource, /\.map\s*\(/g)
	const filterCalls = countOccurrences(cleanSource, /\.filter\s*\(/g)
	const reduceCalls = countOccurrences(cleanSource, /\.reduce\s*\(/g)
	const forEachCalls = countOccurrences(cleanSource, /\.forEach\s*\(/g)
	const someCalls = countOccurrences(cleanSource, /\.some\s*\(/g)
	const everyCalls = countOccurrences(cleanSource, /\.every\s*\(/g)
	const findCalls = countOccurrences(cleanSource, /\.find\s*\(/g)

	const iterativeMethods = mapCalls + filterCalls + reduceCalls +
		forEachCalls + someCalls + everyCalls + findCalls

	// Check for nested loops
	const nestedLoops = detectNestedLoops(cleanSource)

	// Check for recursion
	const hasRecursion = detectRecursion(cleanSource)

	// Check for sorting
	const hasSorting = /\.sort\s*\(/.test(cleanSource)

	// Check for binary search pattern first (before general loop analysis)
	if (detectBinarySearch(cleanSource)) {
		return "O(log n)"
	}

	// Determine complexity
	if (nestedLoops >= 3) {
		return "O(n³)"
	}

	if (nestedLoops === 2) {
		return "O(n²)"
	}

	if (hasSorting) {
		return "O(n log n)"
	}

	if (
		nestedLoops === 1 ||
		(totalLoops > 1 && !areLoopsIndependent(cleanSource))
	) {
		return "O(n²)"
	}

	if (hasRecursion) {
		// Try to detect binary recursion (like binary search)
		if (detectBinaryRecursion(cleanSource)) {
			return "O(log n)"
		}
		// Default recursive complexity
		return "O(n)"
	}

	if (totalLoops > 0 || iterativeMethods > 0) {
		return "O(n)"
	}

	// No loops or recursion detected
	return "O(1)"
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function removeComments(source: string): string {
	return source
		.replace(/\/\/.*$/gm, "")
		.replace(/\/\*[\s\S]*?\*\//g, "")
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function countOccurrences(source: string, pattern: RegExp): number {
	const matches = source.match(pattern)
	return matches ? matches.length : 0
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function detectNestedLoops(source: string): number {
	const tokens = source.split(/\s+/)
	// Fold over tokens to compute nesting metrics
	const { max } = tokens.reduce<{ current: number; max: number }>(
		(acc, token) => {
			const isLoopLike = /^(for|while|forEach|map|filter|reduce)/.test(token)
			const enters = isLoopLike ? acc.current + 1 : acc.current
			const peak = enters > acc.max ? enters : acc.max
			const exits = (token.includes("function") || token.includes("=>"))
				? Math.max(0, enters - 1)
				: enters
			return { current: exits, max: peak }
		},
		{ current: 0, max: 0 },
	)
	return max > 1 ? max - 1 : 0
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function areLoopsIndependent(source: string): boolean {
	const loopLines = source
		.split("\n")
		.map((line, idx) => (/\b(for|while|do)\b/.test(line) ? idx : -1))
		.filter((idx) => idx >= 0)
	if (loopLines.length === 2) {
		return Math.abs(loopLines[0] - loopLines[1]) > 10
	}
	return true
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function detectRecursion(source: string): boolean {
	// Extract function name
	const functionMatch = source.match(/function\s+(\w+)/) ||
		source.match(/(?:const|let|var)\s+(\w+)\s*=/)

	if (!functionMatch) {
		return false
	}

	const functionName = functionMatch[1]

	// Check if function calls itself
	const selfCallPattern = new RegExp(`\\b${functionName}\\s*\\(`, "g")
	const matches = source.match(selfCallPattern)

	// Must have at least 2 occurrences (definition + call)
	return matches ? matches.length > 1 : false
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function detectBinaryRecursion(source: string): boolean {
	// Look for patterns like dividing by 2, or binary tree traversal
	return /\/\s*2|>>>\s*1|>>\s*1/.test(source) ||
		/left.*right|right.*left/.test(source)
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
function detectBinarySearch(source: string): boolean {
	// Look for typical binary search patterns
	return /mid|middle|low.*high|left.*right/.test(source) &&
		/\/\s*2|\+.*\/\s*2/.test(source)
}
