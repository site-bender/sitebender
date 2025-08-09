import type Thing from "../../../index.ts"
import type Audience from "../../../Intangible/Audience/index.ts"
import type DeliveryMethod from "../../../Intangible/Enumeration/DeliveryMethod/index.ts"
import type ContactPoint from "../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

import { Audience as AudienceComponent } from "../../../../../../components/index.tsx"
import { ContactPoint as ContactPointComponent } from "../../../../../../components/index.tsx"
import { DeliveryMethod as DeliveryMethodComponent } from "../../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../../components/index.tsx"

export type SendActionType = "SendAction"

export interface SendActionProps {
	"@type"?: SendActionType
	deliveryMethod?: DeliveryMethod | ReturnType<typeof DeliveryMethodComponent>
	recipient?:
		| Audience
		| ContactPoint
		| Organization
		| Person
		| ReturnType<typeof AudienceComponent>
		| ReturnType<typeof ContactPointComponent>
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
}

type SendAction = Thing & ActionProps & TransferActionProps & SendActionProps

export default SendAction
