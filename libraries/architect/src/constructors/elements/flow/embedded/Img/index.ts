import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@sitebender/architect-types/index.ts"
import type { ImageAriaAttributes } from "@sitebender/architect/constructors/elements/types/aria/index.ts"
import type { ImageAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@sitebender/architect/constructors/elements/types/index.ts"

import isDefined from "@sitebender/architect/utilities/isDefined/index.ts"

import filterAttributes from "./filterAttributes/index.ts"

/**
 * Extended Img attributes including reactive properties and ARIA
 */
export type ImgElementAttributes = ImageAttributes & ImageAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Img element
 * Allows global attributes and validates img-specific attributes
 */

/**
 * Creates an Img element configuration object
 *
 * The img element embeds an image into the document.
 * Images are void elements and cannot have children.
 *
 * @example
 * ```typescript
 * const img = Img({
 *   src: "image.jpg",
 *   alt: "Description of image",
 *   width: 300,
 *   height: 200,
 *   loading: "lazy"
 * })
 * ```
 */
const Img = (attributes: Partial<ImgElementAttributes> = {}): ElementConfig => {
	const { id, ...attribs } = filterAttributes(
		attributes as ImgElementAttributes,
	)
	const {
		calculation,
		dataset,
		display,
		format,
		scripts,
		stylesheets,
		validation,
	} = attributes

	return {
		attributes: {
			id,
			...attribs,
		},
		children: [], // Img is a void element
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "Img",
	}
}

export default Img
