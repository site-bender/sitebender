import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type MediaManipulationRatingEnumeration from "../../../Intangible/Enumeration/MediaManipulationRatingEnumeration/index.ts"
import type MediaObject from "../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type WebPage from "../../WebPage/index.ts"
import type { ReviewProps } from "../index.ts"

import { MediaManipulationRatingEnumeration as MediaManipulationRatingEnumerationComponent } from "../../../../../../components/index.tsx"
import { MediaObject as MediaObjectComponent } from "../../../../../../components/index.tsx"
import { WebPage as WebPageComponent } from "../../../../../../components/index.tsx"

export type MediaReviewType = "MediaReview"

export interface MediaReviewProps {
	"@type"?: MediaReviewType
	mediaAuthenticityCategory?:
		| MediaManipulationRatingEnumeration
		| ReturnType<typeof MediaManipulationRatingEnumerationComponent>
	originalMediaContextDescription?: Text
	originalMediaLink?:
		| MediaObject
		| URL
		| WebPage
		| ReturnType<typeof MediaObjectComponent>
		| ReturnType<typeof WebPageComponent>
}

type MediaReview = Thing & CreativeWorkProps & ReviewProps & MediaReviewProps

export default MediaReview
