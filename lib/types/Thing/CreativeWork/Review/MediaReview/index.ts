import type { Text, URL } from "../../../../DataType/index.ts"
import type MediaManipulationRatingEnumeration from "../../../Intangible/Enumeration/MediaManipulationRatingEnumeration/index.ts"
import type MediaObject from "../../MediaObject/index.ts"
import type WebPage from "../../WebPage/index.ts"
import type Review from "../index.ts"

export default interface MediaReview extends Review {
	/** Indicates a MediaManipulationRatingEnumeration classification of a media object (in the context of how it was published or shared). */
	mediaAuthenticityCategory?: MediaManipulationRatingEnumeration
	/** Describes, in a [[MediaReview]] when dealing with [[DecontextualizedContent]], background information that can contribute to better interpretation of the [[MediaObject]]. */
	originalMediaContextDescription?: Text
	/** Link to the page containing an original version of the content, or directly to an online copy of the original [[MediaObject]] content, e.g. video file. */
	originalMediaLink?: MediaObject | WebPage | URL
}
