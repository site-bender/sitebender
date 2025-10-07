import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import isFlowContent from "@sitebender/architect/guards/isFlowContent/index.ts"
import isHeadingContent from "@sitebender/architect/guards/isHeadingContent/index.ts"
import isInteractiveContent from "@sitebender/architect/guards/isInteractiveContent/index.ts"
import isPhrasingContent from "@sitebender/architect/guards/isPhrasingContent/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
type PartialElementConfig = {
	readonly tag?: string
	readonly attributes?: Record<string, unknown>
	readonly children?: readonly unknown[]
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const createPhrasingNonInteractiveFilter = (
	additionalExclusions: string[] = [],
) =>
(child: ElementConfig): boolean => {
	// Accept text nodes and other primitive content
	if (!child || typeof child !== "object" || !("tag" in child)) {
		return true
	}

	const element = child as PartialElementConfig
	const { tag } = element

	// Exclude interactive elements
	if (tag && isInteractiveContent(element)) {
		return false
	}

	// Exclude additional specific elements (like Label within Label)
	if (tag && additionalExclusions.includes(tag)) {
		return false
	}

	// Allow phrasing content
	return isPhrasingContent()(element)
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const createFlowNonInteractiveFilter = (
	additionalExclusions: string[] = [],
) =>
(child: ElementConfig): boolean => {
	// Accept text nodes and other primitive content
	if (!child || typeof child !== "object" || !("tag" in child)) {
		return true
	}

	const element = child as PartialElementConfig
	const { tag } = element

	// Exclude interactive elements
	if (tag && isInteractiveContent(element)) {
		return false
	}

	// Exclude additional specific elements
	if (tag && additionalExclusions.includes(tag)) {
		return false
	}

	// Allow flow content
	return isFlowContent()(element)
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const createLegendContentFilter = (
	exclusions: string[] = [],
) =>
(child: ElementConfig): boolean => {
	// Accept text nodes and other primitive content
	if (!child || typeof child !== "object" || !("tag" in child)) {
		return true
	}

	const element = child as PartialElementConfig
	const { tag } = element

	// Exclude specific elements
	if (tag && exclusions.includes(tag)) {
		return false
	}

	// Allow phrasing content or heading content
	return isPhrasingContent()(element) ||
		(tag ? isHeadingContent({ tag }) : false)
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const createDetailsContentFilter = () => (children: unknown[]): unknown[] => {
	if (!Array.isArray(children)) {
		return []
	}

	// Separate Summary elements from other elements
	const summaryElements: unknown[] = []
	const otherElements: unknown[] = []
	const textAndPrimitives: unknown[] = []

	children.forEach((child) => {
		// Accept text nodes and other primitive content
		if (!child || typeof child !== "object" || !("tag" in child)) {
			textAndPrimitives.push(child)
			return
		}

		const element = child as PartialElementConfig
		const { tag } = element

		if (tag === "Summary") {
			summaryElements.push(child)
		} else {
			otherElements.push(child)
		}
	})

	// Take the first Summary element (if any) to be the disclosure widget
	const firstSummary = summaryElements.length > 0 ? [summaryElements[0]] : []

	// Additional Summary elements are treated as regular content
	const additionalSummaries = summaryElements.slice(1)

	// Filter other elements: allow flow content but exclude interactive elements
	const validOtherElements = [...otherElements, ...additionalSummaries]
		.filter((child) => {
			if (!child || typeof child !== "object" || !("tag" in child)) {
				return true
			}

			const element = child as PartialElementConfig
			const { tag } = element

			// Exclude interactive elements (except Summary which we handle separately)
			if (tag && tag !== "Summary" && isInteractiveContent(element)) {
				return false
			}

			// Allow flow content
			return isFlowContent()(element)
		})

	// Return reordered array: Summary first, then text/primitives, then other valid elements
	return [...firstSummary, ...textAndPrimitives, ...validOtherElements]
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const createSelfExcludingFilter =
	(selfTag: string) => (child: ElementConfig): boolean => {
		// Accept text nodes and other primitive content
		if (!child || typeof child !== "object" || !("tag" in child)) {
			return true
		}

		const element = child as PartialElementConfig
		const { tag } = element

		// Exclude the same element type
		if (tag === selfTag) {
			return false
		}

		// Allow flow content (this works for Address, Form, etc.)
		return isFlowContent()(element)
	}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const ADVANCED_FILTERS = {
	// For Button elements - phrasing content but no interactive elements
	buttonContent: createPhrasingNonInteractiveFilter(),

	// For Label elements - phrasing content but no interactive elements and no nested labels
	labelContent: createPhrasingNonInteractiveFilter(["Label"]),

	// For A elements - flow content but no interactive elements
	anchorContent: createFlowNonInteractiveFilter(),

	// For Legend elements - phrasing/heading content but no nested legends
	legendContent: createLegendContentFilter(["Legend"]),

	// For Details elements - special Summary + flow content rules
	detailsContent: createDetailsContentFilter(),

	// For Address elements - flow content but no nested addresses
	addressContent: createSelfExcludingFilter("Address"),

	// For Form elements - flow content but no nested forms
	formContent: createSelfExcludingFilter("Form"),

	// Simple phrasing-only filter (allows interactive per spec of phrasing)
	phrasingContent: (child: ElementConfig): boolean => {
		if (!child || typeof child !== "object" || !("tag" in child)) {
			return true
		}
		const element = child as {
			tag?: string
			attributes?: Record<string, unknown>
			children?: readonly unknown[]
		}
		return isPhrasingContent()(element)
	},

	// Audio content: allow <Source>, <Track>, and phrasing fallback content
	audioContent: (child: ElementConfig): boolean => {
		if (!child || typeof child !== "object" || !("tag" in child)) {
			return true
		}
		const element = child as {
			tag?: string
			attributes?: Record<string, unknown>
			children?: readonly unknown[]
		}
		const tag = element.tag
		return tag === "Source" || tag === "Track" ||
			isPhrasingContent()(element)
	},
} as const

export default ADVANCED_FILTERS
