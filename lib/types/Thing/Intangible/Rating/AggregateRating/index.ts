import type { Integer } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { RatingProps } from "../index.ts"

export interface AggregateRatingProps {
	itemReviewed?: Thing
	ratingCount?: Integer
	reviewCount?: Integer
}

type AggregateRating =
	& Thing
	& IntangibleProps
	& RatingProps
	& AggregateRatingProps

export default AggregateRating
