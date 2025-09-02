import type { NoAriaAttributes } from "@engineSrc/constructors/elements/types/aria/index.ts"
import type { TrackAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
	ComparatorConfig,
	LogicalConfig,
	Operand,
	OperatorConfig,
	Value,
} from "@engineTypes/index.ts"

import getId from "@engineSrc/constructors/helpers/getId/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

/**
 * Valid track kinds
 */
const TRACK_KINDS = [
	"subtitles",
	"captions",
	"descriptions",
	"chapters",
	"metadata",
] as const

/**
 * Extended Track attributes including reactive properties and ARIA
 * Track elements have limited ARIA support (mainly aria-hidden)
 */
export type TrackElementAttributes = TrackAttributes & NoAriaAttributes & {
	calculation?: Operand
	dataset?: Record<string, Value>
	display?: ComparatorConfig | LogicalConfig
	format?: OperatorConfig
	scripts?: string[]
	stylesheets?: string[]
	validation?: ComparatorConfig | LogicalConfig
}

/**
 * Filters attributes for Track element
 * Allows global attributes and validates track-specific attributes
 */
export const filterAttributes = (attributes: TrackElementAttributes) => {
	const {
		id,
		default: defaultTrack,
		kind,
		label,
		src,
		srcLang,
		// ARIA attributes (limited for Track elements)
		"aria-hidden": ariaHidden,
		// Reactive properties (to be excluded from HTML attributes)
		calculation: _calculation,
		dataset: _dataset,
		display: _display,
		format: _format,
		scripts: _scripts,
		stylesheets: _stylesheets,
		validation: _validation,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	// Build the filtered attributes object step by step to avoid union type complexity
	const filteredAttrs: Record<string, unknown> = {}

	// Add ID if present
	Object.assign(filteredAttrs, getId(id))

	// Add global attributes
	Object.assign(filteredAttrs, globals)

	// Add track-specific attributes
	if (isDefined(defaultTrack)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("default")(defaultTrack),
		)
	}
	if (isDefined(kind)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isMemberOf(TRACK_KINDS))("kind")(kind),
		)
	}
	if (isDefined(label)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("label")(label))
	}
	if (isDefined(src)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("src")(src))
	}
	if (isDefined(srcLang)) {
		Object.assign(filteredAttrs, filterAttribute(isString)("srclang")(srcLang))
	}

	// Add ARIA attributes (limited for Track elements)
	if (isDefined(ariaHidden)) {
		Object.assign(
			filteredAttrs,
			filterAttribute(isBoolean)("aria-hidden")(ariaHidden),
		)
	}

	return filteredAttrs
}

/**
 * Creates a Track element configuration object
 *
 * The track element provides text tracks for audio and video elements.
 * This is a void element (cannot have children).
 *
 * @example
 * ```typescript
 * const track = Track({
 *   src: "subtitles.vtt",
 *   kind: "subtitles",
 *   srcLang: "en",
 *   label: "English Subtitles",
 *   default: true
 * })
 * ```
 */
export const Track = (
	attributes: Partial<TrackElementAttributes> = {},
): ElementConfig => {
	const { id, ...attribs } = filterAttributes(
		attributes as TrackElementAttributes,
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
		children: [], // Void element
		...(isDefined(calculation) ? { calculation } : {}),
		...(isDefined(dataset) ? { dataset } : {}),
		...(isDefined(display) ? { display } : {}),
		...(isDefined(format) ? { format } : {}),
		...(isDefined(scripts) ? { scripts } : {}),
		...(isDefined(stylesheets) ? { stylesheets } : {}),
		...(isDefined(validation) ? { validation } : {}),
		tag: "Track",
	}
}

export default Track
