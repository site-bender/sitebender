import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../../Intangible/index.ts"
import type { SeriesProps } from "../../../Intangible/Series/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { CreativeWorkSeriesProps } from "../index.ts"
import type { ComicSeriesType } from "./ComicSeries/index.ts"
import type { NewspaperType } from "./Newspaper/index.ts"

export type PeriodicalType = "Periodical" | ComicSeriesType | NewspaperType

export interface PeriodicalProps {
	"@type"?: PeriodicalType
}

type Periodical =
	& Thing
	& IntangibleProps
	& SeriesProps
	& CreativeWorkSeriesProps
	& CreativeWorkProps
	& PeriodicalProps

export default Periodical
