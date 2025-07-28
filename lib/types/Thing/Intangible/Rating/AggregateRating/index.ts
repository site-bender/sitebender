import type { Integer } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { RatingProps } from "../index.ts"

import ThingComponent from "../../../../../components/Thing/index.ts"

export interface AggregateRatingProps {
	itemReviewed?: Thing | ReturnType<typeof ThingComponent>
	ratingCount?: Integer
	reviewCount?: Integer
}

type AggregateRating =
	& Thing
	& IntangibleProps
	& RatingProps
	& AggregateRatingProps

export default AggregateRating
