import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { PlayActionProps } from "../index.ts"
import type EntertainmentBusiness from "../../../Organization/LocalBusiness/EntertainmentBusiness/index.ts"

export interface PerformActionProps {
	entertainmentBusiness?: EntertainmentBusiness
}

type PerformAction =
	& Thing
	& ActionProps
	& PlayActionProps
	& PerformActionProps

export default PerformAction
