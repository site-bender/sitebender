import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

import ReadActionComponent from "../../../../../../components/Thing/Action/ConsumeAction/ReadAction/index.tsx"

export interface ReadActionProps {
}

type ReadAction =
	& Thing
	& ActionProps
	& ConsumeActionProps
	& ReadActionProps

export default ReadAction
