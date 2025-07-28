import type { Date, DateTime, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../../Intangible/index.ts"
import type { SeriesProps } from "../../Intangible/Series/index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface CreativeWorkSeriesProps {
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
