import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type GameAvailabilityEnumeration from "../../../Intangible/Enumeration/GameAvailabilityEnumeration/index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

export interface PlayGameActionProps {
	/** Indicates the availability type of the game content associated with this action, such as whether it is a full version or a demo. */
	gameAvailabilityType?: Text | GameAvailabilityEnumeration
}

type PlayGameAction =
	& Thing
	& ActionProps
	& ConsumeActionProps
	& PlayGameActionProps

export default PlayGameAction
