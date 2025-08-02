import type Thing from "../../../../index.ts"
import type Audience from "../../../../Intangible/Audience/index.ts"
import type ContactPoint from "../../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Organization from "../../../../Organization/index.ts"
import type Person from "../../../../Person/index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { AllocateActionProps } from "../index.ts"

import AudienceComponent from "../../../../../../components/Thing/Intangible/Audience/index.ts"
import ContactPointComponent from "../../../../../../components/Thing/Intangible/StructuredValue/ContactPoint/index.ts"
import OrganizationComponent from "../../../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../../../components/Thing/Person/index.ts"

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
