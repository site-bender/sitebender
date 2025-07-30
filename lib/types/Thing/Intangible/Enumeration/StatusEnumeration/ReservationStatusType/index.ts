import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { StatusEnumerationProps } from "../index.ts"

export interface ReservationStatusTypeProps {
	"@type"?: "ReservationStatusType"}

type ReservationStatusType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps
	& ReservationStatusTypeProps

export default ReservationStatusType
