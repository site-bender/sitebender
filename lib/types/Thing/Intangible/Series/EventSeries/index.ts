import type { EventProps } from "../../../Event/index.ts"
// EventSeries extends Series but adds no additional properties
import type Thing from "../../../index.ts"

// deno-lint-ignore no-empty-interface
export interface EventSeriesProps {}

type EventSeries =
	& Thing
	& EventProps
	& EventSeriesProps

export default EventSeries
