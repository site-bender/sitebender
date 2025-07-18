import type { Integer } from "../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type Rating from "../index.ts"

export default interface AggregateRating extends Rating {
	/** The item that is being reviewed/rated. */
	itemReviewed?: Thing
	/** The count of total number of ratings. */
	ratingCount?: Integer
	/** The count of total number of reviews. */
	reviewCount?: Integer
}
