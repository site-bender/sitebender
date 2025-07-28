import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import SheetMusicComponent from "../../../../../components/Thing/CreativeWork/SheetMusic/index.tsx"

export interface SheetMusicProps {
}

type SheetMusic =
	& Thing
	& CreativeWorkProps
	& SheetMusicProps

export default SheetMusic
