import type Thing from "../../../index.ts"
import type DeliveryMethod from "../../../Intangible/Enumeration/DeliveryMethod/index.ts"
import type { ActionProps } from "../../index.ts"
import type { FindActionProps } from "../index.ts"

import { DeliveryMethod as DeliveryMethodComponent } from "../../../../../../components/index.tsx"

export type TrackActionType = "TrackAction"

export interface TrackActionProps {
	"@type"?: TrackActionType
	deliveryMethod?: DeliveryMethod | ReturnType<typeof DeliveryMethodComponent>
}

type TrackAction = Thing & ActionProps & FindActionProps & TrackActionProps

export default TrackAction
