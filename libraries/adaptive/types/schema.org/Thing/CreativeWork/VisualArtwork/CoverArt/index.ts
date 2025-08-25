import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { VisualArtworkProps } from "../index.ts"
import type { ComicCoverArtType } from "./ComicCoverArt/index.ts"

export type CoverArtType = "CoverArt" | ComicCoverArtType

export interface CoverArtProps {
	"@type"?: CoverArtType
}

type CoverArt = Thing & CreativeWorkProps & VisualArtworkProps & CoverArtProps

export default CoverArt
