import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MediaObject from "../MediaObject/index.ts"

export interface MediaReviewItemProps {
	/** In the context of a [[MediaReview]], indicates specific media item(s) that are grouped using a [[MediaReviewItem]]. */
	mediaItemAppearance?: MediaObject
}

type MediaReviewItem =
	& Thing
	& CreativeWorkProps
	& MediaReviewItemProps

export default MediaReviewItem
