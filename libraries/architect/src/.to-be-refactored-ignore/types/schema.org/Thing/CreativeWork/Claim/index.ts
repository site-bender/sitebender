import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import CreativeWorkComponent from "../../../../../src/define/Thing/CreativeWork/index.tsx"
import OrganizationComponent from "../../../../../src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../src/define/Thing/Person/index.tsx"

export type ClaimType = "Claim"

export interface ClaimProps {
	"@type"?: ClaimType
	appearance?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
	claimInterpreter?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	firstAppearance?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
}

type Claim = Thing & CreativeWorkProps & ClaimProps

export default Claim
