import type Thing from "../../../index.ts"
import type Audience from "../../../Intangible/Audience/index.ts"
import type DeliveryMethod from "../../../Intangible/Enumeration/DeliveryMethod/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

import AudienceComponent from "../../../../../../../architect/src/define/Thing/Intangible/Audience/index.tsx"
import DeliveryMethodComponent from "../../../../../../../architect/src/define/Thing/Intangible/Enumeration/DeliveryMethod/index.tsx"
import OrganizationComponent from "../../../../../../../architect/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../../architect/src/define/Thing/Person/index.tsx"

export type ReceiveActionType = "ReceiveAction"

export interface ReceiveActionProps {
	"@type"?: ReceiveActionType
	deliveryMethod?: DeliveryMethod | ReturnType<typeof DeliveryMethodComponent>
	sender?:
		| Audience
		| Organization
		| Person
		| ReturnType<typeof AudienceComponent>
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
}

type ReceiveAction =
	& Thing
	& ActionProps
	& TransferActionProps
	& ReceiveActionProps

export default ReceiveAction
