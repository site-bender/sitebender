import type Thing from "../../../index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

export interface LendActionProps {
	/** A sub property of participant. The person that borrows the object being lent. */
	borrower?: Person
}

type LendAction =
	& Thing
	& ActionProps
	& TransferActionProps
	& LendActionProps

export default LendAction
