import type Thing from "../../../index.ts"
import type TVSeries from "../../../Intangible/Series/CreativeWorkSeries/TVSeries/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ClipProps } from "../index.ts"

export interface TVClipProps {
	/** The TV series to which this episode or season belongs. */
	partOfTVSeries?: TVSeries
}

type TVClip =
	& Thing
	& ClipProps
	& CreativeWorkProps
	& TVClipProps

export default TVClip
