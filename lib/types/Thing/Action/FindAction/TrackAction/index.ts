import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { FindActionProps } from "../index.ts"
import type DeliveryMethod from "../../../Intangible/Enumeration/DeliveryMethod/index.ts"

export interface TrackActionProps {
	deliveryMethod?: DeliveryMethod
}

type TrackAction =
	& Thing
	& ActionProps
	& FindActionProps
	& TrackActionProps

export default TrackAction
