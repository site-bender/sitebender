import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import CreativeWorkComponent from "../../../../components/Thing/CreativeWork/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export interface ClaimProps {
	"@type"?: "Claim"
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
