import type Thing from "../../index.ts"
import type MediaObject from "../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import MediaObjectComponent from "../../../../components/Thing/MediaObject/index.ts"

export interface MediaReviewItemProps {
	mediaItemAppearance?: MediaObject | ReturnType<typeof MediaObjectComponent>
}

type MediaReviewItem = Thing & CreativeWorkProps & MediaReviewItemProps

export default MediaReviewItem
