import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type GameAvailabilityEnumerationType = "GameAvailabilityEnumeration"

export interface GameAvailabilityEnumerationProps {
	"@type"?: GameAvailabilityEnumerationType
}

type GameAvailabilityEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& GameAvailabilityEnumerationProps

export default GameAvailabilityEnumeration
