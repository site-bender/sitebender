import { Integer } from "../../../../DataType/index.ts"
import Thing from "../../../../index.ts"
import Rating from "../index.ts"

export default interface AggregateRating extends Rating {
	/** The item that is being reviewed/rated. */
	itemReviewed?: Thing
	/** The count of total number of ratings. */
	ratingCount?: Integer
	/** The count of total number of reviews. */
	reviewCount?: Integer
}
