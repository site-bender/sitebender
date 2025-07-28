import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"
import type Audience from "../../../Intangible/Audience/index.ts"
import type ContactPoint from "../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type DeliveryMethod from "../../../Intangible/Enumeration/DeliveryMethod/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"

import SendActionComponent from "../../../../../../components/Thing/Action/TransferAction/SendAction/index.tsx"

export interface SendActionProps {
	deliveryMethod?: DeliveryMethod
	recipient?: Audience | ContactPoint | Organization | Person
}

type SendAction =
	& Thing
	& ActionProps
	& TransferActionProps
	& SendActionProps

export default SendAction
