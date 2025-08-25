import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type RsvpResponseTypeType = "RsvpResponseType"

export interface RsvpResponseTypeProps {
	"@type"?: RsvpResponseTypeType
}

type RsvpResponseType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& RsvpResponseTypeProps

export default RsvpResponseType
