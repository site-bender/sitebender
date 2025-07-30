import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { VisualArtworkProps } from "../index.ts"

export interface CoverArtProps {
	"@type"?: "CoverArt"}

type CoverArt = Thing & CreativeWorkProps & VisualArtworkProps & CoverArtProps

export default CoverArt
