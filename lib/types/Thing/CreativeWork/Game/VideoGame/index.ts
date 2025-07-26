import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { SoftwareApplicationProps } from "../../SoftwareApplication/index.ts"
import type { GameProps } from "../index.ts"
import type CreativeWork from "../../index.ts"
import type GamePlayMode from "../../../Intangible/Enumeration/GamePlayMode/index.ts"
import type GameServer from "../../../Intangible/GameServer/index.ts"
import type MusicGroup from "../../../Organization/PerformingGroup/MusicGroup/index.ts"
import type PerformingGroup from "../../../Organization/PerformingGroup/index.ts"
import type Person from "../../../Person/index.ts"
import type VideoObject from "../../MediaObject/VideoObject/index.ts"

export interface VideoGameProps {
	actor?: PerformingGroup | Person
	actors?: Person
	cheatCode?: CreativeWork
	director?: Person
	directors?: Person
	gameEdition?: Text
	gamePlatform?: Text | Thing | URL
	gameServer?: GameServer
	gameTip?: CreativeWork
	musicBy?: MusicGroup | Person
	playMode?: GamePlayMode
	trailer?: VideoObject
}

type VideoGame =
	& Thing
	& CreativeWorkProps
	& SoftwareApplicationProps
	& GameProps
	& VideoGameProps

export default VideoGame
