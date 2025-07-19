// CoverArt extends VisualArtwork but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { VisualArtworkProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface CoverArtProps {}

type CoverArt =
	& Thing
	& CreativeWorkProps
	& VisualArtworkProps
	& CoverArtProps

export default CoverArt
