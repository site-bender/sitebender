import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../../Intangible/index.ts"
import type { SeriesProps } from "../../../Intangible/Series/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { CreativeWorkSeriesProps } from "../index.ts"

export type BookSeriesType = "BookSeries"

export interface BookSeriesProps {
	"@type"?: BookSeriesType
}

type BookSeries =
	& Thing
	& IntangibleProps
	& SeriesProps
	& CreativeWorkSeriesProps
	& CreativeWorkProps
	& BookSeriesProps

export default BookSeries
