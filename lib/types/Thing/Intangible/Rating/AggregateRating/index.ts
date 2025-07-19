import type { Integer } from "../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { RatingProps } from "../index.ts"

export interface AggregateRatingProps {
	/** The item that is being reviewed/rated. */
	itemReviewed?: Thing
	/** The count of total number of ratings. */
	ratingCount?: Integer
	/** The count of total number of reviews. */
	reviewCount?: Integer
}

type AggregateRating =
	& Thing
	& IntangibleProps
	& RatingProps
	& AggregateRatingProps

export default AggregateRating
