import type { Integer, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../../Intangible/index.ts"
import type { SeriesProps } from "../../../Intangible/Series/index.ts"
import type { CreativeWorkSeriesProps } from "../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type CreativeWork from "../../index.ts"
import type CreativeWorkSeason from "../../CreativeWorkSeason/index.ts"
import type Episode from "../../Episode/index.ts"
import type GamePlayMode from "../../../Intangible/Enumeration/GamePlayMode/index.ts"
import type MusicGroup from "../../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Organization from "../../../Organization/index.ts"
import type PerformingGroup from "../../../Organization/PerformingGroup/index.ts"
import type Person from "../../../Person/index.ts"
import type Place from "../../../Place/index.ts"
import type PostalAddress from "../../../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type VideoObject from "../../MediaObject/VideoObject/index.ts"

export interface VideoGameSeriesProps {
	actor?: PerformingGroup | Person
	actors?: Person
	characterAttribute?: Thing
	cheatCode?: CreativeWork
	containsSeason?: CreativeWorkSeason
	director?: Person
	directors?: Person
	episode?: Episode
	episodes?: Episode
	gameItem?: Thing
	gameLocation?: Place | PostalAddress | URL
	gamePlatform?: Text | Thing | URL
	musicBy?: MusicGroup | Person
	numberOfEpisodes?: Integer
	numberOfPlayers?: QuantitativeValue
	numberOfSeasons?: Integer
	playMode?: GamePlayMode
	productionCompany?: Organization
	quest?: Thing
	season?: CreativeWorkSeason | URL
	seasons?: CreativeWorkSeason
	trailer?: VideoObject
}

type VideoGameSeries =
	& Thing
	& IntangibleProps
	& SeriesProps
	& CreativeWorkSeriesProps
	& CreativeWorkProps
	& VideoGameSeriesProps

export default VideoGameSeries
