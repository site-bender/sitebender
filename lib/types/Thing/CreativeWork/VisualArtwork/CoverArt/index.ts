import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { VisualArtworkProps } from "../index.ts"

import CoverArtComponent from "../../../../../../components/Thing/CreativeWork/VisualArtwork/CoverArt/index.tsx"

export interface CoverArtProps {
}

type CoverArt =
	& Thing
	& CreativeWorkProps
	& VisualArtworkProps
	& CoverArtProps

export default CoverArt
