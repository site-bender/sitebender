import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ClipProps } from "../index.ts"

import MovieClipComponent from "../../../../../../components/Thing/CreativeWork/Clip/MovieClip/index.tsx"

export interface MovieClipProps {
}

type MovieClip =
	& Thing
	& CreativeWorkProps
	& ClipProps
	& MovieClipProps

export default MovieClip
