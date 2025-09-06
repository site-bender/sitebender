import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type MonetaryAmount from "../../StructuredValue/MonetaryAmount/index.ts"
import type { GrantProps } from "../index.ts"

import { MonetaryAmount as MonetaryAmountComponent } from "../../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../../components/index.tsx"

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
