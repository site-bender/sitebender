import type Thing from "../../../../../index.ts"
import type { CreativeWorkProps } from "../../../../index.ts"
import type { WebPageProps } from "../../../index.ts"
import type { CollectionPageProps } from "../../index.ts"
import type { MediaGalleryProps } from "../index.ts"

export interface VideoGalleryProps {
}

type VideoGallery =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& CollectionPageProps
	& MediaGalleryProps
	& VideoGalleryProps

export default VideoGallery
