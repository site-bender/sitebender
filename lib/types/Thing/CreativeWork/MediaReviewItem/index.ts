import type CreativeWork from "../index.ts"
import type MediaObject from "../MediaObject/index.ts"

export default interface MediaReviewItem extends CreativeWork {
	/** In the context of a [[MediaReview]], indicates specific media item(s) that are grouped using a [[MediaReviewItem]]. */
	mediaItemAppearance?: MediaObject
}
