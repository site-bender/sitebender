import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"
import type { ActionStatusTypeType } from "./ActionStatusType/index.ts"
import type { EventStatusTypeType } from "./EventStatusType/index.ts"
import type { GameServerStatusType } from "./GameServerStatus/index.ts"
import type { LegalForceStatusType } from "./LegalForceStatus/index.ts"
import type { OrderStatusType } from "./OrderStatus/index.ts"
import type { PaymentStatusTypeType } from "./PaymentStatusType/index.ts"
import type { ReservationStatusTypeType } from "./ReservationStatusType/index.ts"

export type StatusEnumerationType =
	| "StatusEnumeration"
	| ActionStatusTypeType
	| LegalForceStatusType
	| GameServerStatusType
	| PaymentStatusTypeType
	| EventStatusTypeType
	| OrderStatusType
	| ReservationStatusTypeType

export interface StatusEnumerationProps {
	"@type"?: StatusEnumerationType
}

type StatusEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps

export default StatusEnumeration
