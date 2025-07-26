import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface GameAvailabilityEnumerationProps {
}

type GameAvailabilityEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& GameAvailabilityEnumerationProps

export default GameAvailabilityEnumeration
