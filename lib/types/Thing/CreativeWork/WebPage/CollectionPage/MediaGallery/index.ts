import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { WebPageProps } from "../../index.ts"
import type { CollectionPageProps } from "../index.ts"

export interface MediaGalleryProps {
}

type MediaGallery =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& CollectionPageProps
	& MediaGalleryProps

export default MediaGallery
