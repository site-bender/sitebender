import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type ItemList from "../../Intangible/ItemList/index.ts"
import type ListItem from "../../Intangible/ListItem/index.ts"
import type Rating from "../../Intangible/Rating/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type WebContent from "../WebContent/index.ts"
import type { ClaimReviewType } from "./ClaimReview/index.ts"
import type { CriticReviewType } from "./CriticReview/index.ts"
import type { EmployerReviewType } from "./EmployerReview/index.ts"
import type { MediaReviewType } from "./MediaReview/index.ts"
import type { RecommendationType } from "./Recommendation/index.ts"
import type { UserReviewType } from "./UserReview/index.ts"

import { ItemList as ItemListComponent } from "../../../../../components/index.tsx"
import { ListItem as ListItemComponent } from "../../../../../components/index.tsx"
import { Rating as RatingComponent } from "../../../../../components/index.tsx"
import { Review as ReviewComponent } from "../../../../../components/index.tsx"
import { Thing as ThingComponent } from "../../../../../components/index.tsx"
import { WebContent as WebContentComponent } from "../../../../../components/index.tsx"

export type ReviewType =
	| "Review"
	| RecommendationType
	| ClaimReviewType
	| MediaReviewType
	| EmployerReviewType
	| CriticReviewType
	| UserReviewType

export interface ReviewProps {
	"@type"?: ReviewType
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
