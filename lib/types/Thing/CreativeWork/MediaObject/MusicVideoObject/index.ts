import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"

import MusicVideoObjectComponent from "../../../../../../components/Thing/CreativeWork/MediaObject/MusicVideoObject/index.tsx"

export interface MusicVideoObjectProps {
}

type MusicVideoObject =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& MusicVideoObjectProps

export default MusicVideoObject
