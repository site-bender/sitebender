import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../../Intangible/index.ts"
import type { SeriesProps } from "../../../Intangible/Series/index.ts"
import type { CreativeWorkSeriesProps } from "../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type MusicGroup from "../../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Organization from "../../../Organization/index.ts"
import type PerformingGroup from "../../../Organization/PerformingGroup/index.ts"
import type Person from "../../../Person/index.ts"
import type VideoObject from "../../MediaObject/VideoObject/index.ts"

export interface MovieSeriesProps {
	actor?: PerformingGroup | Person
	actors?: Person
	director?: Person
	directors?: Person
	musicBy?: MusicGroup | Person
	productionCompany?: Organization
	trailer?: VideoObject
}

type MovieSeries =
	& Thing
	& IntangibleProps
	& SeriesProps
	& CreativeWorkSeriesProps
	& CreativeWorkProps
	& MovieSeriesProps

export default MovieSeries
