import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type AggregateRating from "../Rating/AggregateRating/index.ts"
import type ImageObject from "../../CreativeWork/MediaObject/ImageObject/index.ts"
import type Review from "../../CreativeWork/Review/index.ts"

import BrandComponent from "../../../../../components/Thing/Intangible/Brand/index.tsx"

export interface BrandProps {
	aggregateRating?: AggregateRating
	logo?: ImageObject | URL
	review?: Review
	slogan?: Text
}

type Brand =
	& Thing
	& IntangibleProps
	& BrandProps

export default Brand
