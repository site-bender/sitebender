import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { WebPageProps } from "../../index.ts"
import type { CollectionPageProps } from "../index.ts"
import type { ImageGalleryType } from "./ImageGallery/index.ts"
import type { VideoGalleryType } from "./VideoGallery/index.ts"

export type MediaGalleryType =
	| "MediaGallery"
	| VideoGalleryType
	| ImageGalleryType

export interface MediaGalleryProps {
	"@type"?: MediaGalleryType
}

type MediaGallery =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& CollectionPageProps
	& MediaGalleryProps

export default MediaGallery
