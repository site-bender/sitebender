import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { AssessActionProps } from "../../index.ts"
import type { ReactActionProps } from "../index.ts"

import DislikeActionComponent from "../../../../../../../components/Thing/Action/AssessAction/ReactAction/DislikeAction/index.tsx"

export interface DislikeActionProps {
}

type DislikeAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ReactActionProps
	& DislikeActionProps

export default DislikeAction
