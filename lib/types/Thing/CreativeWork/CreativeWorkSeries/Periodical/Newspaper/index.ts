import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../../Intangible/index.ts"
import type { SeriesProps } from "../../../../Intangible/Series/index.ts"
import type { CreativeWorkSeriesProps } from "../../index.ts"
import type { PeriodicalProps } from "../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"

import NewspaperComponent from "../../../../../../../components/Thing/CreativeWork/CreativeWorkSeries/Periodical/Newspaper/index.tsx"

export interface NewspaperProps {
}

type Newspaper =
	& Thing
	& IntangibleProps
	& SeriesProps
	& CreativeWorkSeriesProps
	& PeriodicalProps
	& CreativeWorkProps
	& NewspaperProps

export default Newspaper
