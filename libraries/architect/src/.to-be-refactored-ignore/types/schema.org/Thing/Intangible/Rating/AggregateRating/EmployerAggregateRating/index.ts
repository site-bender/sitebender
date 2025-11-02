import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { RatingProps } from "../../index.ts"
import type { AggregateRatingProps } from "../index.ts"

export type EmployerAggregateRatingType = "EmployerAggregateRating"

export interface EmployerAggregateRatingProps {
	"@type"?: EmployerAggregateRatingType
}

type EmployerAggregateRating =
	& Thing
	& IntangibleProps
	& RatingProps
	& AggregateRatingProps
	& EmployerAggregateRatingProps

export default EmployerAggregateRating
