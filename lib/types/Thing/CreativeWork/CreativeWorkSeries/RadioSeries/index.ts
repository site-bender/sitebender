import type { Integer, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../../Intangible/index.ts"
import type { SeriesProps } from "../../../Intangible/Series/index.ts"
import type Organization from "../../../Organization/index.ts"
import type PerformingGroup from "../../../Organization/PerformingGroup/index.ts"
import type MusicGroup from "../../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Person from "../../../Person/index.ts"
import type CreativeWorkSeason from "../../CreativeWorkSeason/index.ts"
import type Episode from "../../Episode/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type VideoObject from "../../MediaObject/VideoObject/index.ts"
import type { CreativeWorkSeriesProps } from "../index.ts"

import CreativeWorkSeasonComponent from "../../../../../components/Thing/CreativeWork/CreativeWorkSeason/index.ts"
import EpisodeComponent from "../../../../../components/Thing/CreativeWork/Episode/index.ts"
import VideoObjectComponent from "../../../../../components/Thing/CreativeWork/MediaObject/VideoObject/index.ts"
import OrganizationComponent from "../../../../../components/Thing/Organization/index.ts"
import PerformingGroupComponent from "../../../../../components/Thing/Organization/PerformingGroup/index.ts"
import MusicGroupComponent from "../../../../../components/Thing/Organization/PerformingGroup/MusicGroup/index.ts"
import PersonComponent from "../../../../../components/Thing/Person/index.ts"

export interface RadioSeriesProps {
	actor?:
		| PerformingGroup
		| Person
		| ReturnType<typeof PerformingGroupComponent>
		| ReturnType<typeof PersonComponent>
	actors?: Person | ReturnType<typeof PersonComponent>
	containsSeason?:
		| CreativeWorkSeason
		| ReturnType<typeof CreativeWorkSeasonComponent>
	director?: Person | ReturnType<typeof PersonComponent>
	directors?: Person | ReturnType<typeof PersonComponent>
	episode?: Episode | ReturnType<typeof EpisodeComponent>
	episodes?: Episode | ReturnType<typeof EpisodeComponent>
	musicBy?:
		| MusicGroup
		| Person
		| ReturnType<typeof MusicGroupComponent>
		| ReturnType<typeof PersonComponent>
	numberOfEpisodes?: Integer
	numberOfSeasons?: Integer
	productionCompany?: Organization | ReturnType<typeof OrganizationComponent>
	season?:
		| CreativeWorkSeason
		| URL
		| ReturnType<typeof CreativeWorkSeasonComponent>
	seasons?: CreativeWorkSeason | ReturnType<typeof CreativeWorkSeasonComponent>
	trailer?: VideoObject | ReturnType<typeof VideoObjectComponent>
}

type RadioSeries =
	& Thing
	& IntangibleProps
	& SeriesProps
	& CreativeWorkSeriesProps
	& CreativeWorkProps
	& RadioSeriesProps

export default RadioSeries
