import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { PlayActionProps } from "../index.ts"
import type EntertainmentBusiness from "../../../Organization/LocalBusiness/EntertainmentBusiness/index.ts"

import PerformActionComponent from "../../../../../../components/Thing/Action/PlayAction/PerformAction/index.tsx"

export interface PerformActionProps {
	entertainmentBusiness?: EntertainmentBusiness
}

type PerformAction =
	& Thing
	& ActionProps
	& PlayActionProps
	& PerformActionProps

export default PerformAction
