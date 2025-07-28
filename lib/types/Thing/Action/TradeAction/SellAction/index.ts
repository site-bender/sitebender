import type Thing from "../../../index.ts"
import type WarrantyPromise from "../../../Intangible/StructuredValue/WarrantyPromise/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

import WarrantyPromiseComponent from "../../../../../components/Thing/Intangible/StructuredValue/WarrantyPromise/index.ts"
import OrganizationComponent from "../../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../../components/Thing/Person/index.ts"

export interface SellActionProps {
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
