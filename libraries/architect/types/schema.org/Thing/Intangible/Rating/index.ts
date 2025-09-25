import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type { IntangibleProps } from "../index.ts"
import type { AggregateRatingType } from "./AggregateRating/index.ts"
import type { EndorsementRatingType } from "./EndorsementRating/index.ts"

import OrganizationComponent from "../../../../../../pagewright/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../pagewright/src/define/Thing/Person/index.tsx"

export type RatingType = "Rating" | EndorsementRatingType | AggregateRatingType

export interface RatingProps {
	"@type"?: RatingType
	author?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	bestRating?: Number | Text
	ratingExplanation?: Text
	ratingValue?: Number | Text
	reviewAspect?: Text
	worstRating?: Number | Text
}

type Rating = Thing & IntangibleProps & RatingProps

export default Rating
