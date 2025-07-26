import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { RatingProps } from "../../index.ts"
import type { AggregateRatingProps } from "../index.ts"

export interface EmployerAggregateRatingProps {
}

type EmployerAggregateRating =
	& Thing
	& IntangibleProps
	& RatingProps
	& AggregateRatingProps
	& EmployerAggregateRatingProps

export default EmployerAggregateRating
