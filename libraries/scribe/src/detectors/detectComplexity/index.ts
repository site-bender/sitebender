import type { ComplexityClass } from "../../types/index.ts"

/**
 * Analyzes function complexity and returns Big-O notation
 */
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
	
	if (nestedLoops === 1 || (totalLoops > 1 && !areLoopsIndependent(cleanSource))) {
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
	
	// Check for binary search pattern
	if (detectBinarySearch(cleanSource)) {
		return "O(log n)"
	}
	
	// No loops or recursion detected
	return "O(1)"
}

/**
 * Removes comments from source
 */
function removeComments(source: string): string {
	return source
		.replace(/\/\/.*$/gm, "")
		.replace(/\/\*[\s\S]*?\*\//g, "")
}

/**
 * Counts occurrences of a pattern
 */
function countOccurrences(source: string, pattern: RegExp): number {
	const matches = source.match(pattern)
	return matches ? matches.length : 0
}

/**
 * Detects nested loops
 */
function detectNestedLoops(source: string): number {
	// Simple heuristic: count loop keywords and check for nesting
	let maxNesting = 0
	let currentNesting = 0
	
	const tokens = source.split(/\s+/)
	
	for (const token of tokens) {
		if (/^(for|while|forEach|map|filter|reduce)/.test(token)) {
			currentNesting++
			maxNesting = Math.max(maxNesting, currentNesting)
		}
		// Reset on function boundaries (simplified)
		if (token.includes("function") || token.includes("=>")) {
			currentNesting = Math.max(0, currentNesting - 1)
		}
	}
	
	return maxNesting > 1 ? maxNesting - 1 : 0
}

/**
 * Detects if loops are independent (not nested)
 */
function areLoopsIndependent(source: string): boolean {
	// Simplified check: if loops are at the same brace level, they're independent
	// This is a heuristic and may not be 100% accurate
	const lines = source.split("\n")
	const loopLines = []
	
	for (let i = 0; i < lines.length; i++) {
		if (/\b(for|while|do)\b/.test(lines[i])) {
			loopLines.push(i)
		}
	}
	
	// If loops are far apart, they're likely independent
	if (loopLines.length === 2) {
		return Math.abs(loopLines[0] - loopLines[1]) > 10
	}
	
	return true
}

/**
 * Detects recursion in the function
 */
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

/**
 * Detects binary recursion pattern
 */
function detectBinaryRecursion(source: string): boolean {
	// Look for patterns like dividing by 2, or binary tree traversal
	return /\/\s*2|>>>\s*1|>>\s*1/.test(source) ||
	       /left.*right|right.*left/.test(source)
}

/**
 * Detects binary search pattern
 */
function detectBinarySearch(source: string): boolean {
	// Look for typical binary search patterns
	return /mid|middle|low.*high|left.*right/.test(source) &&
	       /\/\s*2|\+.*\/\s*2/.test(source)
}