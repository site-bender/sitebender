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

import { MusicGroup as MusicGroupComponent } from "../../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../../components/index.tsx"
import { PerformingGroup as PerformingGroupComponent } from "../../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../../components/index.tsx"
import { VideoObject as VideoObjectComponent } from "../../../../../../components/index.tsx"

export type MovieSeriesType = "MovieSeries"

export interface MovieSeriesProps {
	"@type"?: MovieSeriesType
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
