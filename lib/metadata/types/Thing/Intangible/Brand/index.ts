import type { Text } from "../../../DataType/index.ts"
import type { Review } from "../../CreativeWork/Review/index.ts"
import type { AggregateRating, ImageObject, URL } from "../../index.ts"
import type { Intangible } from "../index.ts"

// Brand interface - extends Intangible
// A brand is a name used by an organization or business person for labeling a product, product group, or similar.
export interface Brand extends Intangible {
	aggregateRating?: AggregateRating
	logo?: ImageObject | URL
	review?: Review
	slogan?: Text
}
