import type Thing from "../../../index.ts"
import type EntertainmentBusiness from "../../../Organization/LocalBusiness/EntertainmentBusiness/index.ts"
import type { ActionProps } from "../../index.ts"
import type { PlayActionProps } from "../index.ts"

export interface PerformActionProps {
	/** A sub property of location. The entertainment business where the action occurred. */
	entertainmentBusiness?: EntertainmentBusiness
}

type PerformAction =
	& Thing
	& ActionProps
	& PlayActionProps
	& PerformActionProps

export default PerformAction
