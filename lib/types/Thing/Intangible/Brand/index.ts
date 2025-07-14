import { Text, URL } from "../../../DataType/index.ts"
import ImageObject from "../../CreativeWork/MediaObject/ImageObject/index.ts"
import Review from "../../CreativeWork/Review/index.ts"
import Intangible from "../index.ts"
import AggregateRating from "../Rating/AggregateRating/index.ts"

export default interface Brand extends Intangible {
	/** The overall rating, based on a collection of reviews or ratings, of the item. */
	aggregateRating?: AggregateRating
	/** An associated logo. */
	logo?: URL | ImageObject
	/** A review of the item. */
	review?: Review
	/** A slogan or motto associated with the item. */
	slogan?: Text
}
