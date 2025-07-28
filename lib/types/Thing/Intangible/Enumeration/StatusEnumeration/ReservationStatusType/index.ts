import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { StatusEnumerationProps } from "../index.ts"

import ReservationStatusTypeComponent from "../../../../../../../components/Thing/Intangible/Enumeration/StatusEnumeration/ReservationStatusType/index.tsx"

export interface ReservationStatusTypeProps {
}

type ReservationStatusType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps
	& ReservationStatusTypeProps

export default ReservationStatusType
