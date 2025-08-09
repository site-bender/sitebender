import Filtered from "../../../../../constructors/abstracted/Filtered/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isInteger from "../../../../../guards/isInteger/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

/**
 * Filters attributes for Canvas element
 * Allows global attributes and validates canvas-specific attributes
 */
export const filterAttributes = (attributes: Record<string, unknown>) => {
	const { id, height, width, ...otherAttributes } = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isInteger)("height")(height),
		...filterAttribute(isInteger)("width")(width),
	}
}

/**
 * Creates a Canvas element configuration object
 *
 * The canvas element provides a resolution-dependent bitmap canvas,
 * which can be used for rendering graphs, game graphics, or other visual images on the fly.
 *
 * @example
 * ```typescript
 * const canvas = Canvas({
 *   width: 800,
 *   height: 600,
 *   id: "game-canvas"
 * })([
 *   TextNode("Your browser does not support the canvas element.")
 * ])
 * ```
 */
export const Canvas = (attributes: any = {}) => (children: any = []) => {
	const filteredChildren = Array.isArray(children) ? children : [children]

	return Filtered("Canvas")(filterAttributes)(attributes)(filteredChildren)
}

export default Canvas
