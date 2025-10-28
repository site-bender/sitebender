import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type MonetaryAmount from "../../StructuredValue/MonetaryAmount/index.ts"
import type { GrantProps } from "../index.ts"

import MonetaryAmountComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/MonetaryAmount/index.tsx"
import OrganizationComponent from "../../../../../../../architect/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../../architect/src/define/Thing/Person/index.tsx"

export type MonetaryGrantType = "MonetaryGrant"

export interface MonetaryGrantProps {
	"@type"?: MonetaryGrantType
	amount?:
		| MonetaryAmount
		| Number
		| ReturnType<typeof MonetaryAmountComponent>
	funder?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
}

type MonetaryGrant = Thing & IntangibleProps & GrantProps & MonetaryGrantProps

export default MonetaryGrant
