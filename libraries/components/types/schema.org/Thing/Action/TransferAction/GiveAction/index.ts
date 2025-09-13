import type Thing from "../../../index.ts"
import type Audience from "../../../Intangible/Audience/index.ts"
import type ContactPoint from "../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

import AudienceComponent from "../../../../../../src/define/Thing/Intangible/Audience/index.tsx"
import ContactPointComponent from "../../../../../../src/define/Thing/Intangible/StructuredValue/ContactPoint/index.tsx"
import OrganizationComponent from "../../../../../../src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../src/define/Thing/Person/index.tsx"

export type GiveActionType = "GiveAction"

export interface GiveActionProps {
	"@type"?: GiveActionType
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

type GiveAction = Thing & ActionProps & TransferActionProps & GiveActionProps

export default GiveAction
