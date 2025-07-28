import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

import DrinkActionComponent from "../../../../../../components/Thing/Action/ConsumeAction/DrinkAction/index.tsx"

export interface DrinkActionProps {
}

type DrinkAction =
	& Thing
	& ActionProps
	& ConsumeActionProps
	& DrinkActionProps

export default DrinkAction
