import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { ConsumeActionProps } from "../index.ts"

import WatchActionComponent from "../../../../../../components/Thing/Action/ConsumeAction/WatchAction/index.tsx"

export interface WatchActionProps {
}

type WatchAction =
	& Thing
	& ActionProps
	& ConsumeActionProps
	& WatchActionProps

export default WatchAction
