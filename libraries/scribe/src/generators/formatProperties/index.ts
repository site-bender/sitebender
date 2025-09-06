import type { Properties } from "../../types/index.ts"
import { PROPERTY_BADGES } from "../../constants/index.ts"

/**
 * Formats properties as badges for documentation
 */
export default function formatProperties(properties: Properties): string {
	const badges: Array<string> = []
	
	if (properties.isPure) {
		badges.push(PROPERTY_BADGES.pure)
	}
	
	if (properties.isCurried) {
		const curryBadge = properties.curryLevels 
			? `${PROPERTY_BADGES.curried} (${properties.curryLevels} levels)`
			: PROPERTY_BADGES.curried
		badges.push(curryBadge)
	}
	
	if (properties.isIdempotent) {
		badges.push(PROPERTY_BADGES.idempotent)
	}
	
	if (properties.isCommutative) {
		badges.push(PROPERTY_BADGES.commutative)
	}
	
	if (properties.isAssociative) {
		badges.push(PROPERTY_BADGES.associative)
	}
	
	if (properties.isDistributive) {
		badges.push(PROPERTY_BADGES.distributive)
	}
	
	if (properties.deterministic && !properties.isPure) {
		// Only show deterministic if not already shown as pure
		badges.push(PROPERTY_BADGES.deterministic)
	}
	
	return badges.length > 0 ? badges.join(" | ") : "None detected"
}