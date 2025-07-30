import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AssessActionProps } from "../index.ts"

import ThingComponent from "../../../../../components/Thing/index.ts"

export interface ChooseActionProps {
	"@type"?: "ChooseAction"
	actionOption?: Text | Thing | ReturnType<typeof ThingComponent>
	option?: Text | Thing | ReturnType<typeof ThingComponent>
}

type ChooseAction = Thing & ActionProps & AssessActionProps & ChooseActionProps

export default ChooseAction
