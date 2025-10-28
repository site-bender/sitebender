import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type GameAvailabilityEnumeration from "../../../Intangible/Enumeration/GameAvailabilityEnumeration/index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

import GameAvailabilityEnumerationComponent from "../../../../../../../architect/src/define/Thing/Intangible/Enumeration/GameAvailabilityEnumeration/index.tsx"

export type PlayGameActionType = "PlayGameAction"

export interface PlayGameActionProps {
	"@type"?: PlayGameActionType
	gameAvailabilityType?:
		| GameAvailabilityEnumeration
		| Text
		| ReturnType<typeof GameAvailabilityEnumerationComponent>
}

type PlayGameAction =
	& Thing
	& ActionProps
	& ConsumeActionProps
	& PlayGameActionProps

export default PlayGameAction
