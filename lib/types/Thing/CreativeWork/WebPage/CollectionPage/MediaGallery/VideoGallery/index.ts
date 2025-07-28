import type Thing from "../../../../../index.ts"
import type { CreativeWorkProps } from "../../../../index.ts"
import type { WebPageProps } from "../../../index.ts"
import type { CollectionPageProps } from "../../index.ts"
import type { MediaGalleryProps } from "../index.ts"

import VideoGalleryComponent from "../../../../../../../../components/Thing/CreativeWork/WebPage/CollectionPage/MediaGallery/VideoGallery/index.tsx"

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
