import type { Text, URL } from "../../../DataType/index.ts"
import type ImageObject from "../../CreativeWork/MediaObject/ImageObject/index.ts"
import type Review from "../../CreativeWork/Review/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type AggregateRating from "../Rating/AggregateRating/index.ts"

import ImageObjectComponent from "../../../../../../codewright/src/define/Thing/CreativeWork/MediaObject/ImageObject/index.tsx"
import ReviewComponent from "../../../../../../codewright/src/define/Thing/CreativeWork/Review/index.tsx"
import AggregateRatingComponent from "../../../../../../codewright/src/define/Thing/Intangible/Rating/AggregateRating/index.tsx"

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
