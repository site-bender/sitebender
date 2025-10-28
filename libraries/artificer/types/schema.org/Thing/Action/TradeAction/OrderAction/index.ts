import type Thing from "../../../index.ts"
import type DeliveryMethod from "../../../Intangible/Enumeration/DeliveryMethod/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

import DeliveryMethodComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/DeliveryMethod/index.tsx"

export type OrderActionType = "OrderAction"

export interface OrderActionProps {
	"@type"?: OrderActionType
	deliveryMethod?: DeliveryMethod | ReturnType<typeof DeliveryMethodComponent>
}

type OrderAction = Thing & ActionProps & TradeActionProps & OrderActionProps

export default OrderAction
