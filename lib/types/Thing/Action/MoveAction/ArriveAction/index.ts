import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { MoveActionProps } from "../index.ts"

import ArriveActionComponent from "../../../../../../components/Thing/Action/MoveAction/ArriveAction/index.tsx"

export interface ArriveActionProps {
}

type ArriveAction =
	& Thing
	& ActionProps
	& MoveActionProps
	& ArriveActionProps

export default ArriveAction
