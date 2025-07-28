import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../../Intangible/index.ts"
import type { SeriesProps } from "../../../Intangible/Series/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { CreativeWorkSeriesProps } from "../index.ts"

export interface PeriodicalProps {}

type Periodical =
	& Thing
	& IntangibleProps
	& SeriesProps
	& CreativeWorkSeriesProps
	& CreativeWorkProps
	& PeriodicalProps

export default Periodical
