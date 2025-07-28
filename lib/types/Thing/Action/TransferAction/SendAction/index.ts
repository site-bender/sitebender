import type Thing from "../../../index.ts"
import type Audience from "../../../Intangible/Audience/index.ts"
import type DeliveryMethod from "../../../Intangible/Enumeration/DeliveryMethod/index.ts"
import type ContactPoint from "../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

import AudienceComponent from "../../../../../components/Thing/Intangible/Audience/index.ts"
import DeliveryMethodComponent from "../../../../../components/Thing/Intangible/Enumeration/DeliveryMethod/index.ts"
import ContactPointComponent from "../../../../../components/Thing/Intangible/StructuredValue/ContactPoint/index.ts"
import OrganizationComponent from "../../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../../components/Thing/Person/index.ts"

export interface SendActionProps {
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
