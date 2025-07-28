import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"

import BorrowActionComponent from "../../../../../../components/Thing/Action/TransferAction/BorrowAction/index.tsx"

export interface BorrowActionProps {
	lender?: Organization | Person
}

type BorrowAction =
	& Thing
	& ActionProps
	& TransferActionProps
	& BorrowActionProps

export default BorrowAction
