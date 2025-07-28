import type Thing from "../../../../index.ts"
import type { ActionProps } from "../../../index.ts"
import type { ConsumeActionProps } from "../../index.ts"
import type { UseActionProps } from "../index.ts"

import WearActionComponent from "../../../../../../../components/Thing/Action/ConsumeAction/UseAction/WearAction/index.tsx"

export interface WearActionProps {
}

type WearAction =
	& Thing
	& ActionProps
	& ConsumeActionProps
	& UseActionProps
	& WearActionProps

export default WearAction
