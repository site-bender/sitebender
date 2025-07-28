import type Thing from "../../index.ts"
import type { IntangibleProps } from "../../Intangible/index.ts"
import type { SeriesProps } from "../../Intangible/Series/index.ts"
import type { EventProps } from "../index.ts"

export interface EventSeriesProps {}

type EventSeries =
	& Thing
	& IntangibleProps
	& SeriesProps
	& EventProps
	& EventSeriesProps

export default EventSeries
