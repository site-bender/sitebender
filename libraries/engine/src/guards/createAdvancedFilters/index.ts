import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"

import isFlowContent from "@engineSrc/guards/isFlowContent/index.ts"
import isHeadingContent from "@engineSrc/guards/isHeadingContent/index.ts"
import isInteractiveContent from "@engineSrc/guards/isInteractiveContent/index.ts"
import isPhrasingContent from "@engineSrc/guards/isPhrasingContent/index.ts"

/**
 * Configuration object for element validation (partial for flexibility)
 */
type PartialElementConfig = {
	readonly tag?: string
	readonly attributes?: Record<string, unknown>
	readonly children?: readonly unknown[]
}

/**
 * Creates a child filter that allows phrasing content but excludes interactive elements
 * Used for interactive elements like Button, Label that cannot contain other interactive elements
 *
 * @param additionalExclusions - Additional element tags to exclude (e.g., ["Label"] for Label elements)
 * @returns Child filter function
 */
export const createPhrasingNonInteractiveFilter = (
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

/**
 * Creates a child filter that allows flow content but excludes interactive elements
 * Used for A elements that can contain flow content but not interactive elements
 *
 * @param additionalExclusions - Additional element tags to exclude
 * @returns Child filter function
 */
export const createFlowNonInteractiveFilter = (
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

/**
 * Creates a child filter that allows phrasing and heading content but excludes specific elements
 * Used for Legend elements
 *
 * @param exclusions - Element tags to exclude (e.g., ["Legend"])
 * @returns Child filter function
 */
export const createLegendContentFilter = (
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

/**
 * Creates a content reorganizer for Details elements
 * Finds the first Summary element (regardless of position) and moves it to the front,
 * then validates remaining children as flow content (excluding interactive elements)
 *
 * @returns Function that reorganizes and validates Details children
 */
export const createDetailsContentFilter =
	() => (children: unknown[]): unknown[] => {
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

/**
 * Creates a child filter that excludes elements that cannot be nested within themselves
 * Used for Address, Form, and other self-excluding elements
 *
 * @param selfTag - The tag that cannot be nested within itself
 * @returns Child filter function
 */
export const createSelfExcludingFilter =
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

/**
 * Predefined filter instances for common use cases
 */
export const ADVANCED_FILTERS = {
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
		return tag === "Source" || tag === "Track" || isPhrasingContent()(element)
	},
} as const
