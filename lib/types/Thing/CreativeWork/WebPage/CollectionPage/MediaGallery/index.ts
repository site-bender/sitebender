// MediaGallery extends CollectionPage but adds no additional properties
import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { WebPageProps } from "../../index.ts"
import type { CollectionPageProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface MediaGalleryProps {}

type MediaGallery =
	& Thing
	& CollectionPageProps
	& CreativeWorkProps
	& WebPageProps
	& MediaGalleryProps

export default MediaGallery
