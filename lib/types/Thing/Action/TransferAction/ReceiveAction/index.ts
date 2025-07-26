import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"
import type Audience from "../../../Intangible/Audience/index.ts"
import type DeliveryMethod from "../../../Intangible/Enumeration/DeliveryMethod/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"

export interface ReceiveActionProps {
	deliveryMethod?: DeliveryMethod
	sender?: Audience | Organization | Person
}

type ReceiveAction =
	& Thing
	& ActionProps
	& TransferActionProps
	& ReceiveActionProps

export default ReceiveAction
