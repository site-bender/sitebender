import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type GamePlayMode from "../../../Intangible/Enumeration/GamePlayMode/index.ts"
import type GameServer from "../../../Intangible/GameServer/index.ts"
import type PerformingGroup from "../../../Organization/PerformingGroup/index.ts"
import type MusicGroup from "../../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Person from "../../../Person/index.ts"
import type CreativeWork from "../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type VideoObject from "../../MediaObject/VideoObject/index.ts"
import type { SoftwareApplicationProps } from "../../SoftwareApplication/index.ts"
import type { GameProps } from "../index.ts"

import CreativeWorkComponent from "../../../../../components/Thing/CreativeWork/index.ts"
import VideoObjectComponent from "../../../../../components/Thing/CreativeWork/MediaObject/VideoObject/index.ts"
import ThingComponent from "../../../../../components/Thing/index.ts"
import GamePlayModeComponent from "../../../../../components/Thing/Intangible/Enumeration/GamePlayMode/index.ts"
import GameServerComponent from "../../../../../components/Thing/Intangible/GameServer/index.ts"
import PerformingGroupComponent from "../../../../../components/Thing/Organization/PerformingGroup/index.ts"
import MusicGroupComponent from "../../../../../components/Thing/Organization/PerformingGroup/MusicGroup/index.ts"
import PersonComponent from "../../../../../components/Thing/Person/index.ts"

export interface VideoGameProps {
	actor?:
		| PerformingGroup
		| Person
		| ReturnType<typeof PerformingGroupComponent>
		| ReturnType<typeof PersonComponent>
	actors?: Person | ReturnType<typeof PersonComponent>
	cheatCode?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
	director?: Person | ReturnType<typeof PersonComponent>
	directors?: Person | ReturnType<typeof PersonComponent>
	gameEdition?: Text
	gamePlatform?: Text | Thing | URL | ReturnType<typeof ThingComponent>
	gameServer?: GameServer | ReturnType<typeof GameServerComponent>
	gameTip?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
	musicBy?:
		| MusicGroup
		| Person
		| ReturnType<typeof MusicGroupComponent>
		| ReturnType<typeof PersonComponent>
	playMode?: GamePlayMode | ReturnType<typeof GamePlayModeComponent>
	trailer?: VideoObject | ReturnType<typeof VideoObjectComponent>
}

type VideoGame =
	& Thing
	& CreativeWorkProps
	& SoftwareApplicationProps
	& GameProps
	& VideoGameProps

export default VideoGame
