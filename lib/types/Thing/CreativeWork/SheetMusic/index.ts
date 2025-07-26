import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface SheetMusicProps {
}

type SheetMusic =
	& Thing
	& CreativeWorkProps
	& SheetMusicProps

export default SheetMusic
