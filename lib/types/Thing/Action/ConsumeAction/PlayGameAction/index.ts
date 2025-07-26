import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"
import type GameAvailabilityEnumeration from "../../../Intangible/Enumeration/GameAvailabilityEnumeration/index.ts"

export interface PlayGameActionProps {
	gameAvailabilityType?: GameAvailabilityEnumeration | Text
}

type PlayGameAction =
	& Thing
	& ActionProps
	& ConsumeActionProps
	& PlayGameActionProps

export default PlayGameAction
