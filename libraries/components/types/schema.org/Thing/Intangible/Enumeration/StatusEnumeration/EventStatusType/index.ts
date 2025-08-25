import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { StatusEnumerationProps } from "../index.ts"

export type EventStatusTypeType = "EventStatusType"

export interface EventStatusTypeProps {
	"@type"?: EventStatusTypeType
}

type EventStatusType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps
	& EventStatusTypeProps

export default EventStatusType
