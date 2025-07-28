import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"
import type MediaManipulationRatingEnumeration from "../../../Intangible/Enumeration/MediaManipulationRatingEnumeration/index.ts"
import type MediaObject from "../../../MediaObject/index.ts"
import type WebPage from "../../WebPage/index.ts"

import MediaReviewComponent from "../../../../../../components/Thing/CreativeWork/Review/MediaReview/index.tsx"

export interface MediaReviewProps {
	mediaAuthenticityCategory?: MediaManipulationRatingEnumeration
	originalMediaContextDescription?: Text
	originalMediaLink?: MediaObject | URL | WebPage
}

type MediaReview =
	& Thing
	& CreativeWorkProps
	& ReviewProps
	& MediaReviewProps

export default MediaReview
