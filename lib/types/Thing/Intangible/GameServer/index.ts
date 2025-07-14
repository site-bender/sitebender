import { Integer } from "../../../DataType/index.ts"
import VideoGame from "../../CreativeWork/SoftwareApplication/VideoGame/index.ts"
import GameServerStatus from "../Enumeration/StatusEnumeration/GameServerStatus/index.ts"
import Intangible from "../index.ts"

export default interface GameServer extends Intangible {
	/** Video game which is played on this server. */
	game?: VideoGame
	/** Number of players on the server. */
	playersOnline?: Integer
	/** Status of a game server. */
	serverStatus?: GameServerStatus
}
