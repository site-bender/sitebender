import type Thing from "../../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../index.ts"

export interface MusicVideoObjectProps {}

type MusicVideoObject =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& MusicVideoObjectProps

export default MusicVideoObject
