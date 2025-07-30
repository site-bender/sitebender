import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

import ThingComponent from "../../../../components/Thing/index.ts"

export interface UpdateActionProps {
	"@type"?: "UpdateAction"
	collection?: Thing | ReturnType<typeof ThingComponent>
	targetCollection?: Thing | ReturnType<typeof ThingComponent>
}

type UpdateAction = Thing & ActionProps & UpdateActionProps

export default UpdateAction
