import type { Number } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { GrantProps } from "../index.ts"
import type MonetaryAmount from "../../StructuredValue/MonetaryAmount/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"

import MonetaryGrantComponent from "../../../../../../components/Thing/Intangible/Grant/MonetaryGrant/index.tsx"

export interface MonetaryGrantProps {
	amount?: MonetaryAmount | Number
	funder?: Organization | Person
}

type MonetaryGrant =
	& Thing
	& IntangibleProps
	& GrantProps
	& MonetaryGrantProps

export default MonetaryGrant
