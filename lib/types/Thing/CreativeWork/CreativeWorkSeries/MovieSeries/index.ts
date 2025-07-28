import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../../Intangible/index.ts"
import type { SeriesProps } from "../../../Intangible/Series/index.ts"
import type Organization from "../../../Organization/index.ts"
import type PerformingGroup from "../../../Organization/PerformingGroup/index.ts"
import type MusicGroup from "../../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Person from "../../../Person/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type VideoObject from "../../MediaObject/VideoObject/index.ts"
import type { CreativeWorkSeriesProps } from "../index.ts"

import VideoObjectComponent from "../../../../../components/Thing/CreativeWork/MediaObject/VideoObject/index.ts"
import OrganizationComponent from "../../../../../components/Thing/Organization/index.ts"
import PerformingGroupComponent from "../../../../../components/Thing/Organization/PerformingGroup/index.ts"
import MusicGroupComponent from "../../../../../components/Thing/Organization/PerformingGroup/MusicGroup/index.ts"
import PersonComponent from "../../../../../components/Thing/Person/index.ts"

export interface MovieSeriesProps {
	actor?:
		| PerformingGroup
		| Person
		| ReturnType<typeof PerformingGroupComponent>
		| ReturnType<typeof PersonComponent>
	actors?: Person | ReturnType<typeof PersonComponent>
	director?: Person | ReturnType<typeof PersonComponent>
	directors?: Person | ReturnType<typeof PersonComponent>
	musicBy?:
		| MusicGroup
		| Person
		| ReturnType<typeof MusicGroupComponent>
		| ReturnType<typeof PersonComponent>
	productionCompany?: Organization | ReturnType<typeof OrganizationComponent>
	trailer?: VideoObject | ReturnType<typeof VideoObjectComponent>
}

type MovieSeries =
	& Thing
	& IntangibleProps
	& SeriesProps
	& CreativeWorkSeriesProps
	& CreativeWorkProps
	& MovieSeriesProps

export default MovieSeries
