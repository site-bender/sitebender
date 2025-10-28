import type Thing from "../../../index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

import PersonComponent from "../../../../../../../pagewright/src/define/Thing/Person/index.tsx"

export type LendActionType = "LendAction"

export interface LendActionProps {
	"@type"?: LendActionType
	borrower?: Person | ReturnType<typeof PersonComponent>
}

type LendAction = Thing & ActionProps & TransferActionProps & LendActionProps

export default LendAction
