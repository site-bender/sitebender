import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type { CreativeWorkSeriesType } from "./CreativeWorkSeries/index.ts"
import type { EventSeriesType } from "./EventSeries/index.ts"

export type SeriesType = "Series" | EventSeriesType | CreativeWorkSeriesType

export interface SeriesProps {
	"@type"?: SeriesType
}

type Series = Thing & IntangibleProps & SeriesProps

export default Series
