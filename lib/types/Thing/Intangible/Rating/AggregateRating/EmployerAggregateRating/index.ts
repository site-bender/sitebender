// EmployerAggregateRating extends AggregateRating but adds no additional properties
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { RatingProps } from "../../index.ts"
import type { AggregateRatingProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface EmployerAggregateRatingProps {}

type EmployerAggregateRating =
	& Thing
	& AggregateRatingProps
	& IntangibleProps
	& RatingProps
	& EmployerAggregateRatingProps

export default EmployerAggregateRating
