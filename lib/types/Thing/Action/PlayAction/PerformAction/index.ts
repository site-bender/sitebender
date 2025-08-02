import type Thing from "../../../index.ts"
import type EntertainmentBusiness from "../../../Organization/LocalBusiness/EntertainmentBusiness/index.ts"
import type { ActionProps } from "../../index.ts"
import type { PlayActionProps } from "../index.ts"

import EntertainmentBusinessComponent from "../../../../../components/Thing/Organization/LocalBusiness/EntertainmentBusiness/index.ts"

export type PerformActionType = "PerformAction"

export interface PerformActionProps {
	"@type"?: PerformActionType
	entertainmentBusiness?:
		| EntertainmentBusiness
		| ReturnType<typeof EntertainmentBusinessComponent>
}

type PerformAction = Thing & ActionProps & PlayActionProps & PerformActionProps

export default PerformAction
