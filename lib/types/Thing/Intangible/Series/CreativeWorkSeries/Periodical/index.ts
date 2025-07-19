// Periodical extends CreativeWorkSeries but adds no additional properties
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { SeriesProps } from "../../index.ts"
import type { CreativeWorkSeriesProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface PeriodicalProps {}

type Periodical =
	& Thing
	& CreativeWorkSeriesProps
	& IntangibleProps
	& SeriesProps
	& PeriodicalProps

export default Periodical
