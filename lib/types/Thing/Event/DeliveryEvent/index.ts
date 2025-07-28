import type { DateTime, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"
import type DeliveryMethod from "../../Intangible/Enumeration/DeliveryMethod/index.ts"

import DeliveryEventComponent from "../../../../../components/Thing/Event/DeliveryEvent/index.tsx"

export interface DeliveryEventProps {
	accessCode?: Text
	availableFrom?: DateTime
	availableThrough?: DateTime
	hasDeliveryMethod?: DeliveryMethod
}

type DeliveryEvent =
	& Thing
	& EventProps
	& DeliveryEventProps

export default DeliveryEvent
