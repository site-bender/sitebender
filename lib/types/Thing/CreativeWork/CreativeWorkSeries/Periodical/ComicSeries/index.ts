import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../../Intangible/index.ts"
import type { SeriesProps } from "../../../../Intangible/Series/index.ts"
import type { CreativeWorkSeriesProps } from "../../index.ts"
import type { PeriodicalProps } from "../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"

import ComicSeriesComponent from "../../../../../../../components/Thing/CreativeWork/CreativeWorkSeries/Periodical/ComicSeries/index.tsx"

export interface ComicSeriesProps {
}

type ComicSeries =
	& Thing
	& IntangibleProps
	& SeriesProps
	& CreativeWorkSeriesProps
	& PeriodicalProps
	& CreativeWorkProps
	& ComicSeriesProps

export default ComicSeries
