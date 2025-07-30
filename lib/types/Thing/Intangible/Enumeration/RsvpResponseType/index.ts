import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface RsvpResponseTypeProps {
	"@type"?: "RsvpResponseType"}

type RsvpResponseType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& RsvpResponseTypeProps

export default RsvpResponseType
