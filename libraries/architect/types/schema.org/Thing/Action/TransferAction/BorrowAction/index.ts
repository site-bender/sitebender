import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

import OrganizationComponent from "../../../../../../../pagewright/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../../pagewright/src/define/Thing/Person/index.tsx"

export type BorrowActionType = "BorrowAction"

export interface BorrowActionProps {
	"@type"?: BorrowActionType
	lender?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
}

type BorrowAction =
	& Thing
	& ActionProps
	& TransferActionProps
	& BorrowActionProps

export default BorrowAction
