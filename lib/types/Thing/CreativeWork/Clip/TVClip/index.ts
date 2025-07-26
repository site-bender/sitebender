import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ClipProps } from "../index.ts"
import type TVSeries from "../../TVSeries/index.ts"

export interface TVClipProps {
	partOfTVSeries?: TVSeries
}

type TVClip =
	& Thing
	& CreativeWorkProps
	& ClipProps
	& TVClipProps

export default TVClip
