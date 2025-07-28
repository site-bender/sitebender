import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { AssessActionProps } from "../../index.ts"
import type { ReactActionProps } from "../index.ts"

import LikeActionComponent from "../../../../../../../components/Thing/Action/AssessAction/ReactAction/LikeAction/index.tsx"

export interface LikeActionProps {
}

type LikeAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ReactActionProps
	& LikeActionProps

export default LikeAction
