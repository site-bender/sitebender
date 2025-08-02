import type Thing from "../../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../index.ts"

export type MusicVideoObjectType = "MusicVideoObject"

export interface MusicVideoObjectProps {
	"@type"?: MusicVideoObjectType
}

type MusicVideoObject =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& MusicVideoObjectProps

export default MusicVideoObject
