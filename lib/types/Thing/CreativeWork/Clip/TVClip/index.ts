import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type TVSeries from "../../TVSeries/index.ts"
import type { ClipProps } from "../index.ts"

import TVSeriesComponent from "../../../../../components/Thing/CreativeWork/TVSeries/index.ts"

export type TVClipType = "TVClip"

export interface TVClipProps {
	"@type"?: TVClipType
	partOfTVSeries?: TVSeries | ReturnType<typeof TVSeriesComponent>
}

type TVClip = Thing & CreativeWorkProps & ClipProps & TVClipProps

export default TVClip
