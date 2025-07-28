import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { OrganizeActionProps } from "../../index.ts"
import type { AllocateActionProps } from "../index.ts"
import type Audience from "../../../../Intangible/Audience/index.ts"
import type ContactPoint from "../../../../Intangible/StructuredValue/ContactPoint/index.ts"
import type Organization from "../../../../Organization/index.ts"
import type Person from "../../../../Person/index.ts"

import AuthorizeActionComponent from "../../../../../../../components/Thing/Action/OrganizeAction/AllocateAction/AuthorizeAction/index.tsx"

export interface AuthorizeActionProps {
	recipient?: Audience | ContactPoint | Organization | Person
}

type AuthorizeAction =
	& Thing
	& ActionProps
	& OrganizeActionProps
	& AllocateActionProps
	& AuthorizeActionProps

export default AuthorizeAction
