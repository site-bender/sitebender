/**
 * Consolidate overlapping property tests
 */

import type { PropertyTest, TestCase } from "../../../types/index.ts"

import haveOverlappingGenerators from "./haveOverlappingGenerators/index.ts"
import mergeProperties from "./mergeProperties/index.ts"

/**
 * Consolidate property tests with overlapping generators
 * @param tests Array of test cases
 * @returns Array with consolidated property tests
 */
export default function consolidatePropertyTests(
	tests: Array<TestCase>,
): Array<TestCase> {
	// Separate property tests from others using partition
	const { propertyTests, nonPropertyTests } = tests.reduce(
		(acc, test) => {
			if (test.properties && test.properties.length > 0) {
				return { ...acc, propertyTests: [...acc.propertyTests, test] }
			} else {
				return {
					...acc,
					nonPropertyTests: [...acc.nonPropertyTests, test],
				}
			}
		},
		{
			propertyTests: [] as Array<TestCase>,
			nonPropertyTests: [] as Array<TestCase>,
		},
	)

	// Group property tests by similar generators using recursive approach
	const consolidateRecursive = (
		remaining: Array<TestCase>,
		processed: Set<number>,
		result: Array<TestCase>,
	): Array<TestCase> => {
		if (remaining.length === 0) return result

		const [current, ...rest] = remaining
		const currentIndex = propertyTests.indexOf(current)

		if (processed.has(currentIndex)) {
			return consolidateRecursive(rest, processed, result)
		}

		// Find all overlapping tests
		const overlapping = propertyTests
			.map((test, index) => ({ test, index }))
			.filter(({ test, index }) =>
				index > currentIndex &&
				!processed.has(index) &&
				haveOverlappingGenerators(current, test)
			)

		// Collect all properties to merge
		const toMerge: Array<PropertyTest> = [
			...(current.properties || []),
			...overlapping.flatMap(({ test }) => test.properties || []),
		]

		// Mark as processed
		const newProcessed = new Set([
			...processed,
			currentIndex,
			...overlapping.map(({ index }) => index),
		])

		// Create consolidated test
		const consolidatedTest: TestCase = {
			...current,
			name: `property tests: ${toMerge.map((p) => p.name).join(", ")}`,
			properties: mergeProperties(toMerge),
		}

		return consolidateRecursive(rest, newProcessed, [
			...result,
			consolidatedTest,
		])
	}

	const consolidated = consolidateRecursive(propertyTests, new Set(), [])

	return [...nonPropertyTests, ...consolidated]
}
