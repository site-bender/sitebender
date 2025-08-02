import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"
import type { MediaGalleryType } from "./MediaGallery/index.ts"

export type CollectionPageType = "CollectionPage" | MediaGalleryType

export interface CollectionPageProps {
	"@type"?: CollectionPageType
}

type CollectionPage =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& CollectionPageProps

export default CollectionPage
