import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AchieveActionProps } from "../index.ts"

import TieActionComponent from "../../../../../../components/Thing/Action/AchieveAction/TieAction/index.tsx"

export interface TieActionProps {
}

type TieAction =
	& Thing
	& ActionProps
	& AchieveActionProps
	& TieActionProps

export default TieAction
