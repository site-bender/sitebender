import type { Text, URL } from "../../../DataType/index.ts"
import type ImageObject from "../../CreativeWork/MediaObject/ImageObject/index.ts"
import type Review from "../../CreativeWork/Review/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type AggregateRating from "../Rating/AggregateRating/index.ts"

import ImageObjectComponent from "../../../../components/Thing/CreativeWork/MediaObject/ImageObject/index.ts"
import ReviewComponent from "../../../../components/Thing/CreativeWork/Review/index.ts"
import AggregateRatingComponent from "../../../../components/Thing/Intangible/Rating/AggregateRating/index.ts"

export type BrandType = "Brand"

export interface BrandProps {
	"@type"?: BrandType
	aggregateRating?:
		| AggregateRating
		| ReturnType<typeof AggregateRatingComponent>
	logo?: ImageObject | URL | ReturnType<typeof ImageObjectComponent>
	review?: Review | ReturnType<typeof ReviewComponent>
	slogan?: Text
}

type Brand = Thing & IntangibleProps & BrandProps

export default Brand
