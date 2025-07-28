import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type { IntangibleProps } from "../index.ts"

import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export interface RatingProps {
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
