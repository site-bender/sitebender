import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"

import InteractActionComponent from "../../../../../components/Thing/Action/InteractAction/index.tsx"

export interface InteractActionProps {
}

type InteractAction =
	& Thing
	& ActionProps
	& InteractActionProps

export default InteractAction
