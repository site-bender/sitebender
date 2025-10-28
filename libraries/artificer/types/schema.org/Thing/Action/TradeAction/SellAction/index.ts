import type Thing from "../../../index.ts"
import type WarrantyPromise from "../../../Intangible/StructuredValue/WarrantyPromise/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

import WarrantyPromiseComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/WarrantyPromise/index.tsx"
import OrganizationComponent from "../../../../../../../architect/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../../architect/src/define/Thing/Person/index.tsx"

export type SellActionType = "SellAction"

export interface SellActionProps {
	"@type"?: SellActionType
	buyer?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	warrantyPromise?:
		| WarrantyPromise
		| ReturnType<typeof WarrantyPromiseComponent>
}

type SellAction = Thing & ActionProps & TradeActionProps & SellActionProps

export default SellAction
