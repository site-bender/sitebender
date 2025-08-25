import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AssessActionProps } from "../index.ts"
import type { VoteActionType } from "./VoteAction/index.ts"

import { Thing as ThingComponent } from "../../../../../../components/index.tsx"

export type ChooseActionType = "ChooseAction" | VoteActionType

export interface ChooseActionProps {
	"@type"?: ChooseActionType
	actionOption?: Text | Thing | ReturnType<typeof ThingComponent>
	option?: Text | Thing | ReturnType<typeof ThingComponent>
}

type ChooseAction = Thing & ActionProps & AssessActionProps & ChooseActionProps

export default ChooseAction
