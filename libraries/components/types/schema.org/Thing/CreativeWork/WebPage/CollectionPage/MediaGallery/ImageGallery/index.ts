import type Thing from "../../../../../index.ts"
import type { CreativeWorkProps } from "../../../../index.ts"
import type { WebPageProps } from "../../../index.ts"
import type { CollectionPageProps } from "../../index.ts"
import type { MediaGalleryProps } from "../index.ts"

export type ImageGalleryType = "ImageGallery"

export interface ImageGalleryProps {
	"@type"?: ImageGalleryType
}

type ImageGallery =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& CollectionPageProps
	& MediaGalleryProps
	& ImageGalleryProps

export default ImageGallery
