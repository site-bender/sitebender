import type Thing from "../../index.ts"
import type MediaObject from "../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import { MediaObject as MediaObjectComponent } from "../../../../../components/index.tsx"

export type MediaReviewItemType = "MediaReviewItem"

export interface MediaReviewItemProps {
	"@type"?: MediaReviewItemType
	mediaItemAppearance?: MediaObject | ReturnType<typeof MediaObjectComponent>
}

type MediaReviewItem = Thing & CreativeWorkProps & MediaReviewItemProps

export default MediaReviewItem
