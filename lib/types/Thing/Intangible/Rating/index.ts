import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type { IntangibleProps } from "../index.ts"

export interface RatingProps {
	/** The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably. */
	author?: Organization | Person
	/** The highest value allowed in this rating system. */
	bestRating?: Number | Text
	/** A short explanation (e.g. one to two sentences) providing background context and other information that led to the conclusion expressed in the rating. This is particularly applicable to ratings associated with "fact check" markup using [[ClaimReview]]. */
	ratingExplanation?: Text
	/** The rating for the content.\n\nUsage guidelines:\n\n* Use values from 0123456789 (Unicode 'DIGIT ZERO' (U+0030) to 'DIGIT NINE' (U+0039)) rather than superficially similar Unicode symbols.\n* Use '.' (Unicode 'FULL STOP' (U+002E)) rather than ',' to indicate a decimal point. Avoid using these symbols as a readability separator. */
	ratingValue?: Text | Number
	/** This Review or Rating is relevant to this part or facet of the itemReviewed. */
	reviewAspect?: Text
	/** The lowest value allowed in this rating system. */
	worstRating?: Text | Number
}

type Rating =
	& Thing
	& IntangibleProps
	& RatingProps

export default Rating
