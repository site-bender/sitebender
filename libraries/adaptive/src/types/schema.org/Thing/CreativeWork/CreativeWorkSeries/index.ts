import type { Date, DateTime, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../../Intangible/index.ts"
import type { SeriesProps } from "../../Intangible/Series/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { BookSeriesType } from "./BookSeries/index.ts"
import type { MovieSeriesType } from "./MovieSeries/index.ts"
import type { PeriodicalType } from "./Periodical/index.ts"
import type { PodcastSeriesType } from "./PodcastSeries/index.ts"
import type { RadioSeriesType } from "./RadioSeries/index.ts"
import type { TVSeriesType } from "./TVSeries/index.ts"
import type { VideoGameSeriesType } from "./VideoGameSeries/index.ts"

export type CreativeWorkSeriesType =
	| "CreativeWorkSeries"
	| TVSeriesType
	| VideoGameSeriesType
	| PodcastSeriesType
	| MovieSeriesType
	| PeriodicalType
	| RadioSeriesType
	| BookSeriesType

export interface CreativeWorkSeriesProps {
	"@type"?: CreativeWorkSeriesType
	endDate?: Date | DateTime
	issn?: Text
	startDate?: Date | DateTime
}

type CreativeWorkSeries =
	& Thing
	& IntangibleProps
	& SeriesProps
	& CreativeWorkProps
	& CreativeWorkSeriesProps

export default CreativeWorkSeries
