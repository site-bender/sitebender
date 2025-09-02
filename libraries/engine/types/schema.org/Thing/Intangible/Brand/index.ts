import type { Text, URL } from "../../../DataType/index.ts"
import type ImageObject from "../../CreativeWork/MediaObject/ImageObject/index.ts"
import type Review from "../../CreativeWork/Review/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type AggregateRating from "../Rating/AggregateRating/index.ts"

import { AggregateRating as AggregateRatingComponent } from "../../../../../components/index.tsx"
import { ImageObject as ImageObjectComponent } from "../../../../../components/index.tsx"
import { Review as ReviewComponent } from "../../../../../components/index.tsx"

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
