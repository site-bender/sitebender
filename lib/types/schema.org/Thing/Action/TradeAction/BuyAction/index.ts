import type Thing from "../../../index.ts"
import type WarrantyPromise from "../../../Intangible/StructuredValue/WarrantyPromise/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

import { WarrantyPromise as WarrantyPromiseComponent } from "../../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../../components/index.tsx"

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
