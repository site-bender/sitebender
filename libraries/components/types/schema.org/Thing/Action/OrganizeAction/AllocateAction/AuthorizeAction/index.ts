import type Thing from "../../../../index.ts"
import type Audience from "../../../../Intangible/Audience/index.ts"
import type ContactPoint from "../../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Organization from "../../../../Organization/index.ts"
import type Person from "../../../../Person/index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { AllocateActionProps } from "../index.ts"

import { Audience as AudienceComponent } from "../../../../../../../components/index.tsx"
import { ContactPoint as ContactPointComponent } from "../../../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../../../components/index.tsx"

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
