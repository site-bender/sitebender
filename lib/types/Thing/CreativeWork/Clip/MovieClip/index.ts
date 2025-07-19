// MovieClip extends Clip but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ClipProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface MovieClipProps {}

type MovieClip =
	& Thing
	& ClipProps
	& CreativeWorkProps
	& MovieClipProps

export default MovieClip
