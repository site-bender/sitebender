import type { Integer } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { RatingProps } from "../index.ts"
import type { EmployerAggregateRatingType } from "./EmployerAggregateRating/index.ts"

import ThingComponent from "../../../../../../src/define/Thing/index.tsx"

export type AggregateRatingType =
	| "AggregateRating"
	| EmployerAggregateRatingType

export interface AggregateRatingProps {
	"@type"?: AggregateRatingType
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
