import type { Integer } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type GameServerStatus from "../Enumeration/StatusEnumeration/GameServerStatus/index.ts"
import type VideoGame from "../../CreativeWork/Game/VideoGame/index.ts"

import GameServerComponent from "../../../../../components/Thing/Intangible/GameServer/index.tsx"

export interface GameServerProps {
	game?: VideoGame
	playersOnline?: Integer
	serverStatus?: GameServerStatus
}

type GameServer =
	& Thing
	& IntangibleProps
	& GameServerProps

export default GameServer
