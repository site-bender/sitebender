import type Thing from "../../../../index.ts"
import type Audience from "../../../../Intangible/Audience/index.ts"
import type ContactPoint from "../../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Organization from "../../../../Organization/index.ts"
import type Person from "../../../../Person/index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { AllocateActionProps } from "../index.ts"

import AudienceComponent from "../../../../../../../../architect/src/define/Thing/Intangible/Audience/index.tsx"
import ContactPointComponent from "../../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/ContactPoint/index.tsx"
import OrganizationComponent from "../../../../../../../../architect/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../../../architect/src/define/Thing/Person/index.tsx"

export type AuthorizeActionType = "AuthorizeAction"

export interface AuthorizeActionProps {
	"@type"?: AuthorizeActionType
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

type AuthorizeAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& AllocateActionProps
	& AuthorizeActionProps

export default AuthorizeAction
