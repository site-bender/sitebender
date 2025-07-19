// ImageGallery extends MediaGallery but adds no additional properties
import type Thing from "../../../../../index.ts"
import type { CreativeWorkProps } from "../../../../index.ts"
import type { WebPageProps } from "../../../index.ts"
import type { CollectionPageProps } from "../../index.ts"
import type { MediaGalleryProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ImageGalleryProps {}

type ImageGallery =
	& Thing
	& CollectionPageProps
	& CreativeWorkProps
	& MediaGalleryProps
	& WebPageProps
	& ImageGalleryProps

export default ImageGallery
