import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

import AchieveActionComponent from "../../../../../components/Thing/Action/AchieveAction/index.tsx"

export interface AchieveActionProps {
}

type AchieveAction =
	& Thing
	& ActionProps
	& AchieveActionProps

export default AchieveAction
