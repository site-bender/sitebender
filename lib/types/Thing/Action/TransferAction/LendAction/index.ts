import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"
import type Person from "../../../Person/index.ts"

export interface LendActionProps {
	borrower?: Person
}

type LendAction =
	& Thing
	& ActionProps
	& TransferActionProps
	& LendActionProps

export default LendAction
