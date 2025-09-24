import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { StatusEnumerationProps } from "../index.ts"

export type GameServerStatusType = "GameServerStatus"

export interface GameServerStatusProps {
	"@type"?: GameServerStatusType
}

type GameServerStatus =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps
	& GameServerStatusProps

export default GameServerStatus
