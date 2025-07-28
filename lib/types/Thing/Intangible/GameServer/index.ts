import type { Integer } from "../../../DataType/index.ts"
import type VideoGame from "../../CreativeWork/Game/VideoGame/index.ts"
import type Thing from "../../index.ts"
import type GameServerStatus from "../Enumeration/StatusEnumeration/GameServerStatus/index.ts"
import type { IntangibleProps } from "../index.ts"

import VideoGameComponent from "../../../../components/Thing/CreativeWork/Game/VideoGame/index.ts"
import GameServerStatusComponent from "../../../../components/Thing/Intangible/Enumeration/StatusEnumeration/GameServerStatus/index.ts"

export interface GameServerProps {
	game?: VideoGame | ReturnType<typeof VideoGameComponent>
	playersOnline?: Integer
	serverStatus?: GameServerStatus | ReturnType<typeof GameServerStatusComponent>
}

type GameServer = Thing & IntangibleProps & GameServerProps

export default GameServer
