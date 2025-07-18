import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type TransferAction from "../index.ts"

export default interface BorrowAction extends TransferAction {
	/** A sub property of participant. The person that lends the object being borrowed. */
	lender?: Organization | Person
}
