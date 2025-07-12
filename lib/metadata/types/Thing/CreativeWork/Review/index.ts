import type { Text } from "../../../DataType/index.ts"
import type { Thing, WebContent } from "../../index.ts"
import type { ItemList } from "../../Intangible/ItemList/index.ts"
import type { ListItem } from "../../Intangible/ListItem/index.ts"
import type { Rating } from "../../Intangible/Rating/index.ts"
import type { CreativeWork } from "../index.ts"

// Review interface - extends CreativeWork
// A review of an item - for example, of a restaurant, movie, or store.
export interface Review extends CreativeWork {
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
