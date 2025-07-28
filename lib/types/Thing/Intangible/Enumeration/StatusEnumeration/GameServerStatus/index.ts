import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { StatusEnumerationProps } from "../index.ts"

import GameServerStatusComponent from "../../../../../../../components/Thing/Intangible/Enumeration/StatusEnumeration/GameServerStatus/index.tsx"

export interface GameServerStatusProps {
}

type GameServerStatus =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps
	& GameServerStatusProps

export default GameServerStatus
