import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

import TakeActionComponent from "../../../../../../components/Thing/Action/TransferAction/TakeAction/index.tsx"

export interface TakeActionProps {
}

type TakeAction =
	& Thing
	& ActionProps
	& TransferActionProps
	& TakeActionProps

export default TakeAction
