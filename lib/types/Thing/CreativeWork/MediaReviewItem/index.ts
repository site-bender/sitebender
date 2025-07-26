import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MediaObject from "../../MediaObject/index.ts"

export interface MediaReviewItemProps {
	mediaItemAppearance?: MediaObject
}

type MediaReviewItem =
	& Thing
	& CreativeWorkProps
	& MediaReviewItemProps

export default MediaReviewItem
