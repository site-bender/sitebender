import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type ItemList from "../../Intangible/ItemList/index.ts"
import type ListItem from "../../Intangible/ListItem/index.ts"
import type Rating from "../../Intangible/Rating/index.ts"
import type WebContent from "../WebContent/index.ts"

export interface ReviewProps {
	associatedClaimReview?: Review
	associatedMediaReview?: Review
	associatedReview?: Review
	itemReviewed?: Thing
	negativeNotes?: ItemList | ListItem | Text | WebContent
	positiveNotes?: ItemList | ListItem | Text | WebContent
	reviewAspect?: Text
	reviewBody?: Text
	reviewRating?: Rating
}

type Review =
	& Thing
	& CreativeWorkProps
	& ReviewProps

export default Review
