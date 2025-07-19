import type { Text, URL } from "../../../DataType/index.ts"
import type ImageObject from "../../CreativeWork/MediaObject/ImageObject/index.ts"
import type Review from "../../CreativeWork/Review/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type AggregateRating from "../Rating/AggregateRating/index.ts"

export interface BrandProps {
	/** The overall rating, based on a collection of reviews or ratings, of the item. */
	aggregateRating?: AggregateRating
	/** An associated logo. */
	logo?: URL | ImageObject
	/** A review of the item. */
	review?: Review
	/** A slogan or motto associated with the item. */
	slogan?: Text
}

type Brand =
	& Thing
	& IntangibleProps
	& BrandProps

export default Brand
