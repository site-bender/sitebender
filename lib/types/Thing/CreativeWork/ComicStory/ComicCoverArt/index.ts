import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { VisualArtworkProps } from "../../VisualArtwork/index.ts"
import type { CoverArtProps } from "../../VisualArtwork/CoverArt/index.ts"
import type { ComicStoryProps } from "../index.ts"

import ComicCoverArtComponent from "../../../../../../components/Thing/CreativeWork/ComicStory/ComicCoverArt/index.tsx"

export interface ComicCoverArtProps {
}

type ComicCoverArt =
	& Thing
	& CreativeWorkProps
	& VisualArtworkProps
	& CoverArtProps
	& ComicStoryProps
	& ComicCoverArtProps

export default ComicCoverArt
