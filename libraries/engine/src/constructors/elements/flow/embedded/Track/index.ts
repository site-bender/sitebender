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
import isDefined from "@engineSrc/utilities/isDefined/index.ts"
import filterAttributes from "./filterAttributes/index.ts"

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
const Track = (
	attributes: Partial<TrackElementAttributes> = {},
): ElementConfig => {
	const { id, ...attribs } = filterAttributes(attributes as TrackElementAttributes)
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
