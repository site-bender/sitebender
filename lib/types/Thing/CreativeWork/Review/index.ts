import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type ItemList from "../../Intangible/ItemList/index.ts"
import type ListItem from "../../Intangible/ListItem/index.ts"
import type Rating from "../../Intangible/Rating/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type WebContent from "../WebContent/index.ts"

import ReviewComponent from "../../../../components/Thing/CreativeWork/Review/index.ts"
import WebContentComponent from "../../../../components/Thing/CreativeWork/WebContent/index.ts"
import ThingComponent from "../../../../components/Thing/index.ts"
import ItemListComponent from "../../../../components/Thing/Intangible/ItemList/index.ts"
import ListItemComponent from "../../../../components/Thing/Intangible/ListItem/index.ts"
import RatingComponent from "../../../../components/Thing/Intangible/Rating/index.ts"

export interface ReviewProps {
	"@type"?: "Review"
	associatedClaimReview?: Review | ReturnType<typeof ReviewComponent>
	associatedMediaReview?: Review | ReturnType<typeof ReviewComponent>
	associatedReview?: Review | ReturnType<typeof ReviewComponent>
	itemReviewed?: Thing | ReturnType<typeof ThingComponent>
	negativeNotes?:
		| ItemList
		| ListItem
		| Text
		| WebContent
		| ReturnType<typeof ItemListComponent>
		| ReturnType<typeof ListItemComponent>
		| ReturnType<typeof WebContentComponent>
	positiveNotes?:
		| ItemList
		| ListItem
		| Text
		| WebContent
		| ReturnType<typeof ItemListComponent>
		| ReturnType<typeof ListItemComponent>
		| ReturnType<typeof WebContentComponent>
	reviewAspect?: Text
	reviewBody?: Text
	reviewRating?: Rating | ReturnType<typeof RatingComponent>
}

type Review = Thing & CreativeWorkProps & ReviewProps

export default Review
