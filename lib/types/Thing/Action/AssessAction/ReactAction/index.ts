import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AssessActionProps } from "../index.ts"

import ReactActionComponent from "../../../../../../components/Thing/Action/AssessAction/ReactAction/index.tsx"

export interface ReactActionProps {
}

type ReactAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ReactActionProps

export default ReactAction
