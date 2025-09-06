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
	const seen = new Map<string, PropertyTest>()
	
	for (const prop of properties) {
		const key = `${prop.name}:${prop.generator}`
		
		// If we've seen this property, keep the one with more runs
		if (seen.has(key)) {
			const existing = seen.get(key)!
			if ((prop.runs || 100) > (existing.runs || 100)) {
				seen.set(key, prop)
			}
		} else {
			seen.set(key, prop)
		}
	}
	
	return Array.from(seen.values())
}