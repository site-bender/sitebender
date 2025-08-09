import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isNumber from "../../../../../guards/isNumber/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Progress element
 * Allows global attributes and validates progress-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, max, value, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isNumber)("max")(max),
		...filterAttribute(isNumber)("value")(value),
	}
}

/**
 * Creates a Progress element configuration object
 *
 * The progress element represents the completion progress of a task.
 *
 * @example
 * ```typescript
 * const progress = Progress({
 *   value: 70,
 *   max: 100
 * })([
 *   TextNode("70% complete")
 * ])
 * ```
 */
export const Progress = (attributes: any = {}) => (children: any = []) => {
	const filteredChildren = Array.isArray(children) ? children : [children]

	return Filtered("Progress")(filterAttributes)(attributes)(filteredChildren)
}

export default Progress
