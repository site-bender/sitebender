import type { DateTime, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type DeliveryMethod from "../../Intangible/Enumeration/DeliveryMethod/index.ts"
import type { EventProps } from "../index.ts"

import DeliveryMethodComponent from "../../../../components/Thing/Intangible/Enumeration/DeliveryMethod/index.ts"

export interface DeliveryEventProps {
	"@type"?: "DeliveryEvent"
	accessCode?: Text
	availableFrom?: DateTime
	availableThrough?: DateTime
	hasDeliveryMethod?:
		| DeliveryMethod
		| ReturnType<typeof DeliveryMethodComponent>
}

type DeliveryEvent = Thing & EventProps & DeliveryEventProps

export default DeliveryEvent
