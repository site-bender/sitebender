import type { DateTime, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DeliveryMethod from "../../Intangible/Enumeration/DeliveryMethod/index.ts"
import type { EventProps } from "../index.ts"

import { DeliveryMethod as DeliveryMethodComponent } from "../../../../../components/index.tsx"

export type DeliveryEventType = "DeliveryEvent"

export interface DeliveryEventProps {
	"@type"?: DeliveryEventType
	accessCode?: Text
	availableFrom?: DateTime
	availableThrough?: DateTime
	hasDeliveryMethod?:
		| DeliveryMethod
		| ReturnType<typeof DeliveryMethodComponent>
}

type DeliveryEvent = Thing & EventProps & DeliveryEventProps

export default DeliveryEvent
