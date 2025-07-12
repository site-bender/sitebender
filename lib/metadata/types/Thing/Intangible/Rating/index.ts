import type { Number, Text } from "../../../DataType/index.ts"
import type { Organization } from "../../Organization/index.ts"
import type { Person } from "../../Person/index.ts"
import type { Intangible } from "../index.ts"

// Rating interface - extends Intangible
// A rating is an evaluation on a numeric scale, such as 1 to 5 stars.
export interface Rating extends Intangible {
	author?: Organization | Person
	bestRating?: Number | Text
	ratingExplanation?: Text
	ratingValue?: Number | Text
	reviewAspect?: Text
	worstRating?: Number | Text
}
