import type { DateTime } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type Product from "../../../Product/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Service from "../../Service/index.ts"
import type { StructuredValueProps } from "../index.ts"

import ServiceComponent from "../../../../../../../architect/src/define/Thing/Intangible/Service/index.tsx"
import OrganizationComponent from "../../../../../../../architect/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../../architect/src/define/Thing/Person/index.tsx"
import ProductComponent from "../../../../../../../architect/src/define/Thing/Product/index.tsx"

export type OwnershipInfoType = "OwnershipInfo"

export interface OwnershipInfoProps {
	"@type"?: OwnershipInfoType
	acquiredFrom?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	ownedFrom?: DateTime
	ownedThrough?: DateTime
	typeOfGood?:
		| Product
		| Service
		| ReturnType<typeof ProductComponent>
		| ReturnType<typeof ServiceComponent>
}

type OwnershipInfo =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& OwnershipInfoProps

export default OwnershipInfo
