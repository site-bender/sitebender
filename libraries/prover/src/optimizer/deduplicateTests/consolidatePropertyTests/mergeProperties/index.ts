/**
 * Merge multiple property tests into consolidated set
 */

import type { PropertyTest } from "../../../../types/index.ts"

/**
 * Merge multiple property tests, removing duplicates
 * @param properties Array of property tests to merge
 * @returns Consolidated array of unique properties
 */
export default function mergeProperties(properties: Array<PropertyTest>): Array<PropertyTest> {
	const seen = properties.reduce((acc, prop) => {
		const key = `${prop.name}:${prop.generator}`

		// If we've seen this property, keep the one with more runs
		if (acc.has(key)) {
			const existing = acc.get(key)!
			if ((prop.runs || 100) > (existing.runs || 100)) {
				acc.set(key, prop)
			}
		} else {
			acc.set(key, prop)
		}

		return acc
	}, new Map<string, PropertyTest>())

	return Array.from(seen.values())
}
