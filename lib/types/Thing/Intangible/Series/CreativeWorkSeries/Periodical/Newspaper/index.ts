// Newspaper extends Periodical but adds no additional properties
import type Thing from "../../../../../index.ts"
import type { IntangibleProps } from "../../../../index.ts"
import type { SeriesProps } from "../../../index.ts"
import type { CreativeWorkSeriesProps } from "../../index.ts"
import type { PeriodicalProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface NewspaperProps {}

type Newspaper =
	& Thing
	& CreativeWorkSeriesProps
	& IntangibleProps
	& PeriodicalProps
	& SeriesProps
	& NewspaperProps

export default Newspaper
