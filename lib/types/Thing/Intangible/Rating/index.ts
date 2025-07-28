import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"

import RatingComponent from "../../../../../components/Thing/Intangible/Rating/index.tsx"

export interface RatingProps {
	author?: Organization | Person
	bestRating?: Number | Text
	ratingExplanation?: Text
	ratingValue?: Number | Text
	reviewAspect?: Text
	worstRating?: Number | Text
}

type Rating =
	& Thing
	& IntangibleProps
	& RatingProps

export default Rating
