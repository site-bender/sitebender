import type { Integer } from "../../../DataType/index.ts"
import type VideoGame from "../../CreativeWork/Game/VideoGame/index.ts"
import type Thing from "../../index.ts"
import type GameServerStatus from "../Enumeration/StatusEnumeration/GameServerStatus/index.ts"
import type { IntangibleProps } from "../index.ts"

import { VideoGame as VideoGameComponent } from "../../../../../components/index.tsx"
import { GameServerStatus as GameServerStatusComponent } from "../../../../../components/index.tsx"

export type GameServerType = "GameServer"

export interface GameServerProps {
	"@type"?: GameServerType
	game?: VideoGame | ReturnType<typeof VideoGameComponent>
	playersOnline?: Integer
	serverStatus?: GameServerStatus | ReturnType<typeof GameServerStatusComponent>
}

type GameServer = Thing & IntangibleProps & GameServerProps

export default GameServer
