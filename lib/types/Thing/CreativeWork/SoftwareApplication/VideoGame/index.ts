import { Text, URL } from "../../../../DataType/index.ts"
import Thing from "../../../../index.ts"
import GamePlayMode from "../../../Intangible/Enumeration/GamePlayMode/index.ts"
import GameServer from "../../../Intangible/GameServer/index.ts"
import PerformingGroup from "../../../Organization/PerformingGroup/index.ts"
import MusicGroup from "../../../Organization/PerformingGroup/MusicGroup/index.ts"
import Person from "../../../Person/index.ts"
import CreativeWork from "../..//index.ts"
import VideoObject from "../../MediaObject/VideoObject/index.ts"
import SoftwareApplication from "../index.ts"

export default interface VideoGame extends SoftwareApplication {
	/** An actor (individual or a group), e.g. in TV, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
	actor?: PerformingGroup | Person
	/** An actor, e.g. in TV, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip. */
	actors?: Person
	/** Cheat codes to the game. */
	cheatCode?: CreativeWork
	/** A director of e.g. TV, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
	director?: Person
	/** A director of e.g. TV, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip. */
	directors?: Person
	/** The edition of a video game. */
	gameEdition?: Text
	/** The electronic systems used to play <a href="http://en.wikipedia.org/wiki/Category:Video_game_platforms">video games</a>. */
	gamePlatform?: URL | Thing | Text
	/** The server on which  it is possible to play the game. */
	gameServer?: GameServer
	/** Links to tips, tactics, etc. */
	gameTip?: CreativeWork
	/** The composer of the soundtrack. */
	musicBy?: MusicGroup | Person
	/** Indicates whether this game is multi-player, co-op or single-player.  The game can be marked as multi-player, co-op and single-player at the same time. */
	playMode?: GamePlayMode
	/** The trailer of a movie or TV/radio series, season, episode, etc. */
	trailer?: VideoObject
}
