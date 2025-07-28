import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import GameAvailabilityEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/GameAvailabilityEnumeration/index.tsx"

export interface GameAvailabilityEnumerationProps {
}

type GameAvailabilityEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& GameAvailabilityEnumerationProps

export default GameAvailabilityEnumeration
