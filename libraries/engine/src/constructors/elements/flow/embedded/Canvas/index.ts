import type { ImageAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { CanvasAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"
import TextNode from "@engineSrc/constructors/elements/TextNode/index.ts"
import isPhrasingContent from "@engineSrc/guards/isPhrasingContent/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import isDefined from "@engineSrc/utilities/isDefined/index.ts"
import filterAttributes from "./filterAttributes/index.ts"

/**
 * Extended Canvas attributes including reactive properties and ARIA
 */
export type CanvasElementAttributes = CanvasAttributes & ImageAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Canvas element
 * Allows global attributes and validates canvas-specific attributes
 */


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
const Canvas = (attributes: CanvasElementAttributes = {}) =>
(
	children: Array<ElementConfig> | ElementConfig | string = [],
): ElementConfig => {
	const { id, ...attribs } = filterAttributes(attributes)
	const {
		calculation,
		dataset,
		display,
		format,
		scripts,
		stylesheets,
		validation,
	} = attributes

	// Convert string children to TextNode and filter children
	const kids = isString(children)
		? [TextNode(children)]
		: Array.isArray(children)
		? children.filter((c) => {
			const cand = c as unknown
			if (
				!cand || typeof cand !== "object" ||
				!("tag" in (cand as Record<string, unknown>))
			) return true
			return isPhrasingContent()(cand as never)
		})
		: (() => {
			const c = children as unknown
			if (
				!c || typeof c !== "object" ||
				!("tag" in (c as Record<string, unknown>))
			) return [children]
			return isPhrasingContent()(c as never) ? [children] : []
		})()

	return {
		attributes: {
			id,
			...attribs,
		},
		children: kids,
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "Canvas",
	}
}

export default Canvas
