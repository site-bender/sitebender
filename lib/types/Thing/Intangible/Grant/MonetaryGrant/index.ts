import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type MonetaryAmount from "../../StructuredValue/MonetaryAmount/index.ts"
import type { GrantProps } from "../index.ts"

import MonetaryAmountComponent from "../../../../../components/Thing/Intangible/StructuredValue/MonetaryAmount/index.ts"
import OrganizationComponent from "../../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../../components/Thing/Person/index.ts"

export interface MonetaryGrantProps {
	amount?: MonetaryAmount | Number | ReturnType<typeof MonetaryAmountComponent>
	funder?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
}

type MonetaryGrant = Thing & IntangibleProps & GrantProps & MonetaryGrantProps

export default MonetaryGrant
