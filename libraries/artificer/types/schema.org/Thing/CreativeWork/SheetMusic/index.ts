import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type SheetMusicType = "SheetMusic"

export interface SheetMusicProps {
	"@type"?: SheetMusicType
}

type SheetMusic = Thing & CreativeWorkProps & SheetMusicProps

export default SheetMusic
