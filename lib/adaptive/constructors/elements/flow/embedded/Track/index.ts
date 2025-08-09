import type { TrackAttributes } from "../../../../../constructors/elements/types/attributes/index.ts"
import type {
	ElementAttributes,
	ElementConfig,
} from "../../../../../constructors/elements/types/index.ts"

import FilteredEmpty from "../../../../../constructors/abstracted/FilteredEmpty/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isBoolean from "../../../../../guards/isBoolean/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import isString from "../../../../../guards/isString/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

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
 * Filters attributes for Track element
 * Allows global attributes and validates track-specific attributes
 */
export const filterAttributes = (
	attributes: Record<string, unknown>,
) => {
	const {
		id,
		default: defaultTrack,
		kind,
		label,
		src,
		srcLang,
		...otherAttributes
	} = attributes
	const globals = pickGlobalAttributes(otherAttributes)

	return {
		...getId(id),
		...globals,
		...filterAttribute(isBoolean)("default")(defaultTrack),
		...filterAttribute(isMemberOf(TRACK_KINDS))("kind")(kind),
		...filterAttribute(isString)("label")(label),
		...filterAttribute(isString)("src")(src),
		...filterAttribute(isString)("srclang")(srcLang),
	}
}

/**
 * Creates a Track element configuration object
 *
 * The track element provides text tracks for audio and video elements.
 * It is a void element and cannot contain children.
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
export const Track = FilteredEmpty("Track")(filterAttributes)

export default Track
