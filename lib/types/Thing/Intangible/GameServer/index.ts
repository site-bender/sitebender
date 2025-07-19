import type { Integer } from "../../../DataType/index.ts"
import type VideoGame from "../../CreativeWork/SoftwareApplication/VideoGame/index.ts"
import type Thing from "../../index.ts"
import type GameServerStatus from "../Enumeration/StatusEnumeration/GameServerStatus/index.ts"
import type { IntangibleProps } from "../index.ts"

export interface GameServerProps {
	/** Video game which is played on this server. */
	game?: VideoGame
	/** Number of players on the server. */
	playersOnline?: Integer
	/** Status of a game server. */
	serverStatus?: GameServerStatus
}

type GameServer =
	& Thing
	& IntangibleProps
	& GameServerProps

export default GameServer
