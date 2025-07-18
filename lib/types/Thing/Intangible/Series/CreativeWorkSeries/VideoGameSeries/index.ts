import type { Integer, Text, URL } from "../../../../../DataType/index.ts"
import type Thing from "../../../../../index.ts"
import type CreativeWorkSeason from "../../../../CreativeWork/CreativeWorkSeason/index.ts"
import type Episode from "../../../../CreativeWork/Episode/index.ts"
import type CreativeWork from "../../../../CreativeWork/index.ts"
import type VideoObject from "../../../../CreativeWork/MediaObject/VideoObject/index.ts"
import type Organization from "../../../../Organization/index.ts"
import type PerformingGroup from "../../../../Organization/PerformingGroup/index.ts"
import type MusicGroup from "../../../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Person from "../../../../Person/index.ts"
import type Place from "../../../../Place/index.ts"
import type GamePlayMode from "../../../Enumeration/GamePlayMode/index.ts"
import type PostalAddress from "../../../StructuredValue/ContactPoint/PostalAddress/index.ts"
import type QuantitativeValue from "../../../StructuredValue/QuantitativeValue/index.ts"
import type CreativeWorkSeries from "../index.ts"

export default interface VideoGameSeries extends CreativeWorkSeries {
	/** An actor (individual or a group), e.g. in TV, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
	actor?: PerformingGroup | Person
	/** An actor, e.g. in TV, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip. */
	actors?: Person
	/** A piece of data that represents a particular aspect of a fictional character (skill, power, character points, advantage, disadvantage). */
	characterAttribute?: Thing
	/** Cheat codes to the game. */
	cheatCode?: CreativeWork
	/** A season that is part of the media series. */
	containsSeason?: CreativeWorkSeason
	/** A director of e.g. TV, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
	director?: Person
	/** A director of e.g. TV, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip. */
	directors?: Person
	/** An episode of a TV, radio or game media within a series or season. */
	episode?: Episode
	/** An episode of a TV/radio series or season. */
	episodes?: Episode
	/** An item is an object within the game world that can be collected by a player or, occasionally, a non-player character. */
	gameItem?: Thing
	/** Real or fictional location of the game (or part of game). */
	gameLocation?: URL | Place | PostalAddress
	/** The electronic systems used to play <a href="http://en.wikipedia.org/wiki/Category:Video_game_platforms">video games</a>. */
	gamePlatform?: URL | Thing | Text
	/** The composer of the soundtrack. */
	musicBy?: MusicGroup | Person
	/** The number of episodes in this season or series. */
	numberOfEpisodes?: Integer
	/** Indicate how many people can play this game (minimum, maximum, or range). */
	numberOfPlayers?: QuantitativeValue
	/** The number of seasons in this series. */
	numberOfSeasons?: Integer
	/** Indicates whether this game is multi-player, co-op or single-player.  The game can be marked as multi-player, co-op and single-player at the same time. */
	playMode?: GamePlayMode
	/** The production company or studio responsible for the item, e.g. series, video game, episode etc. */
	productionCompany?: Organization
	/** The task that a player-controlled character, or group of characters may complete in order to gain a reward. */
	quest?: Thing
	/** A season in a media series. */
	season?: CreativeWorkSeason | URL
	/** A season in a media series. */
	seasons?: CreativeWorkSeason
	/** The trailer of a movie or TV/radio series, season, episode, etc. */
	trailer?: VideoObject
}
