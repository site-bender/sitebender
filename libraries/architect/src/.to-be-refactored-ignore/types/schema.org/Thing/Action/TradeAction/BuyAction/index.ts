import type Thing from "../../../index.ts"
import type WarrantyPromise from "../../../Intangible/StructuredValue/WarrantyPromise/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

import WarrantyPromiseComponent from "../../../../../../src/define/Thing/Intangible/StructuredValue/WarrantyPromise/index.tsx"
import OrganizationComponent from "../../../../../../src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../src/define/Thing/Person/index.tsx"

export type BuyActionType = "BuyAction"

export interface BuyActionProps {
	"@type"?: BuyActionType
	seller?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	vendor?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	warrantyPromise?:
		| WarrantyPromise
		| ReturnType<typeof WarrantyPromiseComponent>
}

type BuyAction = Thing & ActionProps & TradeActionProps & BuyActionProps

export default BuyAction
