import { Text } from "../../../../DataType/index.ts"
import GameAvailabilityEnumeration from "../../../Intangible/Enumeration/GameAvailabilityEnumeration/index.ts"
import ConsumeAction from "../index.ts"

export default interface PlayGameAction extends ConsumeAction {
	/** Indicates the availability type of the game content associated with this action, such as whether it is a full version or a demo. */
	gameAvailabilityType?: Text | GameAvailabilityEnumeration
}
