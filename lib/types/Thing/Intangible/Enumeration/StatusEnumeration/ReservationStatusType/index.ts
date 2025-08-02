import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { StatusEnumerationProps } from "../index.ts"

export type ReservationStatusTypeType = "ReservationStatusType"

export interface ReservationStatusTypeProps {
	"@type"?: ReservationStatusTypeType
}

type ReservationStatusType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps
	& ReservationStatusTypeProps

export default ReservationStatusType
