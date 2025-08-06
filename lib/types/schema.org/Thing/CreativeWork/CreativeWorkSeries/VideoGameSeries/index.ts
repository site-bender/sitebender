import type { Integer, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type GamePlayMode from "../../../Intangible/Enumeration/GamePlayMode/index.ts"
import type { IntangibleProps } from "../../../Intangible/index.ts"
import type { SeriesProps } from "../../../Intangible/Series/index.ts"
import type PostalAddress from "../../../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Organization from "../../../Organization/index.ts"
import type PerformingGroup from "../../../Organization/PerformingGroup/index.ts"
import type MusicGroup from "../../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Person from "../../../Person/index.ts"
import type Place from "../../../Place/index.ts"
import type CreativeWorkSeason from "../../CreativeWorkSeason/index.ts"
import type Episode from "../../Episode/index.ts"
import type CreativeWork from "../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type VideoObject from "../../MediaObject/VideoObject/index.ts"
import type { CreativeWorkSeriesProps } from "../index.ts"

import { CreativeWorkSeason as CreativeWorkSeasonComponent } from "../../../../../../components/index.tsx"
import { Episode as EpisodeComponent } from "../../../../../../components/index.tsx"
import { CreativeWork as CreativeWorkComponent } from "../../../../../../components/index.tsx"
import { VideoObject as VideoObjectComponent } from "../../../../../../components/index.tsx"
import { Thing as ThingComponent } from "../../../../../../components/index.tsx"
import { GamePlayMode as GamePlayModeComponent } from "../../../../../../components/index.tsx"
import { PostalAddress as PostalAddressComponent } from "../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../../components/index.tsx"
import { PerformingGroup as PerformingGroupComponent } from "../../../../../../components/index.tsx"
import { MusicGroup as MusicGroupComponent } from "../../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../../components/index.tsx"
import { Place as PlaceComponent } from "../../../../../../components/index.tsx"

export type VideoGameSeriesType = "VideoGameSeries"

export interface VideoGameSeriesProps {
	"@type"?: VideoGameSeriesType
	actor?:
		| PerformingGroup
		| Person
		| ReturnType<typeof PerformingGroupComponent>
		| ReturnType<typeof PersonComponent>
	actors?: Person | ReturnType<typeof PersonComponent>
	characterAttribute?: Thing | ReturnType<typeof ThingComponent>
	cheatCode?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
	containsSeason?:
		| CreativeWorkSeason
		| ReturnType<typeof CreativeWorkSeasonComponent>
	director?: Person | ReturnType<typeof PersonComponent>
	directors?: Person | ReturnType<typeof PersonComponent>
	episode?: Episode | ReturnType<typeof EpisodeComponent>
	episodes?: Episode | ReturnType<typeof EpisodeComponent>
	gameItem?: Thing | ReturnType<typeof ThingComponent>
	gameLocation?:
		| Place
		| PostalAddress
		| URL
		| ReturnType<typeof PlaceComponent>
		| ReturnType<typeof PostalAddressComponent>
	gamePlatform?: Text | Thing | URL | ReturnType<typeof ThingComponent>
	musicBy?:
		| MusicGroup
		| Person
		| ReturnType<typeof MusicGroupComponent>
		| ReturnType<typeof PersonComponent>
	numberOfEpisodes?: Integer
	numberOfPlayers?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	numberOfSeasons?: Integer
	playMode?: GamePlayMode | ReturnType<typeof GamePlayModeComponent>
	productionCompany?: Organization | ReturnType<typeof OrganizationComponent>
	quest?: Thing | ReturnType<typeof ThingComponent>
	season?:
		| CreativeWorkSeason
		| URL
		| ReturnType<typeof CreativeWorkSeasonComponent>
	seasons?: CreativeWorkSeason | ReturnType<typeof CreativeWorkSeasonComponent>
	trailer?: VideoObject | ReturnType<typeof VideoObjectComponent>
}

type VideoGameSeries =
	& Thing
	& IntangibleProps
	& SeriesProps
	& CreativeWorkSeriesProps
	& CreativeWorkProps
	& VideoGameSeriesProps

export default VideoGameSeries
